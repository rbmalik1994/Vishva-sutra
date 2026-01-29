import type { ThemeConfig } from '../types';

/**
 * Retro theme - GUI/TUI inspired vintage styles with pixel aesthetics.
 * Evokes classic operating systems like Windows 95, Mac OS 9, and terminal UIs.
 */
export const retroTheme: ThemeConfig = {
  name: 'retro',
  displayName: 'Retro',
  description: 'Nostalgic vintage computing aesthetics with hard shadows',
  colors: {
    background: '60 30% 96%',
    foreground: '0 0% 0%',
    card: { DEFAULT: '60 40% 94%', foreground: '0 0% 0%' },
    popover: { DEFAULT: '60 30% 96%', foreground: '0 0% 0%' },
    primary: { DEFAULT: '220 70% 50%', foreground: '0 0% 100%' },
    secondary: { DEFAULT: '0 0% 85%', foreground: '0 0% 0%' },
    muted: { DEFAULT: '0 0% 90%', foreground: '0 0% 30%' },
    accent: { DEFAULT: '120 60% 35%', foreground: '0 0% 100%' },
    destructive: { DEFAULT: '0 80% 50%', foreground: '0 0% 100%' },
    success: { DEFAULT: '120 60% 35%', foreground: '0 0% 100%' },
    warning: { DEFAULT: '45 100% 45%', foreground: '0 0% 0%' },
    border: '0 0% 70%',
    input: '60 30% 96%',
    ring: '220 70% 50%',
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
    fontSans: "'IBM Plex Sans', 'Chicago', system-ui, sans-serif",
    fontMono: "'IBM Plex Mono', 'Monaco', monospace",
    fontDisplay: "'VT323', 'IBM Plex Sans', monospace",
  },
  shadows: {
    elevation1: '2px 2px 0 0 rgb(0 0 0 / 1)',
    elevation2: '3px 3px 0 0 rgb(0 0 0 / 1)',
    elevation3: '4px 4px 0 0 rgb(0 0 0 / 1)',
    elevation4: '6px 6px 0 0 rgb(0 0 0 / 1)',
    glow: '2px 2px 0 0 rgb(0 0 0 / 1)',
    glowLg: '4px 4px 0 0 rgb(0 0 0 / 1)',
  },
  effects: {
    blurGlass: '0px',
  },
};
