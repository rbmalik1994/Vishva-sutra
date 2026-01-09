import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (value: Theme) => void;
  toggleTheme: () => void;
};

const defaultStorageKey = 'vishva-theme';
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme, storageKey: string) {
  if (typeof document === 'undefined') return;
  const resolved = theme === 'system' ? getSystemTheme() : theme;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(resolved);
  try {
    localStorage.setItem(storageKey, theme);
  } catch (error) {
    // noop: storage may be blocked
    console.warn('Theme persistence skipped', error);
  }
}

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  storageKey?: string;
  defaultTheme?: Theme;
}> = ({ children, storageKey = defaultStorageKey, defaultTheme = 'system' }) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(getSystemTheme());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(storageKey) as Theme | null;
    const initialTheme = stored || defaultTheme;
    setThemeState(initialTheme);
    const system = getSystemTheme();
    setResolvedTheme(initialTheme === 'system' ? system : initialTheme);
    applyTheme(initialTheme, storageKey);
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const system = getSystemTheme();
      setResolvedTheme(theme === 'system' ? system : theme);
      applyTheme(theme, storageKey);
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [theme, storageKey]);

  const setTheme = useCallback(
    (value: Theme) => {
      setThemeState(value);
      const system = getSystemTheme();
      setResolvedTheme(value === 'system' ? system : value);
      applyTheme(value, storageKey);
    },
    [storageKey]
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

export const themeScript = `(() => {
  const storageKey = '${defaultStorageKey}';
  try {
    const stored = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme);
  } catch (error) {
    console.warn('Theme script skipped', error);
  }
})();`;
