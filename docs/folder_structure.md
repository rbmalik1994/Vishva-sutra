# Project Folder Structure Blueprint

This document describes the recommended, improved folder structure and conventions for this repository. It is intended as a single-source blueprint to help contributors navigate, extend, and maintain the monorepo.

**Last updated**: 2026-01-19

**Overview**

- **Repository type**: Monorepo containing multiple applications and shared packages (frontend, mobile, admin, reusable UI and CLI packages, plus core services).
- **Organization principle**: By product/feature (apps/) and by shared packages/libraries (packages/), with top-level infrastructure and tooling in `scripts/` and `tools/`.

**Structure (high-level)**

- apps/: Top-level application projects (each app is a deployable unit)
  - admin/: Admin application
  - mobile/: Mobile app
  - SubApps/: Additional smaller apps or feature apps
  - web/: Main web application
  - www/: Static or marketing site
- packages/: Reusable code and libraries consumed by apps
  - assets/: Shared images, icons, fonts
  - cli/: Shared CLI tooling and developer scripts
  - ui/: Shared UI components and design system
- core/: Shared backend/core services and utilities (business logic, domain libs)
- api/: API surface (if present — route handlers, contract definitions)
- docs/: Documentation (this file belongs here)
- extensions/: Integrations or optional plugins
- scripts/: Build, release, and developer scripts
- tools/: Developer tooling, generators, linters, build helpers

**Directory visualization (markdown list, depth = 3)**

- apps/
  - admin/
    - (source files, README, build config)
  - mobile/
    - (native and/or cross-platform source, config)
  - SubApps/
  - web/
  - www/
- packages/
  - assets/
  - cli/
  - ui/
- core/
- api/
- docs/
  - folder_structure.md
- extensions/
- scripts/
- tools/

Key directory analysis

- **apps/**: Each subfolder is a deployable app. Keep each app self-contained: source, configuration, README, tests, CI config relevant to that app. Prefer a consistent structure for apps, e.g.:
  - src/
  - public/ or static/
  - tests/
  - package.json or platform-specific config
  - README.md

- **packages/**: Shareable libraries used across apps. Keep them focused and small:
  - `ui/` — design system and shared React/TS components. Use a consistent export entry (index.ts) and maintain versioning and changelogs if published.
  - `cli/` — developer CLI utilities, scripts, and helpers.
  - `assets/` — centrally managed images, fonts, and icons (organized by type and purpose).

- **core/**: Location for business/domain logic that must remain platform-agnostic. Prefer plain, dependency-free code that can be reused by backends and server-rendered apps.

- **docs/**: Project-level documentation. Keep living documents here: onboarding, architecture, folder_structure.md, and contribution guidelines.

- **scripts/** and **tools/**: Developer tooling, build orchestration, release helpers, and project-level scripts. These should be runnable from repo root and documented in README or CONTRIBUTING.

File placement patterns and recommendations

- Configuration files: Place app-level configuration inside the app (e.g., `apps/web/next.config.js`) and repo-wide CI or lint configs at the repo root.
- Models/entities: Keep domain models under `core/` or inside the app feature where they are primarily used; prefer co-location with business logic when app-specific.
- Business logic/services: Put reusable business logic in `core/` and app-specific services in `apps/<app>/src/services/`.
- Interfaces/Types: Shared TS types should live in `packages/ui` or a dedicated `packages/types` (create if needed) to avoid circular deps.
- Tests: Co-locate unit tests with implementation files (e.g., `__tests__` or `.test.tsx`) and place integration tests in an `integration/` directory under the app or repo-level `tests/`.

Naming and organization conventions

- File names: Use `kebab-case` for folders and static assets, `PascalCase` for React component filenames and component exports, `camelCase` for utility files if preferred. Maintain consistency across the repo.
- Package and module names: Follow npm/packaging conventions. Internal packages should use a clear, short prefix (e.g., `@vishva/ui`).
- Namespaces/modules: Keep folder paths aligned with module boundaries to make imports predictable.

Navigation and development workflow

- Entry points: Document each app's entrypoint in that app's `README.md` and list the main app entry files in the root `README.md`.
- Adding a new feature: Create a feature folder inside the app under `src/features/<feature>/` with the feature’s components, hooks, services, and tests co-located.
- Adding a new package: Add under `packages/` with its own `package.json` and README. Keep build/test scripts minimal and consistent.
- Dependency flow: Prefer packages -> apps, not apps -> packages. Avoid circular dependencies by using a `packages/types` or `core/` for shared interfaces.

Build and output organization

- Build artifacts: Keep build output out of the repo (use `.gitignore` for `/dist`, `/build`, `node_modules/`). Each app should declare its output directory in its build config.
- CI/CD: Centralize pipeline scripts in `.github/workflows/` and document per-app deployment steps in each app README.

Technology-specific notes (observed patterns)

- Frontend (web/www): Expect a React/Next.js or static site under `apps/web` and `apps/www`. Put UI components in `packages/ui` and import them via local package resolution.
- Mobile: `apps/mobile` likely holds native or cross-platform code (React Native / Flutter). Keep platform-specific folders (`android/`, `ios/`) grouped under this app.

Extension and evolution

- Extension points: `packages/` is where new shared features should be introduced. Add clear public APIs and tests so apps can consume them safely.
- Scaling: When apps grow large, split by domain inside `src/features/` and consider extracting widely re-used features to `packages/`.

Structure templates (examples)

- New App (template):
  - apps/<new-app>/
    - src/
    - public/
    - tests/
    - package.json or platform config
    - README.md

- New Package (template):
  - packages/<new-pkg>/
    - src/
    - tests/
    - package.json
    - README.md

- New Feature (template):
  - apps/<app>/src/features/<feature>/
    - components/
    - hooks/
    - services/
    - index.ts
    - <feature>.test.ts

Structure enforcement and maintenance

- Enforce conventions with linting and CI checks: add ESLint, TypeScript (when used), and repository-level scripts in `package.json` at repo root or via `scripts/`.
- Document structural decisions in `docs/` and add a `CHANGELOG.md` entry when the blueprint changes.

Maintaining this blueprint

- Update this file whenever you add new top-level apps or packages, or change the repo layout.
- Recommended cadence: review this blueprint when adding a new app/package or during major refactors.

Notes & next steps

- Consider adding a `packages/types/` package for shared TypeScript interfaces if type sharing becomes frequent.
- Consider adding a minimal contributor guide at `docs/CONTRIBUTING.md` describing how to add apps/packages and how to run local builds.

---

This blueprint was produced to improve consistency and developer onboarding. Please review and request refinements if you want more granular templates, exact file counts, or automated structure checks.
