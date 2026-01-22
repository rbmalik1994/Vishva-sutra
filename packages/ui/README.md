# @vishva-sutra/ui

A production-ready, accessible UI component library built with React, Tailwind CSS, and Radix UI primitives. Features multiple theme presets and follows shadcn/ui architectural patterns.

## ✨ Features

- 🎨 **5+ Theme Presets** - Modern, Cyberpunk, Retro, Liquid, Brutalist with dark mode support
- 🧩 **14+ Accessible Components** - Built on Radix UI primitives for WCAG 2.2 AA compliance
- 🎯 **TypeScript First** - Full type safety with comprehensive type definitions
- 🌳 **Tree-Shakeable** - Import only what you need
- 🎭 **Runtime Theme Switching** - Change themes without page reload
- 📚 **Storybook Documentation** - Interactive component documentation
- ⚡ **Optimized for Performance** - Minimal bundle size with lazy loading support

## 📦 Installation

```bash
# Using pnpm (recommended)
pnpm add @vishva-sutra/ui

# Using npm
npm install @vishva-sutra/ui

# Using yarn
yarn add @vishva-sutra/ui
```

### Peer Dependencies

Ensure you have the following peer dependencies installed:

```bash
pnpm add react react-dom tailwindcss
```

## 🚀 Quick Start

### 1. Configure Tailwind CSS

Extend your `tailwind.config.ts` to include our preset:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Include the UI package
    './node_modules/@vishva-sutra/ui/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### 2. Import Global Styles

Import the global styles in your app's entry point:

```typescript
// app/layout.tsx or _app.tsx
import '@vishva-sutra/ui/styles/globals.css';
```

### 3. Setup Theme Provider

Wrap your application with the `ThemeProvider`:

```tsx
import { ThemeProvider } from '@vishva-sutra/ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="modern-light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 4. Use Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@vishva-sutra/ui';

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## 🎨 Themes

### Available Themes

| Theme | Description |
|-------|-------------|
| `modern-light` | Clean, minimal design (default light) |
| `modern-dark` | Clean, minimal design (default dark) |
| `cyberpunk` | Neon colors on dark purple background |
| `retro` | Nostalgic GUI/TUI aesthetic |
| `liquid-light` | Apple-inspired frosted glass (light) |
| `liquid-dark` | Apple-inspired frosted glass (dark) |
| `brutalist` | Raw, high-contrast black and white |

### Theme Switching

```tsx
import { useTheme } from '@vishva-sutra/ui';

function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {themes.map((t) => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  );
}
```

### Server-Side Rendering (SSR)

To prevent flash of unstyled content (FOUC), include the `ThemeScript`:

```tsx
import { ThemeScript } from '@vishva-sutra/ui';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="modern-light" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## 📚 Components

### Primitives

- **Button** - Multiple variants, sizes, loading state, icon support
- **Card** - Flexible container with header, content, footer sections
- **Badge** - Labels and status indicators
- **Avatar** - User profile images with fallback
- **Separator** - Visual divider for content
- **Skeleton** - Loading placeholder
- **Spinner** - Loading indicator

### Form Components

- **Input** - Text input with validation states
- **Textarea** - Multi-line text input
- **Label** - Accessible form labels
- **Switch** - Toggle switch
- **Select** - Dropdown selection with groups

### Overlay Components

- **Dialog** - Modal dialogs
- **Tooltip** - Contextual information popups
- **Tabs** - Tabbed navigation

### Feedback

- **Alert** - Informational messages with variants

## 🔧 Customization

### Custom Theme

Create your own theme by defining CSS custom properties:

```css
[data-theme="my-theme"] {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 280 100% 70%;
  --primary-foreground: 0 0% 100%;
  /* ... other tokens */
  --radius: 0.5rem;
}
```

### Component Overrides

All components accept a `className` prop for customization:

```tsx
<Button className="bg-gradient-to-r from-pink-500 to-violet-500">
  Custom Button
</Button>
```

## 📖 Documentation

- **[Theming Guide](./docs/theming.md)** - Deep dive into the theming system
- **[Component API Reference](./docs/components.md)** - Full API documentation
- **[Design Rationale](./docs/design-rationale.md)** - Architecture decisions
- **[Contributing](./docs/contributing.md)** - How to contribute

## 🧪 Development

```bash
# Install dependencies
pnpm install

# Start Storybook
pnpm storybook

# Run tests
pnpm test

# Build package
pnpm build

# Type check
pnpm typecheck
```

## 📄 License

MIT © Vishva Sutra

---

Built with ❤️ using React, Tailwind CSS, and Radix UI
