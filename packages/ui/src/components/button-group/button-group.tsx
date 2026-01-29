import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonGroupVariants = cva(
  'inline-flex rounded-md shadow-sm',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row [&>*:first-child]:rounded-l-md [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-r-md [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:first-child)]:-ml-px',
        vertical: 'flex-col [&>*:first-child]:rounded-t-md [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-b-md [&>*:last-child]:rounded-t-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:first-child)]:-mt-px',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(buttonGroupVariants({ orientation, className }))}
      {...props}
    />
  )
);
ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup, buttonGroupVariants };
