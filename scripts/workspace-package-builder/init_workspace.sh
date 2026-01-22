#!/bin/sh
# Workspace initialization functions.

init_workspace() {
  root=$1
  if [ -z "$root" ]; then
    error "Workspace root is required."
    return 1
  fi

  ensure_dir "$root"

  gitignore_path="$root/.gitignore"
  if [ ! -f "$gitignore_path" ]; then
    if confirm "Create .gitignore in $root?" "y"; then
      if [ "$DRY_RUN" -eq 1 ]; then
        dry_run_print "create $gitignore_path"
      else
        printf "%s\n" \
".DS_Store
node_modules/
dist/
build/
.venv/
.env
" > "$gitignore_path"
        add_action "Created file: $gitignore_path"
        ok "Created .gitignore"
      fi
    else
      warn "Skipped .gitignore creation."
    fi
  else
    debug ".gitignore already exists."
  fi

  readme_path="$root/README.md"
  if [ ! -f "$readme_path" ]; then
    if confirm "Create README.md in $root?" "n"; then
      if [ "$DRY_RUN" -eq 1 ]; then
        dry_run_print "create $readme_path"
      else
        printf "%s\n" "## Workspace" "" "Workspace initialized by workspace-package-builder." > "$readme_path"
        add_action "Created file: $readme_path"
        ok "Created README.md"
      fi
    else
      warn "Skipped README.md creation."
    fi
  else
    debug "README.md already exists."
  fi

  if [ ! -d "$root/.git" ]; then
    if confirm "Initialize git repository in $root?" "n"; then
      if command_exists git; then
        run_cmd_sh "cd \"$root\" && git init"
        add_action "Initialized git repository: $root"
      else
        warn "git is not available. Skipping git init."
      fi
    fi
  else
    debug "Git repository already initialized."
  fi
}
