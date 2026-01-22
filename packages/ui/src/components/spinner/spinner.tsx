import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    variant: {
      default: 'text-primary',
      muted: 'text-muted-foreground',
      inherit: 'text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  /** Screen reader label */
  label?: string;
}

/**
 * A loading spinner component.
 *
 * @example
 * ```tsx
 * // Basic spinner
 * <Spinner />
 *
 * // With size
 * <Spinner size="lg" />
 *
 * // With custom label
 * <Spinner label="Loading data..." />
 *
 * // In a button
 * <Button disabled>
 *   <Spinner size="sm" variant="inherit" className="mr-2" />
 *   Loading...
 * </Button>
 * ```
 *
 * @accessibility
 * - Includes role="status" for assistive technology
 * - Provides aria-label for screen readers
 */
const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, variant, label = 'Loading', ...props }, ref) => (
    <svg
      ref={ref}
      className={cn(spinnerVariants({ size, variant }), className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label={label}
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
      <span className="sr-only">{label}</span>
    </svg>
  )
);
Spinner.displayName = 'Spinner';

/**
 * A pulsing dots loading indicator.
 */
export interface DotsLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const DotsLoader = React.forwardRef<HTMLDivElement, DotsLoaderProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-3 w-3',
    };

    const gapClasses = {
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2',
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center', gapClasses[size], className)}
        role="status"
        aria-label="Loading"
        {...props}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              'rounded-full bg-current animate-pulse',
              sizeClasses[size]
            )}
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
        <span className="sr-only">Loading</span>
      </div>
    );
  }
);
DotsLoader.displayName = 'DotsLoader';

export { Spinner, DotsLoader, spinnerVariants };
