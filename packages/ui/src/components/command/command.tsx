'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

interface CommandContextValue {
  search: string;
  setSearch: (search: string) => void;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const CommandContext = React.createContext<CommandContextValue | null>(null);

function useCommandContext() {
  const context = React.useContext(CommandContext);
  if (!context) {
    throw new Error('Command components must be used within a Command');
  }
  return context;
}

const Command = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [search, setSearch] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState('');

  return (
    <CommandContext.Provider value={{ search, setSearch, selectedValue, setSelectedValue }}>
      <div
        ref={ref}
        className={cn(
          'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CommandContext.Provider>
  );
});
Command.displayName = 'Command';

interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const CommandDialog = ({ open, onOpenChange, children }: CommandDialogProps) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange?.(!open);
      }
      if (e.key === 'Escape' && open) {
        onOpenChange?.(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-full max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-lg border bg-popover shadow-lg">
        <Command className="[&_[data-command-group-heading]]:px-2 [&_[data-command-group-heading]]:font-medium [&_[data-command-group-heading]]:text-muted-foreground [&_[data-command-group]:not([hidden])_~[data-command-group]]:pt-0 [&_[data-command-group]]:px-2 [&_[data-command-input-wrapper]_svg]:h-5 [&_[data-command-input-wrapper]_svg]:w-5 [&_[data-command-input]]:h-12 [&_[data-command-item]]:px-2 [&_[data-command-item]]:py-3 [&_[data-command-item]_svg]:h-5 [&_[data-command-item]_svg]:w-5">
          {children}
        </Command>
      </div>
    </>
  );
};

const CommandInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const { search, setSearch } = useCommandContext();

  return (
    <div className="flex items-center border-b px-3" data-command-input-wrapper="">
      <svg
        className="mr-2 h-4 w-4 shrink-0 opacity-50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        ref={ref}
        data-command-input=""
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  );
});
CommandInput.displayName = 'CommandInput';

const CommandList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...props}
  />
));
CommandList.displayName = 'CommandList';

const CommandEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <div
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
));
CommandEmpty.displayName = 'CommandEmpty';

const CommandGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-command-group=""
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[data-command-group-heading]]:px-2 [&_[data-command-group-heading]]:py-1.5 [&_[data-command-group-heading]]:text-xs [&_[data-command-group-heading]]:font-medium [&_[data-command-group-heading]]:text-muted-foreground',
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = 'CommandGroup';

const CommandSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
));
CommandSeparator.displayName = 'CommandSeparator';

interface CommandItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  value?: string;
  disabled?: boolean;
  onSelect?: (value: string) => void;
}

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, value, disabled, onSelect, ...props }, ref) => {
    const { selectedValue, setSelectedValue, search } = useCommandContext();
    const isSelected = selectedValue === value;
    const itemValue = value ?? props.children?.toString() ?? '';

    const isVisible = React.useMemo(() => {
      if (!search) return true;
      return itemValue.toLowerCase().includes(search.toLowerCase());
    }, [search, itemValue]);

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        data-command-item=""
        data-disabled={disabled}
        data-selected={isSelected}
        aria-selected={isSelected}
        aria-disabled={disabled}
        className={cn(
          'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
          className
        )}
        onClick={() => {
          if (!disabled) {
            setSelectedValue(itemValue);
            onSelect?.(itemValue);
          }
        }}
        {...props}
      />
    );
  }
);
CommandItem.displayName = 'CommandItem';

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
    {...props}
  />
);
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
