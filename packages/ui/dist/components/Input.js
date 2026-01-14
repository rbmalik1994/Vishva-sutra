import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import clsx from 'clsx';
export const Input = React.forwardRef(({ className, ...rest }, ref) => (_jsx("input", { ref: ref, className: clsx('block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus', 'placeholder:text-muted-foreground', className), ...rest })));
Input.displayName = 'Input';
