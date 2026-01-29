import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const inputVariants = cva(
  [
    'flex w-full rounded-md border bg-transparent px-3 py-2 text-sm',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'ring-offset-background',
    'transition-colors',
  ],
  {
    variants: {
      variant: {
        default: 'border-input',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-success focus-visible:ring-success',
      },
      inputSize: {
        sm: 'h-8 text-xs',
        md: 'h-9',
        lg: 'h-10 text-base',
        xl: 'h-12 text-lg px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Left element/icon to display inside the input */
  leftElement?: React.ReactNode;
  /** Right element/icon to display inside the input */
  rightElement?: React.ReactNode;
  /** Error message to display below the input */
  error?: string;
  /** Helper text to display below the input */
  helperText?: string;
}

/**
 * A flexible input component with variants, icons, and validation states.
 *
 * @example
 * ```tsx
 * // Basic input
 * <Input placeholder="Enter your name" />
 *
 * // With label (use Label component)
 * <div>
 *   <Label htmlFor="email">Email</Label>
 *   <Input id="email" type="email" placeholder="you@example.com" />
 * </div>
 *
 * // With icons
 * <Input
 *   leftElement={<SearchIcon className="h-4 w-4 text-muted-foreground" />}
 *   placeholder="Search..."
 * />
 *
 * // Error state
 * <Input variant="error" error="This field is required" />
 *
 * // Different sizes
 * <Input inputSize="lg" placeholder="Large input" />
 * ```
 *
 * @accessibility
 * - Uses native input element with proper focus management
 * - Error states communicated via aria-invalid and aria-describedby
 * - Helper text associated via aria-describedby
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant,
      inputSize,
      leftElement,
      rightElement,
      error,
      helperText,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Compute variant based on error state
    const computedVariant = error ? 'error' : variant;

    // Build aria-describedby
    const describedByParts: string[] = [];
    if (ariaDescribedBy) describedByParts.push(ariaDescribedBy);
    if (error) describedByParts.push(errorId);
    if (helperText && !error) describedByParts.push(helperId);
    const describedBy =
      describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

    if (leftElement || rightElement) {
      return (
        <div className="relative">
          {leftElement && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              inputVariants({ variant: computedVariant, inputSize }),
              leftElement && 'pl-10',
              rightElement && 'pr-10',
              className
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
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
        </div>
      );
    }

    return (
      <>
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            inputVariants({ variant: computedVariant, inputSize }),
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
Input.displayName = 'Input';

export { Input, inputVariants };
