'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * A toggle switch component for binary states.
 * Built on Radix UI Switch primitive for accessibility.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Switch />
 *
 * // Controlled
 * const [enabled, setEnabled] = useState(false);
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 *
 * // With label
 * <div className="flex items-center gap-2">
 *   <Switch id="airplane-mode" />
 *   <Label htmlFor="airplane-mode">Airplane Mode</Label>
 * </div>
 *
 * // Different sizes
 * <Switch size="sm" />
 * <Switch size="lg" />
 * ```
 *
 * @accessibility
 * - Uses Radix UI Switch for proper ARIA role and state management
 * - Fully keyboard accessible (Space to toggle)
 * - Focus visible states for keyboard navigation
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size = 'md', ...props }, ref) => {
  const sizeClasses = {
    sm: 'h-4 w-7 [&>span]:h-3 [&>span]:w-3 [&>span]:data-[state=checked]:translate-x-3',
    md: 'h-5 w-9 [&>span]:h-4 [&>span]:w-4 [&>span]:data-[state=checked]:translate-x-4',
    lg: 'h-6 w-11 [&>span]:h-5 [&>span]:w-5 [&>span]:data-[state=checked]:translate-x-5',
  };

  return (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
        'shadow-sm transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block rounded-full bg-background shadow-lg ring-0',
          'transition-transform',
          'data-[state=unchecked]:translate-x-0.5'
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
