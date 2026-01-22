'use client';

import * as React from 'react';
import type { ThemeContextValue, ThemeConfig, ThemeName, ThemeProviderProps } from './types';
import {
  modernLightTheme,
  modernDarkTheme,
  cyberpunkTheme,
  retroTheme,
  liquidLightTheme,
  liquidDarkTheme,
  brutalistTheme,
} from './presets';

const defaultThemes: ThemeConfig[] = [
  modernLightTheme,
  modernDarkTheme,
  cyberpunkTheme,
  retroTheme,
  liquidLightTheme,
  liquidDarkTheme,
  brutalistTheme,
];

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

/**
 * Hook to access the current theme context.
 * Must be used within a ThemeProvider.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, setTheme, availableThemes } = useTheme();
 *
 *   return (
 *     <select value={theme} onChange={(e) => setTheme(e.target.value as ThemeName)}>
 *       {availableThemes.map((t) => (
 *         <option key={t} value={t}>{t}</option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

const STORAGE_KEY_DEFAULT = 'vishva-ui-theme';

/**
 * Provides theme context to the application.
 * Handles theme persistence, system preference detection, and runtime switching.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ThemeProvider defaultTheme="modern-light">
 *   <App />
 * </ThemeProvider>
 *
 * // With system preference
 * <ThemeProvider enableSystem defaultTheme="modern-light">
 *   <App />
 * </ThemeProvider>
 *
 * // With custom themes
 * <ThemeProvider themes={[...defaultThemes, myCustomTheme]}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  defaultTheme = 'modern-light',
  storageKey = STORAGE_KEY_DEFAULT,
  enableSystem = true,
  themes = defaultThemes,
  forcedTheme,
  attribute = 'data-theme',
  children,
}: ThemeProviderProps): React.JSX.Element {
  const [theme, setThemeState] = React.useState<ThemeName>(() => {
    if (forcedTheme) return forcedTheme;

    // Try to get from storage (only on client)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored && themes.some((t) => t.name === stored)) {
        return stored as ThemeName;
      }
    }

    return defaultTheme;
  });

  const [isSystemTheme, setIsSystemTheme] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`${storageKey}-system`) === 'true';
    }
    return false;
  });

  const availableThemes = React.useMemo<ThemeName[]>(
    () => themes.map((t) => t.name),
    [themes]
  );

  const config = React.useMemo<ThemeConfig | null>(
    () => themes.find((t) => t.name === theme) ?? null,
    [themes, theme]
  );

  // Apply theme to document
  const applyTheme = React.useCallback(
    (themeName: ThemeName) => {
      if (typeof window === 'undefined') return;

      const root = document.documentElement;

      if (attribute === 'class') {
        // Remove all theme classes
        availableThemes.forEach((t) => {
          root.classList.remove(t);
        });
        root.classList.remove('dark', 'light');

        // Add new theme class
        root.classList.add(themeName);
        if (themeName.includes('dark')) {
          root.classList.add('dark');
        }
      } else {
        // Use data attribute
        root.setAttribute('data-theme', themeName);
      }
    },
    [attribute, availableThemes]
  );

  // Handle system preference
  React.useEffect(() => {
    if (!enableSystem || !isSystemTheme || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const systemTheme = e.matches ? 'modern-dark' : 'modern-light';
      setThemeState(systemTheme);
      applyTheme(systemTheme);
    };

    // Set initial value
    handleChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableSystem, isSystemTheme, applyTheme]);

  // Apply theme on mount and changes
  React.useEffect(() => {
    if (forcedTheme) {
      applyTheme(forcedTheme);
      return;
    }

    applyTheme(theme);
  }, [theme, forcedTheme, applyTheme]);

  const setTheme = React.useCallback(
    (newTheme: ThemeName) => {
      if (forcedTheme) return;

      setIsSystemTheme(false);
      setThemeState(newTheme);

      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, newTheme);
        localStorage.setItem(`${storageKey}-system`, 'false');
      }
    },
    [forcedTheme, storageKey]
  );

  const toggleTheme = React.useCallback(() => {
    const isDark = theme.includes('dark') || theme === 'cyberpunk';

    // Find matching light/dark variant
    let newTheme: ThemeName;

    if (theme.includes('modern')) {
      newTheme = isDark ? 'modern-light' : 'modern-dark';
    } else if (theme.includes('liquid')) {
      newTheme = isDark ? 'liquid-light' : 'liquid-dark';
    } else {
      // For themes without variants, toggle between modern light/dark
      newTheme = isDark ? 'modern-light' : 'modern-dark';
    }

    setTheme(newTheme);
  }, [theme, setTheme]);

  const setSystemTheme = React.useCallback(() => {
    if (!enableSystem) return;

    setIsSystemTheme(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`${storageKey}-system`, 'true');
      localStorage.removeItem(storageKey);
    }
  }, [enableSystem, storageKey]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme: forcedTheme ?? theme,
      setTheme,
      toggleTheme,
      config,
      availableThemes,
      isSystemTheme,
      setSystemTheme,
    }),
    [
      forcedTheme,
      theme,
      setTheme,
      toggleTheme,
      config,
      availableThemes,
      isSystemTheme,
      setSystemTheme,
    ]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Script to prevent flash of unstyled content (FOUC) during SSR.
 * Include this in your document head for optimal theme loading.
 *
 * @example
 * ```tsx
 * // In Next.js app/layout.tsx
 * <head>
 *   <ThemeScript />
 * </head>
 * ```
 */
export function ThemeScript({
  storageKey = STORAGE_KEY_DEFAULT,
  defaultTheme = 'modern-light',
  attribute = 'data-theme',
}: {
  storageKey?: string;
  defaultTheme?: ThemeName;
  attribute?: 'class' | 'data-theme';
}): React.JSX.Element {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('${storageKey}');
        var isSystem = localStorage.getItem('${storageKey}-system') === 'true';
        
        if (isSystem) {
          var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          theme = isDark ? 'modern-dark' : 'modern-light';
        }
        
        if (!theme) theme = '${defaultTheme}';
        
        var root = document.documentElement;
        ${
          attribute === 'class'
            ? `root.classList.add(theme);
               if (theme.includes('dark')) root.classList.add('dark');`
            : `root.setAttribute('data-theme', theme);`
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
