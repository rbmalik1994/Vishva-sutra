import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error message to display below the textarea */
  error?: string;
  /** Helper text to display below the textarea */
  helperText?: string;
}

/**
 * A textarea component for multi-line text input.
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Enter your message..." />
 *
 * // With error
 * <Textarea error="Message is required" />
 *
 * // With helper text
 * <Textarea helperText="Maximum 500 characters" />
 * ```
 *
 * @accessibility
 * - Uses native textarea element with proper focus management
 * - Error states communicated via aria-invalid and aria-describedby
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      helperText,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const textareaId = id ?? React.useId();
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    const describedByParts: string[] = [];
    if (ariaDescribedBy) describedByParts.push(ariaDescribedBy);
    if (error) describedByParts.push(errorId);
    if (helperText && !error) describedByParts.push(helperId);
    const describedBy =
      describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

    return (
      <>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm',
            'shadow-sm placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'ring-offset-background',
            'resize-y',
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-xs text-destructive">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
