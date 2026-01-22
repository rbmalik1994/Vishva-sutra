import type { ThemeConfig } from './types';

/**
 * Brutalist theme - Raw, high-contrast, grid-driven layouts with bold typography.
 * Features stark black and white with red accents and hard shadows.
 */
export const brutalistTheme: ThemeConfig = {
  name: 'brutalist',
  displayName: 'Brutalist',
  description: 'Raw, uncompromising design with maximum contrast',
  colors: {
    background: '0 0% 100%',
    foreground: '0 0% 0%',
    card: { DEFAULT: '0 0% 100%', foreground: '0 0% 0%' },
    popover: { DEFAULT: '0 0% 100%', foreground: '0 0% 0%' },
    primary: { DEFAULT: '0 0% 0%', foreground: '0 0% 100%' },
    secondary: { DEFAULT: '0 0% 95%', foreground: '0 0% 0%' },
    muted: { DEFAULT: '0 0% 90%', foreground: '0 0% 40%' },
    accent: { DEFAULT: '0 100% 50%', foreground: '0 0% 100%' },
    destructive: { DEFAULT: '0 100% 50%', foreground: '0 0% 100%' },
    success: { DEFAULT: '0 0% 0%', foreground: '0 0% 100%' },
    warning: { DEFAULT: '45 100% 50%', foreground: '0 0% 0%' },
    border: '0 0% 0%',
    input: '0 0% 100%',
    ring: '0 0% 0%',
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
    sm: '0',
    md: '0',
    lg: '0',
    xl: '0',
    '2xl': '0',
  },
  typography: {
    fontSans: "'Space Grotesk', 'Archivo Black', system-ui, sans-serif",
    fontMono: "'Space Mono', monospace",
    fontDisplay: "'Archivo Black', 'Space Grotesk', sans-serif",
  },
  shadows: {
    elevation1: '4px 4px 0 0 rgb(0 0 0 / 1)',
    elevation2: '6px 6px 0 0 rgb(0 0 0 / 1)',
    elevation3: '8px 8px 0 0 rgb(0 0 0 / 1)',
    elevation4: '12px 12px 0 0 rgb(0 0 0 / 1)',
    glow: '4px 4px 0 0 rgb(0 0 0 / 1)',
    glowLg: '8px 8px 0 0 rgb(0 0 0 / 1)',
  },
  effects: {
    blurGlass: '0px',
  },
};
