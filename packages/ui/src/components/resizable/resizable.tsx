'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
}

const ResizablePanelGroup = React.forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
  ({ className, direction = 'horizontal', ...props }, ref) => (
    <div
      ref={ref}
      data-panel-group=""
      data-panel-group-direction={direction}
      className={cn(
        'flex h-full w-full',
        direction === 'horizontal' ? 'flex-row' : 'flex-col',
        className
      )}
      {...props}
    />
  )
);
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
}

const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  ({ className, defaultSize = 50, minSize = 0, maxSize = 100, style, ...props }, ref) => {
    const [size, setSize] = React.useState(defaultSize);

    return (
      <div
        ref={ref}
        data-panel=""
        data-panel-size={size}
        style={{
          ...style,
          flex: `${size} 0 0`,
          minWidth: minSize ? `${minSize}%` : undefined,
          maxWidth: maxSize < 100 ? `${maxSize}%` : undefined,
        }}
        className={cn('overflow-hidden', className)}
        {...props}
      />
    );
  }
);
ResizablePanel.displayName = 'ResizablePanel';

interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean;
}

const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ className, withHandle, ...props }, ref) => (
    <div
      ref={ref}
      data-panel-resize-handle=""
      className={cn(
        'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
        'data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0',
        '[&[data-panel-group-direction=vertical]>div]:rotate-90',
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <svg
            className="h-2.5 w-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v14M5 12h14"
            />
          </svg>
        </div>
      )}
    </div>
  )
);
ResizableHandle.displayName = 'ResizableHandle';

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
export type { ResizablePanelGroupProps, ResizablePanelProps, ResizableHandleProps };
