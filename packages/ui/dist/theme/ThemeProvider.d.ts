import React from 'react';
type Theme = 'light' | 'dark' | 'system';
type ThemeContextValue = {
    theme: Theme;
    resolvedTheme: 'light' | 'dark';
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    toggleTheme: () => void;
};
export declare const ThemeProvider: React.FC<{
    children: React.ReactNode;
    storageKey?: string;
    defaultTheme?: Theme;
}>;
export declare function useTheme(): ThemeContextValue;
export declare const themeScript = "(() => {\n  const storageKey = 'vishva-theme';\n  try {\n    const stored = localStorage.getItem(storageKey);\n    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;\n    const theme = stored || (prefersDark ? 'dark' : 'light');\n    document.documentElement.dataset.theme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;\n    document.documentElement.classList.remove('light', 'dark');\n    document.documentElement.classList.add(theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme);\n  } catch (error) {\n    console.warn('Theme script skipped', error);\n  }\n})();";
export {};
//# sourceMappingURL=ThemeProvider.d.ts.map