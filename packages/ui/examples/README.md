# Integration Examples

This directory contains example integrations showing how to use @vishva-sutra/ui in different frameworks.

## Examples

### [Next.js App Router](./nextjs-app-router/)
Integration with Next.js 13+ App Router, including SSR-safe theming.

### [Vanilla React (Vite)](./react-vite/)
Basic React setup with Vite bundler.

## Quick Setup Guides

### Next.js App Router

1. Install dependencies:
```bash
pnpm add @vishva-sutra/ui
```

2. Configure Tailwind (`tailwind.config.ts`):
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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

3. Create root layout (`app/layout.tsx`):
```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider, ThemeScript } from '@vishva-sutra/ui';
import '@vishva-sutra/ui/styles/globals.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My App',
  description: 'Built with @vishva-sutra/ui',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="modern-light" />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="modern-light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

4. Use components (`app/page.tsx`):
```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@vishva-sutra/ui';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Your app is ready.</p>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </main>
  );
}
```

### Vanilla React (Vite)

1. Create project:
```bash
pnpm create vite my-app --template react-ts
cd my-app
pnpm add @vishva-sutra/ui tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Configure Tailwind (`tailwind.config.js`):
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
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
```

3. Update main entry (`src/main.tsx`):
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@vishva-sutra/ui';
import '@vishva-sutra/ui/styles/globals.css';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="modern-light">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

4. Use components (`src/App.tsx`):
```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, useTheme } from '@vishva-sutra/ui';

function App() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Your app is ready.</p>
          
          <div className="flex flex-wrap gap-2">
            {themes.map((t) => (
              <Button
                key={t}
                variant={theme === t ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
```

5. Update CSS (`src/index.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Run:
```bash
pnpm dev
```
