import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import clsx from 'clsx';
const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'bg-transparent text-foreground hover:bg-muted/60',
    outline: 'border border-border bg-background text-foreground hover:bg-muted'
};
export const Button = React.forwardRef(({ className, children, variant = 'primary', loading = false, disabled, ...rest }, ref) => {
    const isDisabled = disabled || loading;
    return (_jsx("button", { ref: ref, className: clsx('button-focus-ring inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2', variantClasses[variant], isDisabled && 'opacity-60 cursor-not-allowed', className), "aria-busy": loading || undefined, "aria-disabled": isDisabled || undefined, disabled: isDisabled, ...rest, children: children }));
});
Button.displayName = 'Button';
