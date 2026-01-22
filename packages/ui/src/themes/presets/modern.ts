import type { ThemeConfig } from './types';

/**
 * Modern theme - Clean, minimal, contemporary design inspired by shadcn/ui.
 * Features neutral colors with excellent contrast and subtle shadows.
 */
export const modernLightTheme: ThemeConfig = {
  name: 'modern-light',
  displayName: 'Modern Light',
  description: 'Clean, minimal design with excellent readability',
  colors: {
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',
    card: { DEFAULT: '0 0% 100%', foreground: '222.2 84% 4.9%' },
    popover: { DEFAULT: '0 0% 100%', foreground: '222.2 84% 4.9%' },
    primary: { DEFAULT: '222.2 47.4% 11.2%', foreground: '210 40% 98%' },
    secondary: { DEFAULT: '210 40% 96.1%', foreground: '222.2 47.4% 11.2%' },
    muted: { DEFAULT: '210 40% 96.1%', foreground: '215.4 16.3% 46.9%' },
    accent: { DEFAULT: '210 40% 96.1%', foreground: '222.2 47.4% 11.2%' },
    destructive: { DEFAULT: '0 84.2% 60.2%', foreground: '210 40% 98%' },
    success: { DEFAULT: '142 76% 36%', foreground: '210 40% 98%' },
    warning: { DEFAULT: '38 92% 50%', foreground: '222.2 84% 4.9%' },
    border: '214.3 31.8% 91.4%',
    input: '214.3 31.8% 91.4%',
    ring: '222.2 84% 4.9%',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
  },
  typography: {
    fontSans: "'Inter', system-ui, -apple-system, sans-serif",
    fontMono: "'JetBrains Mono', 'Fira Code', monospace",
    fontDisplay: "'Inter', system-ui, sans-serif",
  },
  shadows: {
    elevation1: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    elevation2: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    elevation3: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    elevation4: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    glow: '0 0 0 3px hsl(222.2 84% 4.9% / 0.2)',
    glowLg: '0 0 0 4px hsl(222.2 84% 4.9% / 0.3)',
  },
  effects: {
    blurGlass: '8px',
  },
};

export const modernDarkTheme: ThemeConfig = {
  name: 'modern-dark',
  displayName: 'Modern Dark',
  description: 'Dark variant of the modern theme with reduced eye strain',
  colors: {
    background: '222.2 84% 4.9%',
    foreground: '210 40% 98%',
    card: { DEFAULT: '222.2 84% 4.9%', foreground: '210 40% 98%' },
    popover: { DEFAULT: '222.2 84% 4.9%', foreground: '210 40% 98%' },
    primary: { DEFAULT: '210 40% 98%', foreground: '222.2 47.4% 11.2%' },
    secondary: { DEFAULT: '217.2 32.6% 17.5%', foreground: '210 40% 98%' },
    muted: { DEFAULT: '217.2 32.6% 17.5%', foreground: '215 20.2% 65.1%' },
    accent: { DEFAULT: '217.2 32.6% 17.5%', foreground: '210 40% 98%' },
    destructive: { DEFAULT: '0 62.8% 30.6%', foreground: '210 40% 98%' },
    success: { DEFAULT: '142 70% 45%', foreground: '210 40% 98%' },
    warning: { DEFAULT: '38 92% 50%', foreground: '222.2 84% 4.9%' },
    border: '217.2 32.6% 17.5%',
    input: '217.2 32.6% 17.5%',
    ring: '212.7 26.8% 83.9%',
  },
  spacing: modernLightTheme.spacing,
  radius: modernLightTheme.radius,
  typography: modernLightTheme.typography,
  shadows: {
    elevation1: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    elevation2: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
    elevation3: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
    elevation4: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
    glow: '0 0 0 3px hsl(212.7 26.8% 83.9% / 0.2)',
    glowLg: '0 0 0 4px hsl(212.7 26.8% 83.9% / 0.3)',
  },
  effects: {
    blurGlass: '8px',
  },
};

// Alias for backwards compatibility
export const modernTheme = modernLightTheme;
