---
post_title: Workspace Package Builder CLI
author1: GitHub Copilot
post_slug: workspace-package-builder-cli
microsoft_alias: n/a
featured_image: none
categories: [tooling]
tags: [shell, cli, scaffolding]
ai_note: AI-assisted
summary: POSIX-friendly interactive CLI for scaffolding workspaces, packages,
  and basic tooling stubs.
post_date: 2026-01-20
---

## Overview

workspace-package-builder is a POSIX-compatible, interactive CLI that scaffolds
monorepo-style workspaces, packages, and apps with safe, idempotent prompts.

## Recent Fixes (2026-01-22)

- Fixed I/O redirection: all prompts now write to stderr, function returns use stdout
- Fixed `prompt_input`, `choose`, and `confirm` functions to properly handle input/output
- Fixed color output to only appear on terminals
- Fixed numeric input validation
- Improved error handling and edge cases

See [CHANGELOG.md](CHANGELOG.md) for complete details.

## Usage

- Run the entrypoint:
  - scripts/workspace-package-builder/main.sh
- Optional flags:
  - --dry-run
  - --yes
  - --quiet
  - --verbose

## Example flow

1. Initialize workspace.
2. Choose package manager.
3. Configure monorepo workspaces (optional).
4. Create packages/apps.
5. Add lint/format/CI stubs (optional).

## Dry-run guidance

Use --dry-run to print commands without executing them. This is required for any
operation that could perform installs or network actions.

## Testing

Integration and idempotency test scripts are available:
- [integration-test.sh](integration-test.sh) - Full workflow testing
- [test-idempotency.sh](test-idempotency.sh) - Validates repeated runs are safe

Run integration tests:
```bash
./integration-test.sh
```

Run idempotency tests:
```bash
./test-idempotency.sh
```
