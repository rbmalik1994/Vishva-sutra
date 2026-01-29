import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const nativeSelectVariants = cva(
  'flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      selectSize: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      selectSize: 'md',
    },
  }
);

export interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof nativeSelectVariants> {}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, selectSize, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(nativeSelectVariants({ selectSize, className }))}
      {...props}
    >
      {children}
    </select>
  )
);
NativeSelect.displayName = 'NativeSelect';

const NativeSelectOption = React.forwardRef<
  HTMLOptionElement,
  React.OptionHTMLAttributes<HTMLOptionElement>
>(({ className, ...props }, ref) => (
  <option ref={ref} className={cn(className)} {...props} />
));
NativeSelectOption.displayName = 'NativeSelectOption';

const NativeSelectGroup = React.forwardRef<
  HTMLOptGroupElement,
  React.OptgroupHTMLAttributes<HTMLOptGroupElement>
>(({ className, ...props }, ref) => (
  <optgroup ref={ref} className={cn(className)} {...props} />
));
NativeSelectGroup.displayName = 'NativeSelectGroup';

export { NativeSelect, NativeSelectOption, NativeSelectGroup, nativeSelectVariants };
