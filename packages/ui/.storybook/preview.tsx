import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider, type ThemeName } from '../src/themes';
import '../src/styles/globals.css';

const THEMES: ThemeName[] = [
  'modern-light',
  'modern-dark',
  'cyberpunk',
  'retro',
  'liquid-light',
  'liquid-dark',
  'brutalist',
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'modern-light',
      toolbar: {
        icon: 'paintbrush',
        items: THEMES.map((theme) => ({
          value: theme,
          title: theme
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
        })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as ThemeName;
      const isDark = theme.includes('dark') || theme === 'cyberpunk';

      return (
        <ThemeProvider forcedTheme={theme}>
          <div
            className={`min-h-screen p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
            style={{
              backgroundColor: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
            }}
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
