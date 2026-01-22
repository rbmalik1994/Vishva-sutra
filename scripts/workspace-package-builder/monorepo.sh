#!/bin/sh
# Monorepo configuration.

write_json_file() {
  target=$1
  content=$2
  if [ -f "$target" ]; then
    warn "$target already exists. Skipping."
    return 0
  fi
  if [ "$DRY_RUN" -eq 1 ]; then
    dry_run_print "create $target"
    return 0
  fi
  printf "%b\n" "$content" > "$target"
  add_action "Created file: $target"
  ok "Created $target"
}

write_text_file() {
  target=$1
  content=$2
  if [ -f "$target" ]; then
    warn "$target already exists. Skipping."
    return 0
  fi
  if [ "$DRY_RUN" -eq 1 ]; then
    dry_run_print "create $target"
    return 0
  fi
  printf "%b\n" "$content" > "$target"
  add_action "Created file: $target"
  ok "Created $target"
}

monorepo_flow() {
  choice=$(choose "Configure monorepo workspaces:" \
    "None" \
    "pnpm" \
    "yarn" \
    "npm" \
    "lerna" \
    "turbo" \
    "nx") || return 1

  case $choice in
    1) MONOREPO="none" ;;
    2) MONOREPO="pnpm" ;;
    3) MONOREPO="yarn" ;;
    4) MONOREPO="npm" ;;
    5) MONOREPO="lerna" ;;
    6) MONOREPO="turbo" ;;
    7) MONOREPO="nx" ;;
    *) MONOREPO="none" ;;
  esac

  export MONOREPO
  write_config "MONOREPO" "$MONOREPO"

  root=${WORKSPACE_ROOT:-.}

  case $MONOREPO in
    none)
      info "Skipping monorepo configuration."
      ;;
    pnpm)
      write_text_file "$root/pnpm-workspace.yaml" "packages:\n  - 'packages/*'\n  - 'apps/*'"
      ;;
    yarn|npm)
      if [ -f "$root/package.json" ]; then
        warn "package.json exists. Skipping workspace config."
      else
        write_json_file "$root/package.json" "{\n  \"name\": \"workspace\",\n  \"private\": true,\n  \"workspaces\": [\n    \"packages/*\",\n    \"apps/*\"\n  ]\n}"
      fi
      ;;
    lerna)
      write_json_file "$root/lerna.json" "{\n  \"version\": \"0.0.0\",\n  \"packages\": [\n    \"packages/*\",\n    \"apps/*\"\n  ]\n}"
      ;;
    turbo)
      write_json_file "$root/turbo.json" "{\n  \"\$schema\": \"https://turbo.build/schema.json\",\n  \"pipeline\": {\n    \"build\": {\n      \"dependsOn\": [\"^build\"],\n      \"outputs\": [\"dist/**\", \"build/**\"]\n    }\n  }\n}"
      ;;
    nx)
      warn "nx setup is complex. Follow the official nx init guide."
      add_action "Printed nx setup guidance"
      ;;
  esac
}
