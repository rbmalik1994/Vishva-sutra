import type { ThemeConfig } from './types';

/**
 * Cyberpunk theme - Neon accents, dark backgrounds, high contrast.
 * Features electric greens, magentas, and a dark purple-tinted background.
 */
export const cyberpunkTheme: ThemeConfig = {
  name: 'cyberpunk',
  displayName: 'Cyberpunk',
  description: 'Neon-lit streets of the future with electric colors',
  colors: {
    background: '260 20% 6%',
    foreground: '180 100% 90%',
    card: { DEFAULT: '260 25% 10%', foreground: '180 100% 90%' },
    popover: { DEFAULT: '260 25% 8%', foreground: '180 100% 90%' },
    primary: { DEFAULT: '160 100% 50%', foreground: '260 20% 6%' },
    secondary: { DEFAULT: '300 100% 60%', foreground: '260 20% 6%' },
    muted: { DEFAULT: '260 20% 15%', foreground: '180 50% 60%' },
    accent: { DEFAULT: '320 100% 60%', foreground: '260 20% 6%' },
    destructive: { DEFAULT: '350 100% 60%', foreground: '0 0% 100%' },
    success: { DEFAULT: '160 100% 50%', foreground: '260 20% 6%' },
    warning: { DEFAULT: '45 100% 50%', foreground: '260 20% 6%' },
    border: '260 40% 25%',
    input: '260 30% 20%',
    ring: '160 100% 50%',
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
    xl: '0.25rem',
    '2xl': '0.5rem',
  },
  typography: {
    fontSans: "'Orbitron', 'Rajdhani', system-ui, sans-serif",
    fontMono: "'Share Tech Mono', 'Fira Code', monospace",
    fontDisplay: "'Orbitron', system-ui, sans-serif",
  },
  shadows: {
    elevation1: '0 0 5px hsl(160 100% 50% / 0.2)',
    elevation2: '0 0 10px hsl(160 100% 50% / 0.3)',
    elevation3: '0 0 20px hsl(160 100% 50% / 0.4)',
    elevation4: '0 0 30px hsl(160 100% 50% / 0.5)',
    glow: '0 0 15px hsl(160 100% 50% / 0.5)',
    glowLg: '0 0 30px hsl(160 100% 50% / 0.7)',
  },
  effects: {
    blurGlass: '12px',
  },
};
