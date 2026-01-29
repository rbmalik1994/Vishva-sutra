/**
 * Theme token types for the Vishva UI component library.
 * These types ensure type safety when creating and consuming themes.
 */

export type ThemeName =
  | 'modern'
  | 'modern-light'
  | 'modern-dark'
  | 'cyberpunk'
  | 'retro'
  | 'liquid'
  | 'liquid-light'
  | 'liquid-dark'
  | 'brutalist';

export interface ColorScale {
  DEFAULT: string;
  foreground: string;
}

export interface ColorTokens {
  /** Page and container backgrounds */
  background: string;
  /** Default text color */
  foreground: string;
  /** Card component colors */
  card: ColorScale;
  /** Popover and dropdown colors */
  popover: ColorScale;
  /** Primary brand color */
  primary: ColorScale;
  /** Secondary/subtle color */
  secondary: ColorScale;
  /** Muted/disabled colors */
  muted: ColorScale;
  /** Accent highlights */
  accent: ColorScale;
  /** Error/danger states */
  destructive: ColorScale;
  /** Success states */
  success: ColorScale;
  /** Warning states */
  warning: ColorScale;
  /** Border color */
  border: string;
  /** Input border/background */
  input: string;
  /** Focus ring color */
  ring: string;
}

export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface RadiusTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface TypographyTokens {
  fontSans: string;
  fontMono: string;
  fontDisplay: string;
}

export interface ShadowTokens {
  elevation1: string;
  elevation2: string;
  elevation3: string;
  elevation4: string;
  glow: string;
  glowLg: string;
}

export interface EffectTokens {
  blurGlass: string;
}

/**
 * Complete theme configuration object.
 * Used for programmatic theme creation and TypeScript autocomplete.
 */
export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  description: string;
  colors: ColorTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  typography: TypographyTokens;
  shadows: ShadowTokens;
  effects: EffectTokens;
}

/**
 * Partial theme config for overrides.
 * Allows consumers to override specific tokens while inheriting the rest.
 */
export type PartialThemeConfig = {
  name?: string;
  displayName?: string;
  description?: string;
  colors?: Partial<ColorTokens>;
  spacing?: Partial<SpacingTokens>;
  radius?: Partial<RadiusTokens>;
  typography?: Partial<TypographyTokens>;
  shadows?: Partial<ShadowTokens>;
  effects?: Partial<EffectTokens>;
};

/**
 * Theme context value exposed to consumers.
 */
export interface ThemeContextValue {
  /** Current active theme name */
  theme: ThemeName;
  /** Set the active theme */
  setTheme: (theme: ThemeName) => void;
  /** Toggle between light and dark variants */
  toggleTheme: () => void;
  /** Get current theme config object */
  config: ThemeConfig | null;
  /** List of available theme names */
  availableThemes: ThemeName[];
  /** Whether system preference is being used */
  isSystemTheme: boolean;
  /** Set to use system preference */
  setSystemTheme: () => void;
}

/**
 * Props for ThemeProvider component.
 */
export interface ThemeProviderProps {
  /** Initial theme to use */
  defaultTheme?: ThemeName;
  /** Storage key for persisting theme preference */
  storageKey?: string;
  /** Whether to respect system color scheme preference */
  enableSystem?: boolean;
  /** Custom theme configurations */
  themes?: ThemeConfig[];
  /** Force a specific theme (ignores user preference) */
  forcedTheme?: ThemeName;
  /** Attribute to set on document element */
  attribute?: 'class' | 'data-theme';
  /** Children to render */
  children: React.ReactNode;
}
