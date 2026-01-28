'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-stretch rounded-md border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background',
        '[&>input]:border-0 [&>input]:focus:ring-0 [&>input]:focus:ring-offset-0',
        className
      )}
      {...props}
    />
  )
);
InputGroup.displayName = 'InputGroup';

interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'left' | 'right';
}

const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, position = 'left', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center px-3 text-sm text-muted-foreground bg-muted',
        position === 'left' && 'rounded-l-md border-r border-input',
        position === 'right' && 'rounded-r-md border-l border-input',
        className
      )}
      {...props}
    />
  )
);
InputGroupAddon.displayName = 'InputGroupAddon';

interface InputGroupButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  position?: 'left' | 'right';
}

const InputGroupButton = React.forwardRef<HTMLButtonElement, InputGroupButtonProps>(
  ({ className, position = 'right', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center px-3 text-sm font-medium bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors',
        position === 'left' && 'rounded-l-md border-r border-input',
        position === 'right' && 'rounded-r-md border-l border-input',
        className
      )}
      {...props}
    />
  )
);
InputGroupButton.displayName = 'InputGroupButton';

export { InputGroup, InputGroupAddon, InputGroupButton };
export type { InputGroupProps, InputGroupAddonProps, InputGroupButtonProps };
