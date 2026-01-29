import * as React from 'react';
import { cn } from '../../lib/utils';

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  disabled?: boolean;
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, selected, disabled, ...props }, ref) => (
    <div
      ref={ref}
      data-selected={selected}
      data-disabled={disabled}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus:bg-accent focus:text-accent-foreground',
        selected && 'bg-accent text-accent-foreground',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      {...props}
    />
  )
);
Item.displayName = 'Item';

const ItemIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('mr-2 h-4 w-4 shrink-0', className)}
    {...props}
  />
));
ItemIcon.displayName = 'ItemIcon';

const ItemContent = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('flex-1', className)}
    {...props}
  />
));
ItemContent.displayName = 'ItemContent';

const ItemShortcut = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
    {...props}
  />
));
ItemShortcut.displayName = 'ItemShortcut';

export { Item, ItemIcon, ItemContent, ItemShortcut };
export type { ItemProps };
