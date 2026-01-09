# Vishva-sutra Monorepo

Scaffolded Turborepo monorepo for a Todo/Notes experience using pnpm, Vite + React, TanStack Router/Query, Tailwind CSS, and a custom shadcn-like UI package with theming and accessibility in mind.

## Quick start

1. Install dependencies
	 ```bash
	 pnpm install
	 ```
2. Run all dev servers (turbo parallel)
	 ```bash
	 pnpm dev
	 ```
3. Build, lint, and typecheck
	 ```bash
	 pnpm build
	 pnpm lint
	 pnpm typecheck
	 ```
4. Preview web app after build
	 ```bash
	 pnpm --filter @vishva-sutra/web preview
	 ```

## Workspace layout

- apps/
	- web/ (Vite + React + TanStack Router/Query demo with theming, skip link, and localStorage-backed todos)
	- www/, admin/, mobile/, cli/, api/, sdk/, SubApps/ (placeholders for future expansion)
- packages/
	- ui/ (Tailwind + CSS variable theming, accessible primitives, ThemeProvider)
	- assets/ (reserved)
- libs/interfaces (shared DTOs for todos/notes)
- configs/ (shared Tailwind, PostCSS, ESLint, Prettier, tsconfig.base)
- scripts/, tools/, extensions/, docs/ (stubs for utilities and documentation)

## Key packages

- @vishva-sutra/ui
	- Components: Button, Input, Textarea, Card, Modal
	- Theming: ThemeProvider, useTheme, `themeScript` for pre-hydration data-theme application
	- Styles: import `@vishva-sutra/ui/styles.css` for CSS variables and focus-visible defaults
- @vishva-sutra/interfaces
	- Shared types for Todo/Note and request/response DTOs

## Accessibility notes

- Skip link included in apps/web and visible on focus.
- Focus-visible outlines and color tokens maintain >= 3:1 (controls) and >= 4.5:1 (text) contrast.
- Buttons, inputs, and modal include appropriate aria roles/labels; theme preference persists via localStorage.
- Please run manual checks (e.g., Accessibility Insights, keyboard navigation, screen reader) to validate WCAG 2.2 AA.

## CI

- .github/workflows/ci.yml runs pnpm install, lint, typecheck, and build on push/PR.
