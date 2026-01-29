import type { ThemeConfig } from '../types';

/**
 * Apple Liquid theme - Translucent, glass-like surfaces with subtle blur effects.
 * Inspired by macOS Big Sur and iOS design language.
 */
export const liquidLightTheme: ThemeConfig = {
  name: 'liquid-light',
  displayName: 'Liquid Light',
  description: 'Translucent glass-like surfaces with vibrant colors',
  colors: {
    background: '220 20% 97%',
    foreground: '220 20% 10%',
    card: { DEFAULT: '0 0% 100% / 0.7', foreground: '220 20% 10%' },
    popover: { DEFAULT: '0 0% 100% / 0.85', foreground: '220 20% 10%' },
    primary: { DEFAULT: '211 100% 50%', foreground: '0 0% 100%' },
    secondary: { DEFAULT: '220 10% 95%', foreground: '220 20% 10%' },
    muted: { DEFAULT: '220 10% 93%', foreground: '220 10% 45%' },
    accent: { DEFAULT: '280 80% 60%', foreground: '0 0% 100%' },
    destructive: { DEFAULT: '0 80% 55%', foreground: '0 0% 100%' },
    success: { DEFAULT: '142 70% 45%', foreground: '0 0% 100%' },
    warning: { DEFAULT: '38 95% 55%', foreground: '220 20% 10%' },
    border: '220 15% 90%',
    input: '0 0% 100% / 0.5',
    ring: '211 100% 50%',
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
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
  typography: {
    fontSans: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    fontMono: "'SF Mono', 'Menlo', monospace",
    fontDisplay: "'SF Pro Display', -apple-system, sans-serif",
  },
  shadows: {
    elevation1: '0 1px 3px rgb(0 0 0 / 0.08)',
    elevation2: '0 4px 12px rgb(0 0 0 / 0.1)',
    elevation3: '0 8px 24px rgb(0 0 0 / 0.12)',
    elevation4: '0 16px 48px rgb(0 0 0 / 0.15)',
    glow: '0 0 0 4px hsl(211 100% 50% / 0.2)',
    glowLg: '0 0 0 6px hsl(211 100% 50% / 0.3)',
  },
  effects: {
    blurGlass: '20px',
  },
};

export const liquidDarkTheme: ThemeConfig = {
  name: 'liquid-dark',
  displayName: 'Liquid Dark',
  description: 'Dark translucent surfaces with frosted glass effect',
  colors: {
    background: '220 15% 8%',
    foreground: '220 10% 95%',
    card: { DEFAULT: '220 15% 12% / 0.7', foreground: '220 10% 95%' },
    popover: { DEFAULT: '220 15% 10% / 0.9', foreground: '220 10% 95%' },
    primary: { DEFAULT: '211 100% 55%', foreground: '0 0% 100%' },
    secondary: { DEFAULT: '220 15% 18%', foreground: '220 10% 95%' },
    muted: { DEFAULT: '220 15% 16%', foreground: '220 10% 60%' },
    accent: { DEFAULT: '280 80% 65%', foreground: '0 0% 100%' },
    destructive: { DEFAULT: '0 70% 50%', foreground: '0 0% 100%' },
    success: { DEFAULT: '142 70% 50%', foreground: '0 0% 100%' },
    warning: { DEFAULT: '38 95% 60%', foreground: '220 15% 8%' },
    border: '220 15% 20%',
    input: '220 15% 15% / 0.6',
    ring: '211 100% 55%',
  },
  spacing: liquidLightTheme.spacing,
  radius: liquidLightTheme.radius,
  typography: liquidLightTheme.typography,
  shadows: {
    elevation1: '0 1px 3px rgb(0 0 0 / 0.2)',
    elevation2: '0 4px 12px rgb(0 0 0 / 0.3)',
    elevation3: '0 8px 24px rgb(0 0 0 / 0.35)',
    elevation4: '0 16px 48px rgb(0 0 0 / 0.4)',
    glow: '0 0 0 4px hsl(211 100% 55% / 0.25)',
    glowLg: '0 0 0 6px hsl(211 100% 55% / 0.35)',
  },
  effects: {
    blurGlass: '24px',
  },
};

// Alias for backwards compatibility
export const liquidTheme = liquidLightTheme;
