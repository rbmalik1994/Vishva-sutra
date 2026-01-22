import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and merges Tailwind classes intelligently.
 * Prevents class conflicts and ensures proper Tailwind utility ordering.
 *
 * @example
 * cn('px-4 py-2', 'px-6') // → 'py-2 px-6'
 * cn('bg-red-500', isActive && 'bg-blue-500') // → 'bg-blue-500' when active
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Focuses the first focusable element within a container.
 * Useful for modals, dialogs, and other overlay components.
 */
export function focusFirstElement(container: HTMLElement | null): void {
  if (!container) return;

  const focusableSelectors = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  const firstFocusable = container.querySelector<HTMLElement>(focusableSelectors);
  firstFocusable?.focus();
}

/**
 * Creates a keyboard event handler that triggers callback on Enter or Space.
 */
export function createKeyboardClickHandler(
  callback: () => void
): (event: React.KeyboardEvent) => void {
  return (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  };
}

/**
 * Generates a unique ID for accessibility purposes.
 * Prefixed to avoid conflicts with user-defined IDs.
 */
let idCounter = 0;
export function generateId(prefix = 'vs'): string {
  return `${prefix}-${++idCounter}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Type guard to check if a value is not null or undefined.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Debounce function for performance optimization.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

/**
 * Composes multiple refs into a single callback ref.
 * Useful when you need to attach multiple refs to a single element.
 */
export function composeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): (instance: T | null) => void {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(instance);
      } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<T | null>).current = instance;
      }
    });
  };
}
