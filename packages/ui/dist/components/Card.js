import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import clsx from 'clsx';
export function Card({ as, className, children, ...rest }) {
    const Component = (as || 'div');
    return (_jsx(Component, { className: clsx('rounded-lg border border-border bg-background/80 p-4 shadow-sm backdrop-blur-sm', className), ...rest, children: children }));
}
export default Card;
