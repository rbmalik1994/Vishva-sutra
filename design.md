## Design

### Architecture
- Monorepo managed by Turborepo + pnpm workspaces.
- Client: Vite + React + TanStack Router/Query in apps/web (other apps stubbed).
- UI: packages/ui exposes themed, accessible components and ThemeProvider with CSS variables.
- Shared types: libs/interfaces for todos/notes DTOs.
- Build orchestration: turbo pipeline (dev parallel, build dependsOn ^build, cached outputs).
- CI: GitHub Actions installs via pnpm, then lint, typecheck, build.

### Data flow
1. Theme pre-hydration script applies data-theme from localStorage or prefers-color-scheme.
2. App mounts ThemeProvider and TanStack Query client.
3. Todos stored in localStorage; React Query lists/mutates and invalidates on change.
4. UI components render with Tailwind utility classes backed by CSS variables.

### Accessibility
- Skip link rendered before app root.
- Focus-visible styles via CSS variables; modal with dialog semantics, escape close, focus trap.
- Form controls labeled; aria-pressed on filter buttons; aria-live status hints in App.

### Theming
- CSS variables declared in @vishva-sutra/ui/styles.css for light/dark palettes.
- ThemeProvider writes data-theme and class (light/dark), persists in localStorage (key vishva-theme).
- themeScript exported for inline head usage to avoid flash.

### Testing approach
- Use pnpm test (future) with Vitest + Testing Library.
- Suggested: Button keyboard activation (Enter/Space), ThemeProvider applies data-theme, Modal traps focus.
