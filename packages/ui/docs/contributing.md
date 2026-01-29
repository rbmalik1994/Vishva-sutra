# Contributing Guide

Thank you for your interest in contributing to @vishva-sutra/ui! This guide will help you get started.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Component Guidelines](#component-guidelines)
5. [Documentation](#documentation)
6. [Testing](#testing)
7. [Pull Request Process](#pull-request-process)

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to build great software together.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Clone the repository
git clone https://github.com/rbmalik1994/Vishva-sutra.git
cd Vishva-sutra

# Install dependencies
pnpm install

# Navigate to UI package
cd packages/ui

# Start Storybook
pnpm storybook
```

## Development Workflow

### Creating a New Component

1. **Create the component directory:**

```bash
mkdir -p src/components/my-component
```

2. **Create the component file:**

```typescript
// src/components/my-component/my-component.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const myComponentVariants = cva(
  'base-classes-here',
  {
    variants: {
      variant: {
        default: 'variant-classes',
      },
      size: {
        md: 'size-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myComponentVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

3. **Create the barrel export:**

```typescript
// src/components/my-component/index.ts
export { MyComponent, type MyComponentProps } from './my-component';
```

4. **Add to main exports:**

```typescript
// src/components/index.ts
export * from './my-component';
```

5. **Create Storybook stories:**

```typescript
// src/components/my-component/my-component.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './my-component';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {};
```

### Running Development Tools

```bash
# Start Storybook
pnpm storybook

# Run tests
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint

# Build
pnpm build
```

## Component Guidelines

### Naming Conventions

- **Components**: PascalCase (e.g., `MyComponent`)
- **Files**: kebab-case (e.g., `my-component.tsx`)
- **CSS Variables**: kebab-case (e.g., `--my-variable`)
- **Variants**: camelCase (e.g., `defaultVariant`)

### Props Interface

Always extend appropriate HTML element props:

```typescript
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Additional props
  isLoading?: boolean;
}
```

### ForwardRef

All components should forward refs:

```typescript
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';
```

### Accessibility Requirements

- Use semantic HTML elements
- Include proper ARIA attributes
- Support keyboard navigation
- Test with screen readers
- Ensure sufficient color contrast
- Add focus indicators

### Styling Guidelines

1. Use Tailwind utility classes
2. Use CSS variables for theme-aware colors
3. Use CVA for variant management
4. Use `cn()` for class merging
5. Support `className` prop for customization

## Documentation

### Component Documentation

Every component needs:

1. **Storybook stories** with:
   - Default example
   - All variants
   - Interactive examples
   - Edge cases

2. **API documentation** in `docs/components.md`:
   - All props with types
   - Usage examples
   - Accessibility notes

### Commit Messages

Follow conventional commits:

```
feat(button): add loading state
fix(input): correct focus ring color
docs(readme): update installation instructions
chore(deps): update dependencies
```

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

### Test Guidelines

1. Test component rendering
2. Test all variants
3. Test user interactions
4. Test accessibility
5. Test edge cases

### Example Test

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(<Button isLoading>Save</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## Pull Request Process

### Before Submitting

1. Ensure all tests pass
2. Run linting and fix issues
3. Update documentation if needed
4. Add Storybook stories for new components
5. Test across multiple themes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Storybook stories added
- [ ] Accessibility verified
- [ ] Works across all themes
```

### Review Process

1. Automated checks must pass (lint, test, build)
2. At least one maintainer review
3. Address all feedback
4. Squash and merge

## Questions?

Open an issue or reach out to the maintainers. We're happy to help!

---

Thank you for contributing to @vishva-sutra/ui! 🎉
