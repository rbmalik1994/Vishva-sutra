'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const sonnerVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        success: 'bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100 border-green-200 dark:border-green-800',
        error: 'bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100 border-red-200 dark:border-red-800',
        warning: 'bg-yellow-50 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100 border-yellow-200 dark:border-yellow-800',
        info: 'bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface SonnerToast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface SonnerContextValue {
  toasts: SonnerToast[];
  toast: (toast: Omit<SonnerToast, 'id'>) => string;
  success: (title: string, options?: Omit<SonnerToast, 'id' | 'title' | 'variant'>) => string;
  error: (title: string, options?: Omit<SonnerToast, 'id' | 'title' | 'variant'>) => string;
  warning: (title: string, options?: Omit<SonnerToast, 'id' | 'title' | 'variant'>) => string;
  info: (title: string, options?: Omit<SonnerToast, 'id' | 'title' | 'variant'>) => string;
  dismiss: (id: string) => void;
}

const SonnerContext = React.createContext<SonnerContextValue | null>(null);

function useSonner() {
  const context = React.useContext(SonnerContext);
  if (!context) {
    throw new Error('useSonner must be used within a SonnerProvider');
  }
  return context;
}

interface SonnerProviderProps {
  children: React.ReactNode;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  defaultDuration?: number;
}

function SonnerProvider({
  children,
  position = 'bottom-right',
  defaultDuration = 4000,
}: SonnerProviderProps) {
  const [toasts, setToasts] = React.useState<SonnerToast[]>([]);

  const addToast = React.useCallback(
    (toastData: Omit<SonnerToast, 'id'>) => {
      const id = Math.random().toString(36).slice(2, 9);
      const toast: SonnerToast = { ...toastData, id };
      setToasts((prev) => [...prev, toast]);

      const duration = toastData.duration ?? defaultDuration;
      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }

      return id;
    },
    [defaultDuration]
  );

  const toast = React.useCallback(
    (toastData: Omit<SonnerToast, 'id'>) => addToast(toastData),
    [addToast]
  );

  const success = React.useCallback(
    (title: string, options?: Omit<SonnerToast, 'id' | 'title' | 'variant'>) =>
      addToast({ title, variant: 'success', ...options }),
    [addToast]
  );

  const error = React.useCallback(
    (title: string, options?: Omit<SonnerToast, 'id' | 'title' | 'variant'>) =>
      addToast({ title, variant: 'error', ...options }),
    [addToast]
  );

  const warning = React.useCallback(
    (title: string, options?: Omit<SonnerToast, 'id' | 'title' | 'variant'>) =>
      addToast({ title, variant: 'warning', ...options }),
    [addToast]
  );

  const info = React.useCallback(
    (title: string, options?: Omit<SonnerToast, 'id' | 'title' | 'variant'>) =>
      addToast({ title, variant: 'info', ...options }),
    [addToast]
  );

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <SonnerContext.Provider value={{ toasts, toast, success, error, warning, info, dismiss }}>
      {children}
      <div
        className={cn(
          'fixed z-[100] flex max-h-screen w-full flex-col gap-2 md:max-w-[420px]',
          positionClasses[position]
        )}
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <SonnerItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </SonnerContext.Provider>
  );
}

interface SonnerItemProps extends VariantProps<typeof sonnerVariants> {
  toast: SonnerToast;
  onDismiss: () => void;
}

function SonnerItem({ toast, onDismiss }: SonnerItemProps) {
  return (
    <div
      className={cn(sonnerVariants({ variant: toast.variant }))}
      data-sonner-toast=""
      role="status"
      aria-live="polite"
    >
      <div className="grid gap-1">
        {toast.title && (
          <div className="text-sm font-semibold">{toast.title}</div>
        )}
        {toast.description && (
          <div className="text-sm opacity-90">{toast.description}</div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {toast.action.label}
          </button>
        )}
        <button
          onClick={onDismiss}
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none group-hover:opacity-100"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export { SonnerProvider, useSonner, sonnerVariants };
export type { SonnerToast, SonnerProviderProps };
