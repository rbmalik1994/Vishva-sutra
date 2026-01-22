# Theming Guide

This guide covers everything you need to know about using and customizing themes in the @vishva-sutra/ui component library.

## Table of Contents

1. [Overview](#overview)
2. [Theme Architecture](#theme-architecture)
3. [Available Themes](#available-themes)
4. [Using Themes](#using-themes)
5. [Creating Custom Themes](#creating-custom-themes)
6. [Design Tokens](#design-tokens)
7. [Best Practices](#best-practices)

## Overview

The theming system is built on CSS custom properties (CSS variables), enabling:

- **Runtime theme switching** without page reload
- **Server-side rendering** compatibility
- **Zero JavaScript overhead** for static themes
- **Framework agnostic** core (works with any CSS-in-JS solution)

## Theme Architecture

### How It Works

1. **CSS Variables**: Each theme defines a set of CSS custom properties
2. **Data Attribute**: The active theme is set via `data-theme` on the `<html>` element
3. **ThemeProvider**: React context manages theme state and persistence
4. **Tailwind Integration**: Theme tokens are mapped to Tailwind utility classes

```
┌─────────────────────────────────────────────────────┐
│                    ThemeProvider                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  Theme Context (React)                         │  │
│  │  - Current theme state                         │  │
│  │  - setTheme() function                         │  │
│  │  - Theme persistence (localStorage)            │  │
│  └───────────────────────────────────────────────┘  │
│                         │                            │
│                         ▼                            │
│  ┌───────────────────────────────────────────────┐  │
│  │  <html data-theme="modern-light">             │  │
│  └───────────────────────────────────────────────┘  │
│                         │                            │
│                         ▼                            │
│  ┌───────────────────────────────────────────────┐  │
│  │  CSS Custom Properties                         │  │
│  │  [data-theme="modern-light"] {                │  │
│  │    --primary: 222.2 47.4% 11.2%;              │  │
│  │    --background: 0 0% 100%;                   │  │
│  │  }                                             │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Available Themes

### Modern (Light & Dark)

The default theme, inspired by shadcn/ui. Clean, professional, and highly readable.

**Characteristics:**
- Neutral gray palette
- Subtle shadows
- Standard border radius (0.5rem)
- High contrast ratios for accessibility

**Best for:** Professional applications, dashboards, documentation sites

### Cyberpunk

A bold, futuristic theme with neon accents.

**Characteristics:**
- Electric green and magenta primaries
- Dark purple-tinted background
- Glowing shadow effects
- Slightly larger border radius

**Best for:** Gaming, tech startups, creative portfolios

### Retro

Nostalgic GUI/TUI aesthetic reminiscent of classic operating systems.

**Characteristics:**
- No border radius (sharp corners)
- Hard offset shadows
- High contrast borders
- Monospace-friendly

**Best for:** Developer tools, terminal emulators, retro-styled apps

### Liquid (Light & Dark)

Apple-inspired design with frosted glass effects.

**Characteristics:**
- Vibrant accent colors
- Large border radius (1rem)
- Backdrop blur effects on cards
- Soft, diffused shadows

**Best for:** Consumer apps, media platforms, creative tools

### Brutalist

Raw, uncompromising design with maximum contrast.

**Characteristics:**
- Pure black and white
- No border radius
- Heavy 2-3px borders
- Hard drop shadows

**Best for:** Art galleries, avant-garde projects, statement pieces

## Using Themes

### Basic Setup

```tsx
// app/layout.tsx
import { ThemeProvider, ThemeScript } from '@vishva-sutra/ui';
import '@vishva-sutra/ui/styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="modern-light" />
      </head>
      <body>
        <ThemeProvider defaultTheme="modern-light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Accessing Theme Context

```tsx
import { useTheme } from '@vishva-sutra/ui';

function MyComponent() {
  const { theme, setTheme, themes, resolvedTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      
      <div className="flex gap-2">
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={theme === t ? 'font-bold' : ''}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### System Theme Detection

```tsx
<ThemeProvider defaultTheme="system">
  {/* Will use user's OS preference */}
</ThemeProvider>
```

## Creating Custom Themes

### Step 1: Define CSS Variables

Create a new CSS file or add to your global styles:

```css
/* styles/themes/ocean.css */
[data-theme="ocean"] {
  /* Background colors */
  --background: 200 50% 10%;
  --foreground: 200 10% 95%;
  
  /* Card surfaces */
  --card: 200 45% 15%;
  --card-foreground: 200 10% 95%;
  
  /* Primary action color */
  --primary: 180 70% 50%;
  --primary-foreground: 200 50% 10%;
  
  /* Secondary elements */
  --secondary: 200 30% 25%;
  --secondary-foreground: 200 10% 95%;
  
  /* Muted/subtle elements */
  --muted: 200 30% 20%;
  --muted-foreground: 200 10% 70%;
  
  /* Accent for highlights */
  --accent: 175 80% 45%;
  --accent-foreground: 200 50% 10%;
  
  /* Semantic colors */
  --destructive: 0 70% 50%;
  --destructive-foreground: 0 0% 100%;
  --success: 160 70% 45%;
  --success-foreground: 160 70% 10%;
  --warning: 40 90% 50%;
  --warning-foreground: 40 90% 10%;
  
  /* Borders and inputs */
  --border: 200 30% 30%;
  --input: 200 30% 25%;
  --ring: 180 70% 50%;
  
  /* Design tokens */
  --radius: 0.75rem;
  --shadow: 0 4px 12px hsl(200 60% 5% / 40%);
  --shadow-lg: 0 8px 24px hsl(200 60% 5% / 50%);
}
```

### Step 2: Import the CSS

```tsx
// In your app
import './styles/themes/ocean.css';
```

### Step 3: Register the Theme (Optional)

For TypeScript support and theme context awareness:

```tsx
// themes/custom-themes.ts
import { ThemeConfig } from '@vishva-sutra/ui';

export const oceanTheme: ThemeConfig = {
  name: 'ocean',
  displayName: 'Ocean Deep',
  isDark: true,
  colors: {
    primary: { h: 180, s: 70, l: 50 },
    // ... other color tokens
  },
};
```

## Design Tokens

### Color Tokens

All colors use HSL format for easy manipulation:

| Token | Purpose |
|-------|---------|
| `--background` | Page background |
| `--foreground` | Primary text color |
| `--card` | Card/surface background |
| `--card-foreground` | Text on cards |
| `--primary` | Primary actions, links |
| `--primary-foreground` | Text on primary |
| `--secondary` | Secondary actions |
| `--secondary-foreground` | Text on secondary |
| `--muted` | Disabled/subtle backgrounds |
| `--muted-foreground` | Subtle text |
| `--accent` | Highlight, selection |
| `--accent-foreground` | Text on accent |
| `--destructive` | Error, danger |
| `--destructive-foreground` | Text on destructive |
| `--success` | Success states |
| `--success-foreground` | Text on success |
| `--warning` | Warning states |
| `--warning-foreground` | Text on warning |
| `--border` | Border color |
| `--input` | Input backgrounds |
| `--ring` | Focus ring color |

### Spacing & Layout Tokens

| Token | Purpose |
|-------|---------|
| `--radius` | Base border radius |
| `--shadow` | Default shadow |
| `--shadow-lg` | Large shadow |

## Best Practices

### 1. Semantic Color Usage

Always use semantic color tokens rather than hardcoded values:

```tsx
// ✅ Good - uses semantic token
<div className="bg-destructive text-destructive-foreground">
  Error message
</div>

// ❌ Bad - hardcoded color
<div className="bg-red-500 text-white">
  Error message
</div>
```

### 2. Contrast Ratios

Ensure your custom themes meet WCAG 2.2 AA standards:

- **Normal text**: 4.5:1 minimum contrast
- **Large text (18px+)**: 3:1 minimum contrast
- **UI components**: 3:1 minimum contrast

### 3. Test All States

When creating themes, test:

- Light/dark mode
- Hover/focus/active states
- Disabled states
- Error/success/warning states
- High contrast mode

### 4. Avoid Flash of Unstyled Content

Always include `ThemeScript` in the document head:

```tsx
<head>
  <ThemeScript defaultTheme="modern-light" />
</head>
```

### 5. Persist User Preference

Theme selection is automatically persisted to localStorage. The key used is `theme`.

---

For more information, see the [Component API Reference](./components.md) and [Design Rationale](./design-rationale.md).
