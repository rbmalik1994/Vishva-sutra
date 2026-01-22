import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation of the separator */
  orientation?: 'horizontal' | 'vertical';
  /** Whether the separator is purely decorative */
  decorative?: boolean;
}

/**
 * A visual divider component for separating content.
 *
 * @example
 * ```tsx
 * // Horizontal separator
 * <Separator />
 *
 * // Vertical separator
 * <div className="flex items-center gap-2">
 *   <span>Item 1</span>
 *   <Separator orientation="vertical" className="h-4" />
 *   <span>Item 2</span>
 * </div>
 *
 * // With text
 * <div className="flex items-center gap-4">
 *   <Separator className="flex-1" />
 *   <span className="text-sm text-muted-foreground">OR</span>
 *   <Separator className="flex-1" />
 * </div>
 * ```
 *
 * @accessibility
 * - Uses role="separator" for semantic meaning
 * - aria-orientation indicates the direction
 * - Decorative separators are hidden from assistive technology
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = 'Separator';

export { Separator };
