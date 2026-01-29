# Design Rationale

This document explains the architectural decisions, design patterns, and trade-offs made in building the @vishva-sutra/ui component library.

## Table of Contents

1. [Core Principles](#core-principles)
2. [Architecture Decisions](#architecture-decisions)
3. [Theming System Design](#theming-system-design)
4. [Component Patterns](#component-patterns)
5. [Technology Choices](#technology-choices)
6. [Trade-offs](#trade-offs)

## Core Principles

### 1. Accessibility First

Every component is built with accessibility as a core requirement, not an afterthought:

- **WCAG 2.2 AA Compliance**: All components meet or exceed Level AA requirements
- **Radix UI Primitives**: Use battle-tested accessible primitives for complex interactions
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA attributes and live regions

### 2. Composition Over Configuration

Following React's compositional model:

```tsx
// ✅ Compositional approach (preferred)
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// ❌ Configuration approach (avoided)
<Card title="Title" content="Content" />
```

**Benefits:**
- More flexible customization
- Better TypeScript inference
- Easier to extend
- Clearer component structure

### 3. Token-Based Design

All visual properties derive from design tokens:

```css
/* Everything flows from tokens */
--primary: 222.2 47.4% 11.2%;
--radius: 0.5rem;
--shadow: 0 1px 3px hsl(0 0% 0% / 10%);
```

**Benefits:**
- Consistent design language
- Easy theme switching
- Reduced decision fatigue
- Maintainable styles

### 4. Progressive Enhancement

Components work without JavaScript where possible:

- Static styles applied via CSS
- Interactive enhancements added with React
- SSR-compatible patterns throughout

## Architecture Decisions

### Component File Structure

```
components/
  button/
    index.ts          # Public exports
    button.tsx        # Implementation
    button.stories.tsx # Storybook docs
    button.test.tsx   # Tests (when added)
```

**Rationale:**
- Co-located files for related concerns
- Easy to find all button-related code
- Index.ts provides clean public API
- Follows feature-folder pattern

### Barrel Exports

```typescript
// components/index.ts
export * from './button';
export * from './card';
// ...
```

**Rationale:**
- Clean import paths: `import { Button } from '@vishva-sutra/ui'`
- Enables tree-shaking with proper bundler config
- Single source of truth for public API

### CVA for Variants

Using `class-variance-authority` for variant management:

```typescript
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4',
      },
    },
  }
);
```

**Rationale:**
- Type-safe variant definitions
- Automatic Tailwind class merging
- Consistent pattern across components
- Easy to extend and maintain

### Slot Pattern with asChild

```typescript
<Button asChild>
  <a href="/home">Home</a>
</Button>
```

**Rationale:**
- Preserve semantic HTML
- Accessibility benefits (proper element roles)
- Flexible composition
- Works with routing libraries

## Theming System Design

### CSS Custom Properties

Chose CSS variables over:
- CSS-in-JS runtime theming (performance overhead)
- Tailwind theme extension only (can't switch at runtime)
- Context-based theming (prop drilling, re-renders)

**Implementation:**

```css
[data-theme="modern-light"] {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
}

[data-theme="modern-dark"] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

**Benefits:**
- Zero JavaScript overhead for static themes
- Instant theme switching (no re-renders)
- Works with SSR out of the box
- DevTools friendly (easy to inspect)

### HSL Color Format

All colors defined as HSL values:

```css
--primary: 222.2 47.4% 11.2%;
/* Used as: hsl(var(--primary)) */
```

**Rationale:**
- Easy to create variants (adjust L for hover states)
- More intuitive color relationships
- Consistent with Tailwind's approach
- Alpha channel support: `hsl(var(--primary) / 0.5)`

### Theme Persistence

```typescript
// ThemeProvider handles persistence
useEffect(() => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);
```

**Rationale:**
- localStorage for persistence across sessions
- data-attribute for CSS targeting
- No flash of wrong theme with ThemeScript

## Component Patterns

### Controlled vs Uncontrolled

All form components support both patterns:

```tsx
// Uncontrolled (simpler)
<Input defaultValue="initial" />

// Controlled (full control)
<Input value={value} onChange={(e) => setValue(e.target.value)} />
```

**Rationale:**
- Flexibility for different use cases
- Matches React conventions
- No breaking changes when switching patterns

### Error and Helper Text

Form components accept both via props:

```tsx
<Input 
  error="This field is required"
  helperText="Enter your email address"
/>
```

**Rationale:**
- Consistent API across form components
- Proper accessibility with aria-describedby
- No need for wrapper components

### Compound Components

Complex components use compound pattern:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>
```

**Rationale:**
- Clear semantic structure
- Flexible content arrangement
- Each sub-component independently styled
- Better TypeScript support

## Technology Choices

### Radix UI Primitives

**Chosen for:**
- Fully accessible by default
- Unstyled (we add our own styling)
- Well-documented behavior
- Active maintenance
- Small bundle size

**Used for:**
- Dialog
- Switch
- Select
- Tooltip
- Tabs
- Label

### Tailwind CSS

**Chosen for:**
- Utility-first approach matches React's composition
- Excellent DX with IntelliSense
- Built-in responsive design
- CSS variable support
- Tree-shaking

### class-variance-authority (CVA)

**Chosen for:**
- Type-safe variant definitions
- Works seamlessly with Tailwind
- Minimal runtime overhead
- Clean API

### clsx + tailwind-merge

**Chosen for:**
- Safe class merging (handles Tailwind conflicts)
- Conditional classes
- Minimal bundle impact

## Trade-offs

### Bundle Size vs Features

**Decision:** Include all theme CSS in globals.css

**Trade-off:**
- (+) Simple setup, all themes work immediately
- (-) Larger CSS bundle even if not using all themes

**Mitigation:** Users can create custom minimal CSS with only their themes.

### Flexibility vs Simplicity

**Decision:** Compound components for complex UI

**Trade-off:**
- (+) Maximum flexibility and composition
- (-) More verbose than single-prop components

**Reasoning:** The added flexibility is worth the verbosity for a component library that needs to handle diverse use cases.

### Runtime Theming vs Build-time

**Decision:** Runtime theme switching via CSS variables

**Trade-off:**
- (+) User can switch themes without page reload
- (-) CSS variables have slight performance overhead vs static classes

**Reasoning:** The UX benefit of instant theme switching outweighs minimal performance impact.

### Radix vs Custom Implementations

**Decision:** Use Radix for complex interactions

**Trade-off:**
- (+) Battle-tested accessibility
- (-) Additional dependency, less control

**Reasoning:** Building accessible modals, selects, etc. correctly is extremely difficult. Radix provides this correctly out of the box.

---

## Future Considerations

1. **CSS Layers**: When browser support improves, use `@layer` for better style precedence
2. **View Transitions API**: Add smooth theme transitions with native API
3. **Container Queries**: Use for truly responsive components
4. **Anchor Positioning**: Replace JavaScript positioning in tooltips/popovers

---

For implementation details, see the [Component API Reference](./components.md) and [Theming Guide](./theming.md).
