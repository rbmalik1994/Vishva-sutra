#!/bin/sh
# Shared helpers for workspace-package-builder.

init_colors() {
  if [ -t 2 ] && [ -z "${NO_COLOR:-}" ]; then
    COLOR_INFO="\033[1;34m"
    COLOR_WARN="\033[1;33m"
    COLOR_OK="\033[1;32m"
    COLOR_ERR="\033[1;31m"
    COLOR_RESET="\033[0m"
  else
    COLOR_INFO=""
    COLOR_WARN=""
    COLOR_OK=""
    COLOR_ERR=""
    COLOR_RESET=""
  fi
}

init_colors

LOG_LEVEL="${LOG_LEVEL:-info}"
DRY_RUN="${DRY_RUN:-0}"
VERBOSE="${VERBOSE:-0}"
QUIET="${QUIET:-0}"
ACTION_LOG="${ACTION_LOG:-}"

log_msg() {
  level=$1
  color=$2
  shift 2
  if [ "$QUIET" -eq 1 ] && [ "$level" != "ERROR" ]; then
    return 0
  fi
  printf "%b%s%b\n" "$color" "$*" "$COLOR_RESET" >&2
}

info() { log_msg "INFO" "$COLOR_INFO" "$@"; }
warn() { log_msg "WARN" "$COLOR_WARN" "$@"; }
ok() { log_msg "OK" "$COLOR_OK" "$@"; }
error() { log_msg "ERROR" "$COLOR_ERR" "$@"; }

debug() {
  if [ "$VERBOSE" -eq 1 ]; then
    log_msg "DEBUG" "$COLOR_INFO" "$@"
  fi
}

on_interrupt() {
  warn "Interrupted. No further changes applied."
  exit 130
}

check_quit() {
  case $1 in
    q|Q)
      warn "Exit requested. No further changes applied."
      exit 0
      ;;
  esac
}

confirm() {
  prompt=$1
  default=${2:-y}
  case $default in
    y|Y) suffix="Y/n" ;;
    n|N) suffix="y/N" ;;
    *) suffix="y/n" ;;
  esac

  while :; do
    printf "%s (%s) " "$prompt" "$suffix" >&2
    IFS= read -r answer || return 1
    check_quit "$answer"
    if [ -z "$answer" ]; then
      answer=$default
    fi
    case $answer in
      y|Y|yes|YES) return 0 ;;
      n|N|no|NO) return 1 ;;
      *) warn "Please enter y or n." ;;
    esac
  done
}

choose() {
  prompt=$1
  shift
  options_count=$#
  if [ "$options_count" -eq 0 ]; then
    error "No options provided."
    return 1
  fi
  info "$prompt"
  i=1
  for opt in "$@"; do
    printf "  %s) %s\n" "$i" "$opt" >&2
    i=$((i + 1))
  done
  while :; do
    printf "Select an option [1-%s] (default 1): " "$options_count" >&2
    IFS= read -r answer || return 1
    check_quit "$answer"
    if [ -z "$answer" ]; then
      printf "1"
      return 0
    fi
    case $answer in
      *[!0-9]*)
        warn "Enter a number between 1 and $options_count."
        ;;
      *)
        if [ "$answer" -ge 1 ] && [ "$answer" -le "$options_count" ]; then
          printf "%s" "$answer"
          return 0
        fi
        warn "Enter a number between 1 and $options_count."
        ;;
    esac
  done
}

prompt_input() {
  label=$1
  default=${2:-}
  while :; do
    if [ -n "$default" ]; then
      printf "%s [%s]: " "$label" "$default" >&2
    else
      printf "%s: " "$label" >&2
    fi
    IFS= read -r answer || return 1
    check_quit "$answer"
    if [ -z "$answer" ]; then
      answer=$default
    fi
    printf "%s" "$answer"
    return 0
  done
}

ensure_dir() {
  path=$1
  if [ -z "$path" ]; then
    return 1
  fi
  if [ ! -d "$path" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
      dry_run_print "mkdir -p $path"
      return 0
    fi
    mkdir -p "$path"
    add_action "Created directory: $path"
  fi
}

dry_run_print() {
  for cmd in "$@"; do
    info "DRY-RUN: $cmd"
  done
}

run_cmd() {
  if [ "$DRY_RUN" -eq 1 ]; then
    dry_run_print "$*"
    return 0
  fi
  info "Running: $*"
  "$@"
}

run_cmd_sh() {
  cmd=$1
  if [ "$DRY_RUN" -eq 1 ]; then
    dry_run_print "$cmd"
    return 0
  fi
  info "Running: $cmd"
  sh -c "$cmd"
}

add_action() {
  ACTION_LOG="${ACTION_LOG}${1}
"
}

summarize_actions() {
  if [ -z "$ACTION_LOG" ]; then
    info "No changes recorded."
    return 0
  fi
  info "Summary of actions:"
  printf "%s" "$ACTION_LOG" >&2
}

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

validate_name() {
  name=$1
  if [ -z "$name" ]; then
    error "Name is required."
    return 1
  fi
  case $name in
    /*) error "Name must not start with /."; return 1 ;;
    *" "*) error "Name must not contain spaces."; return 1 ;;
    *".."*) error "Name must not contain '..'."; return 1 ;;
    *"/"*) error "Name must not contain '/'."; return 1 ;;
  esac
  return 0
}

validate_rel_path() {
  path=$1
  if [ -z "$path" ]; then
    error "Path is required."
    return 1
  fi
  case $path in
    /*) error "Path must be relative."; return 1 ;;
    *" "*) error "Path must not contain spaces."; return 1 ;;
    *".."*) error "Path must not contain '..'."; return 1 ;;
    "~"*) error "Path must not start with ~."; return 1 ;;
  esac
  return 0
}

write_config() {
  key=$1
  value=$2
  if [ -z "${CONFIG_FILE:-}" ]; then
    error "CONFIG_FILE is not set."
    return 1
  fi
  ensure_dir "$(dirname "$CONFIG_FILE")"
  if [ "$DRY_RUN" -eq 1 ]; then
    dry_run_print "update config $CONFIG_FILE ($key=$value)"
    return 0
  fi
  if [ -f "$CONFIG_FILE" ]; then
    if grep -q "^${key}=" "$CONFIG_FILE"; then
      tmp_file=$(mktemp)
      sed "s#^${key}=.*#${key}=${value}#" "$CONFIG_FILE" > "$tmp_file"
      mv "$tmp_file" "$CONFIG_FILE"
    else
      printf "%s=%s\n" "$key" "$value" >> "$CONFIG_FILE"
    fi
  else
    printf "%s=%s\n" "$key" "$value" > "$CONFIG_FILE"
  fi
  add_action "Updated config: ${CONFIG_FILE} (${key}=${value})"
}

read_config() {
  key=$1
  if [ ! -f "${CONFIG_FILE:-}" ]; then
    return 1
  fi
  sed -n "s#^${key}=##p" "$CONFIG_FILE" | head -n 1
}
