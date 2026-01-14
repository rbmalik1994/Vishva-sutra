import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
export const Modal = ({ open, onClose, title, children, className, initialFocusRef }) => {
    const dialogRef = useRef(null);
    const previouslyFocused = useRef(null);
    const titleId = useMemo(() => (title ? `modal-${Math.random().toString(36).slice(2)}` : undefined), [title]);
    useEffect(() => {
        if (!open)
            return undefined;
        previouslyFocused.current = document.activeElement;
        const target = initialFocusRef?.current || dialogRef.current?.querySelector('[data-autofocus]') || dialogRef.current;
        target?.focus();
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
            if (previouslyFocused.current instanceof HTMLElement) {
                previouslyFocused.current.focus();
            }
        };
    }, [open, initialFocusRef]);
    useEffect(() => {
        if (!open)
            return undefined;
        const handleKey = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            }
            if (event.key === 'Tab') {
                const focusable = dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
                if (!focusable || focusable.length === 0)
                    return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                }
                else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [open, onClose]);
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4", "aria-hidden": !open, onMouseDown: (e) => {
            if (e.target === e.currentTarget)
                onClose();
        }, children: _jsxs("div", { ref: dialogRef, role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, className: clsx('w-full max-w-lg rounded-lg bg-background p-6 shadow-lg outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus', className), tabIndex: -1, children: [title ? (_jsx("h2", { id: titleId, className: "text-lg font-semibold text-foreground mb-4", children: title })) : null, _jsx("div", { children: children }), _jsx("div", { className: "mt-4 flex justify-end", children: _jsx("button", { type: "button", className: "button-focus-ring inline-flex rounded-md border border-border px-3 py-2 text-sm text-foreground hover:bg-muted", onClick: onClose, children: "Close" }) })] }) }));
};
