'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

interface FieldContextValue {
  id: string;
  error?: string;
  required?: boolean;
}

const FieldContext = React.createContext<FieldContextValue | null>(null);

function useFieldContext() {
  return React.useContext(FieldContext);
}

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string;
  required?: boolean;
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, error, required, children, ...props }, ref) => {
    const id = React.useId();

    return (
      <FieldContext.Provider value={{ id, error, required }}>
        <div
          ref={ref}
          className={cn('space-y-2', className)}
          {...props}
        >
          {children}
        </div>
      </FieldContext.Provider>
    );
  }
);
Field.displayName = 'Field';

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, children, ...props }, ref) => {
  const context = useFieldContext();

  return (
    <label
      ref={ref}
      htmlFor={context?.id}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    >
      {children}
      {context?.required && (
        <span className="text-destructive ml-1" aria-hidden="true">*</span>
      )}
    </label>
  );
});
FieldLabel.displayName = 'FieldLabel';

interface FieldControlProps {
  children: React.ReactElement;
}

const FieldControl = ({ children }: FieldControlProps) => {
  const context = useFieldContext();

  if (!React.isValidElement(children)) {
    return children;
  }

  return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    id: context?.id,
    'aria-describedby': context?.error ? `${context.id}-error` : undefined,
    'aria-invalid': context?.error ? true : undefined,
    'aria-required': context?.required,
  });
};
FieldControl.displayName = 'FieldControl';

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const context = useFieldContext();

  return (
    <p
      ref={ref}
      id={context ? `${context.id}-description` : undefined}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
FieldDescription.displayName = 'FieldDescription';

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const context = useFieldContext();
  const errorMessage = children || context?.error;

  if (!errorMessage) return null;

  return (
    <p
      ref={ref}
      id={context ? `${context.id}-error` : undefined}
      className={cn('text-sm font-medium text-destructive', className)}
      role="alert"
      {...props}
    >
      {errorMessage}
    </p>
  );
});
FieldError.displayName = 'FieldError';

export { Field, FieldLabel, FieldControl, FieldDescription, FieldError, useFieldContext };
export type { FieldProps };
