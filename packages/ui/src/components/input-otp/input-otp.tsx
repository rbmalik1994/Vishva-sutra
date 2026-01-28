'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const inputOTPVariants = cva(
  'flex items-center gap-2',
  {
    variants: {
      size: {
        sm: '[&_input]:h-8 [&_input]:w-8 [&_input]:text-sm',
        md: '[&_input]:h-10 [&_input]:w-10 [&_input]:text-base',
        lg: '[&_input]:h-12 [&_input]:w-12 [&_input]:text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface InputOTPContextValue {
  value: string[];
  handleChange: (index: number, char: string) => void;
  handleKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

const InputOTPContext = React.createContext<InputOTPContextValue | null>(null);

function useInputOTPContext() {
  const context = React.useContext(InputOTPContext);
  if (!context) {
    throw new Error('InputOTP components must be used within an InputOTP');
  }
  return context;
}

interface InputOTPProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof inputOTPVariants> {
  maxLength: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ className, maxLength, value = '', onChange, disabled, size, children, ...props }, ref) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const [values, setValues] = React.useState<string[]>(() => {
      const initial = value.split('').slice(0, maxLength);
      return [...initial, ...Array(maxLength - initial.length).fill('')];
    });

    React.useEffect(() => {
      const newValues = value.split('').slice(0, maxLength);
      setValues([...newValues, ...Array(maxLength - newValues.length).fill('')]);
    }, [value, maxLength]);

    const handleChange = (index: number, char: string) => {
      if (disabled) return;
      
      const newValues = [...values];
      newValues[index] = char.slice(-1);
      setValues(newValues);
      onChange?.(newValues.join(''));

      if (char && index < maxLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === 'Backspace') {
        if (!values[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < maxLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').slice(0, maxLength);
      const newValues = pastedData.split('').slice(0, maxLength);
      const paddedValues = [...newValues, ...Array(maxLength - newValues.length).fill('')];
      setValues(paddedValues);
      onChange?.(paddedValues.join(''));

      const nextEmptyIndex = newValues.length < maxLength ? newValues.length : maxLength - 1;
      inputRefs.current[nextEmptyIndex]?.focus();
    };

    return (
      <InputOTPContext.Provider
        value={{ value: values, handleChange, handleKeyDown, handlePaste, inputRefs }}
      >
        <div
          ref={ref}
          className={cn(inputOTPVariants({ size, className }))}
          data-disabled={disabled}
          {...props}
        >
          {children}
        </div>
      </InputOTPContext.Provider>
    );
  }
);
InputOTP.displayName = 'InputOTP';

interface InputOTPGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center', className)} {...props} />
  )
);
InputOTPGroup.displayName = 'InputOTPGroup';

interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const InputOTPSlot = React.forwardRef<HTMLInputElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const { value, handleChange, handleKeyDown, handlePaste, inputRefs } = useInputOTPContext();
    const char = value[index] || '';

    return (
      <input
        ref={(el) => {
          inputRefs.current[index] = el;
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={1}
        value={char}
        onChange={(e) => handleChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        onPaste={handlePaste}
        className={cn(
          'flex items-center justify-center rounded-md border border-input bg-background text-center font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} role="separator" className={cn('px-1', className)} {...props}>
    <div className="h-4 w-px bg-border" />
  </div>
));
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
export type { InputOTPProps };
