#!/bin/sh
# workspace-package-builder entrypoint.

set -eu
if (set -o pipefail) 2>/dev/null; then
  set -o pipefail
fi

SCRIPT_DIR=$(CDPATH= cd "$(dirname "$0")" && pwd)

. "$SCRIPT_DIR/utils.sh"
. "$SCRIPT_DIR/init_workspace.sh"
. "$SCRIPT_DIR/package_manager.sh"
. "$SCRIPT_DIR/monorepo.sh"
. "$SCRIPT_DIR/create_package.sh"
. "$SCRIPT_DIR/tooling.sh"

usage() {
  cat <<'EOF'
Usage: main.sh [--dry-run] [--yes] [--quiet] [--verbose]

Options:
  --dry-run   Print commands without executing
  --yes       Auto-confirm confirmations
  --quiet     Reduce output
  --verbose   Show debug output
  --help      Show this help
EOF
}

AUTO_YES=0

while [ $# -gt 0 ]; do
  case $1 in
    --dry-run)
      DRY_RUN=1
      ;;
    --yes)
      AUTO_YES=1
      ;;
    --quiet)
      QUIET=1
      ;;
    --verbose)
      VERBOSE=1
      ;;
    --help)
      usage
      exit 0
      ;;
    *)
      error "Unknown option: $1"
      usage
      exit 1
      ;;
  esac
  shift
 done

if [ "$AUTO_YES" -eq 1 ]; then
  confirm() {
    return 0
  }
fi

trap on_interrupt INT

main() {
  info "workspace-package-builder"

  mode_choice=$(choose "What would you like to do?" \
    "Setup workspace (full setup with config)" \
    "Create package/app only (skip workspace setup)") || return 1

  case $mode_choice in
    1) MODE="workspace" ;;
    2) MODE="package" ;;
    *) MODE="workspace" ;;
  esac

  WORKSPACE_ROOT=$(prompt_input "Workspace root folder" ".")
  CONFIG_DIR="$WORKSPACE_ROOT/.workspace-builder"
  CONFIG_FILE="$CONFIG_DIR/config"
  export WORKSPACE_ROOT CONFIG_DIR CONFIG_FILE

  if [ "$MODE" = "workspace" ]; then
    if confirm "Initialize workspace at $WORKSPACE_ROOT?" "y"; then
      init_workspace "$WORKSPACE_ROOT"
    fi

    package_manager_flow
    monorepo_flow
  else
    info "Skipping workspace setup (package/app creation mode)"
  fi

  if confirm "Create packages/apps now?" "n"; then
    count=""
    while :; do
      count=$(prompt_input "How many packages/apps to create?" "0")
      if [ -z "$count" ]; then
        count="0"
        break
      fi
      case $count in
        *[!0-9]*) warn "Enter a numeric value." ;;
        *) break ;;
      esac
    done

    i=1
    while [ "$i" -le "$count" ]; do
      info "Package/App $i of $count"
      name=""
      while [ -z "$name" ]; do
        name=$(prompt_input "Name" "")
        if ! validate_name "$name"; then
          name=""
        fi
      done
      rel_path=""
      while [ -z "$rel_path" ]; do
        rel_path=$(prompt_input "Relative path" "packages")
        if ! validate_rel_path "$rel_path"; then
          rel_path=""
        fi
      done
      stack_choice=$(choose "Choose a stack:" "React" "Node" "Rust" "Python" "Go" "Static")
      case $stack_choice in
        1) stack="React" ;;
        2) stack="Node" ;;
        3) stack="Rust" ;;
        4) stack="Python" ;;
        5) stack="Go" ;;
        6) stack="Static" ;;
        *) stack="Node" ;;
      esac
      create_package_or_app "$WORKSPACE_ROOT" "$name" "$rel_path" "$stack"
      i=$((i + 1))
    done
  fi

  if confirm "Add tooling stubs (lint/format/CI)?" "n"; then
    tooling_flow "$WORKSPACE_ROOT"
  fi

  summarize_actions
  info "Next steps: review changes, then run your package manager install and git add/commit."
}

main "$@"
