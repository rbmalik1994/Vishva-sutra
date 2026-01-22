# Quick Reference - Workspace Package Builder

## Usage

```bash
./main.sh [OPTIONS]
```

## Options

| Flag | Description |
|------|-------------|
| `--dry-run` | Print commands without executing |
| `--yes` | Auto-confirm all prompts |
| `--quiet` | Reduce output |
| `--verbose` | Show debug output |
| `--help` | Show help message |

## Interactive Prompts

1. **Workspace root** - Directory path (default: `.`)
2. **Package manager** - npm, yarn, pnpm, pip, cargo, apt
3. **Monorepo config** - None, pnpm, yarn, npm, lerna, turbo, nx
4. **Create packages** - Number of packages/apps to create
5. **For each package**:
   - Name (required)
   - Relative path (default: `packages`)
   - Stack: React, Node, Rust, Python, Go, Static
6. **Add tooling** - ESLint, Prettier, Black, GitHub Actions

## Examples

### Basic Interactive Usage
```bash
./main.sh
```

### Dry-Run Mode (Preview Only)
```bash
./main.sh --dry-run
```

### Scripted Usage
```bash
./main.sh --dry-run <<'EOF'
my-workspace
y
y
n

1
1
y
1
my-app
apps
1
n
n
EOF
```

## File Structure Created

```
workspace/
├── .gitignore
├── README.md
├── .workspace-builder/
│   └── config
├── packages/
│   └── package-name/
│       ├── src/
│       └── package.json
└── apps/
    └── app-name/
        ├── src/
        └── package.json
```

## Stack Templates

| Stack | Files Created |
|-------|---------------|
| React | `package.json`, `src/App.jsx` |
| Node | `package.json`, `src/index.js` |
| Python | `pyproject.toml`, `src/<module>/__init__.py` |
| Rust | `Cargo.toml`, `src/main.rs` |
| Go | `go.mod`, `main.go` |
| Static | `index.html`, `styles.css` |

## Testing

```bash
# Validation
./validate.sh

# Integration tests
./integration-test.sh

# Idempotency tests
./test-idempotency.sh
```

## Troubleshooting

### Issue: Prompts not appearing
**Solution**: Ensure you're running in an interactive terminal

### Issue: Colors not working
**Solution**: Terminal must support ANSI colors, or use `NO_COLOR=1`

### Issue: Input not being read
**Solution**: Ensure input is coming from stdin or interactive terminal

## Special Keys

| Key | Action |
|-----|--------|
| `q` or `Q` | Quit safely at any prompt |
| `Ctrl+C` | Interrupt and exit |
| Empty input | Use default value (shown in brackets) |

## Config File

Settings are saved in `.workspace-builder/config`:

```
PKG_MANAGER=npm
MONOREPO=none
```

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Error |
| 130 | Interrupted (Ctrl+C) |

## Tips

- Use `--dry-run` first to preview changes
- Use `--verbose` for debugging
- Press `q` to quit safely at any prompt
- Empty input accepts the default (shown in `[]`)
- All prompts support `y`/`n` or full word `yes`/`no`

## Documentation

- `README.md` - Full documentation
- `STATUS.md` - Current status and fixes
- `CHANGELOG.md` - Change history
- `FIX_SUMMARY.md` - Technical details
- `design.md` - Architecture
