#!/bin/sh
# Tooling stubs.

write_stub_file() {
  target=$1
  content=$2
  if [ -f "$target" ]; then
    warn "$target already exists. Skipping."
    return 0
  fi
  ensure_dir "$(dirname "$target")"
  if [ "$DRY_RUN" -eq 1 ]; then
    dry_run_print "create $target"
    return 0
  fi
  printf "%s\n" "$content" > "$target"
  add_action "Created file: $target"
  ok "Created $target"
}

tooling_flow() {
  root=$1
  if [ -z "$root" ]; then
    error "Workspace root is required."
    return 1
  fi

  if confirm "Add ESLint and Prettier stubs?" "n"; then
    write_stub_file "$root/.eslintrc.cjs" "module.exports = {\n  root: true,\n  env: { browser: true, node: true, es2022: true },\n  extends: [],\n  rules: {},\n};"
    write_stub_file "$root/.prettierrc.json" "{\n  \"singleQuote\": true,\n  \"trailingComma\": \"all\"\n}"
    write_stub_file "$root/.prettierignore" "node_modules\ndist\nbuild\n"
  fi

  if confirm "Add Black formatter stub?" "n"; then
    write_stub_file "$root/pyproject.toml" "[tool.black]\nline-length = 88\n"
  fi

  if confirm "Add GitHub Actions CI stub?" "n"; then
    write_stub_file "$root/.github/workflows/ci.yml" "name: CI\n\non:\n  push:\n    branches: [main]\n  pull_request:\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout\n        uses: actions/checkout@v4\n      - name: CI stub\n        run: echo \"CI placeholder\"\n"
  fi
}
