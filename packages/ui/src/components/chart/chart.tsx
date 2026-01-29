'use client';

import * as React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts';
import { cn } from '../../lib/utils';

// Chart configuration types
interface ChartConfig {
  [key: string]: {
    label?: string;
    color?: string;
    icon?: React.ComponentType;
  };
}

interface ChartContextValue {
  config: ChartConfig;
}

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a ChartContainer');
  }
  return context;
}

// Chart Container
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: React.ReactNode;
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, children, config, ...props }, ref) => {
    // Generate CSS custom properties from config
    const style = React.useMemo(() => {
      const cssVars: Record<string, string> = {};
      Object.entries(config).forEach(([key, value]) => {
        if (value.color) {
          cssVars[`--color-${key}`] = value.color;
        }
      });
      return cssVars as React.CSSProperties;
    }, [config]);

    // Measure container size and provide numeric width/height to recharts charts
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [size, setSize] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
      const node = containerRef.current;
      if (!node || typeof ResizeObserver === 'undefined') return;

      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const cr = entry.contentRect;
          setSize({ width: Math.floor(cr.width), height: Math.floor(cr.height) });
        }
      });
      ro.observe(node);
      // set initial size
      const rect = node.getBoundingClientRect();
      setSize({ width: Math.floor(rect.width), height: Math.floor(rect.height) });

      return () => ro.disconnect();
    }, []);

    // If child is a single React element (a recharts chart), clone it with width/height
    const child = React.Children.only(children) as React.ReactElement | null;
    const chartWithSize = child && size.width && size.height
      ? React.cloneElement(child, { width: size.width, height: size.height })
      : null;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={(node) => {
            // forward refs
            // eslint-disable-next-line no-param-reassign
            // @ts-ignore
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            containerRef.current = node;
          }}
          className={cn(
            'flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke=\'#fff\']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke=\'#ccc\']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke=\'#ccc\']]:stroke-border [&_.recharts-sector[stroke=\'#fff\']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none',
            className
          )}
          style={style}
          {...props}
        >
          {chartWithSize}
        </div>
      </ChartContext.Provider>
    );
  }
);
ChartContainer.displayName = 'ChartContainer';

// Chart Tooltip
interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    dataKey?: string | number;
    color?: string;
    payload?: Record<string, unknown>;
  }>;
  label?: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: 'line' | 'dot' | 'dashed';
  nameKey?: string;
  labelKey?: string;
  labelFormatter?: (label: string, payload: unknown[]) => React.ReactNode;
  labelClassName?: string;
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      labelKey,
      nameKey,
      ...props
    },
    ref
  ) => {
    const { config } = useChart();

    if (!active || !payload?.length) {
      return null;
    }

    const tooltipLabel = hideLabel
      ? null
      : labelFormatter
        ? labelFormatter(label as string, payload)
        : label;

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
          className
        )}
        {...props}
      >
        {tooltipLabel && (
          <div className={cn('font-medium', labelClassName)}>{tooltipLabel}</div>
        )}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = nameKey
              ? (item.payload?.[nameKey] as string)
              : item.dataKey?.toString() ?? item.name ?? 'value';
            const itemConfig = config[key] ?? {};
            const indicatorColor = item.color ?? itemConfig.color;

            return (
              <div
                key={index}
                className={cn(
                  'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground'
                )}
              >
                {!hideIndicator && (
                  <div
                    className={cn(
                      'shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]',
                      {
                        'h-2.5 w-2.5': indicator === 'dot',
                        'w-1': indicator === 'line',
                        'w-0 border-[1.5px] border-dashed bg-transparent':
                          indicator === 'dashed',
                      }
                    )}
                    style={
                      {
                        '--color-bg': indicatorColor,
                        '--color-border': indicatorColor,
                      } as React.CSSProperties
                    }
                  />
                )}
                <div className="flex flex-1 justify-between leading-none">
                  <div className="grid gap-1.5">
                    <span className="text-muted-foreground">
                      {itemConfig.label ?? item.name ?? key}
                    </span>
                  </div>
                  <span className="font-mono font-medium tabular-nums text-foreground">
                    {item.value?.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = 'ChartTooltipContent';

// Chart Legend
interface ChartLegendContentProps extends React.HTMLAttributes<HTMLDivElement> {
  payload?: Array<{
    value: string;
    type?: string;
    id?: string;
    color?: string;
    dataKey?: string;
  }>;
  nameKey?: string;
  hideIcon?: boolean;
  verticalAlign?: 'top' | 'bottom';
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(({ className, hideIcon = false, payload, nameKey, ...props }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-center gap-4 pt-3',
        className
      )}
      {...props}
    >
      {payload.map((item) => {
        const key = nameKey ?? (item.dataKey?.toString() || item.value);
        const itemConfig = config[key] ?? {};

        return (
          <div
            key={item.value}
            className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
          >
            {!hideIcon && (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color ?? itemConfig.color,
                }}
              />
            )}
            <span className="text-muted-foreground">
              {itemConfig.label ?? item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = 'ChartLegendContent';

// Default chart colors
const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

// Chart Style helper
interface ChartStyleProps {
  id: string;
  config: ChartConfig;
}

const ChartStyle = ({ id, config }: ChartStyleProps) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.color
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart="${id}"] {
${colorConfig
  .map(([key, itemConfig]) => `  --color-${key}: ${itemConfig.color};`)
  .join('\n')}
}
`,
      }}
    />
  );
};

export {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  ChartStyle,
  ChartContext,
  useChart,
  // Re-export from recharts for convenience
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  ResponsiveContainer,
  CHART_COLORS,
};
export type { ChartConfig, ChartContainerProps, ChartTooltipContentProps, ChartLegendContentProps };
