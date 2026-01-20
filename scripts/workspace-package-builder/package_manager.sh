#!/bin/sh
# Package manager selection.

package_manager_flow() {
  choice=$(choose "Choose a package manager:" \
    "npm" \
    "yarn" \
    "pnpm" \
    "pip" \
    "cargo" \
    "apt") || return 1

  case $choice in
    1) PKG_MANAGER="npm" ;;
    2) PKG_MANAGER="yarn" ;;
    3) PKG_MANAGER="pnpm" ;;
    4) PKG_MANAGER="pip" ;;
    5) PKG_MANAGER="cargo" ;;
    6) PKG_MANAGER="apt" ;;
    *) PKG_MANAGER="npm" ;;
  esac

  export PKG_MANAGER
  info "Selected package manager: $PKG_MANAGER"
  write_config "PKG_MANAGER" "$PKG_MANAGER"
}
