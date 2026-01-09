---
applyTo: "**/*.{ts,tsx,js,jsx}"
description: TypeScript + React coding standards and conventions.
---

# TypeScript & React Instructions

<!-- Source: Adapted from github/awesome-copilot -->

## TypeScript Standards

### Type Safety
- Enable strict mode in `tsconfig.json`
- Avoid `any` type; use `unknown` when type is truly unknown
- Define explicit return types for public functions
- Use type guards for runtime type checking
- Leverage utility types: `Partial`, `Pick`, `Omit`, `Record`

### Code Organization
- Use named exports over default exports for better refactoring
- Organize imports: external libraries, internal modules, relative imports
- Use path aliases for cleaner imports
- Keep files focused on a single component or utility

### Best Practices
- Use const assertions for literal types
- Prefer interfaces for object shapes, types for unions/intersections
- Use enums sparingly; consider string unions instead
- Implement proper error handling with custom error types

## React Guidelines

### Component Design
- Use functional components with hooks
- Keep components small and focused (< 300 lines)
- Extract complex logic into custom hooks
- Use composition over inheritance
- Implement proper prop typing with TypeScript

### State Management
- Use `useState` for local component state
- Use `useReducer` for complex state logic
- Implement Context API for shared state
- Consider external state management (Redux, Zustand) for large apps
- Avoid prop drilling; use composition or context

### Hooks
- Follow Rules of Hooks (call at top level, only in React functions)
- Use `useCallback` to memoize callbacks
- Use `useMemo` for expensive computations
- Clean up effects with return functions
- Create custom hooks for reusable logic

### Performance
- Use `React.memo` for expensive components
- Implement code splitting with `React.lazy` and `Suspense`
- Optimize re-renders with proper dependency arrays
- Use key props correctly in lists
- Avoid inline object/array creation in render

### Styling
- Follow the project's existing styling approach (e.g., Tailwind, CSS modules)
- Keep styling consistent with the existing codebase conventions
- Implement responsive design with mobile-first approach
- Use CSS variables for theming
- Maintain consistent spacing and typography

### Testing
- Write unit tests for components with React Testing Library
- Test user interactions, not implementation details
- Mock external dependencies
- Aim for high coverage of critical paths
- Use snapshot tests sparingly

### Accessibility
- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Test with screen readers

### Security
- Sanitize user input before rendering
- Avoid dangerouslySetInnerHTML unless necessary
- Validate all form inputs
- Use Content Security Policy headers
- Keep dependencies updated

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page-level components
├── hooks/           # Custom React hooks
├── contexts/        # React Context providers
├── services/        # API calls and business logic
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
├── styles/          # Global styles and themes
└── tests/           # Test files
```

## Code Examples

### Component Pattern
```tsx
import { FC, useState, useEffect } from 'react';

interface UserProps {
  userId: string;
}

export const UserProfile: FC<UserProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Spinner />;
  if (!user) return <NotFound />;

  return <div>{user.name}</div>;
};
```

### Custom Hook Pattern
```tsx
import { useState, useEffect } from 'react';

export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```
