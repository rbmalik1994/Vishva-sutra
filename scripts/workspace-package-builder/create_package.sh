#!/bin/sh
# Package/app creation.

resolve_js_init_cmd() {
  case ${PKG_MANAGER:-npm} in
    yarn) printf "%s" "yarn init -y" ;;
    pnpm) printf "%s" "pnpm init" ;;
    npm|*) printf "%s" "npm init -y" ;;
  esac
}

normalize_python_module() {
  printf "%s" "$1" | tr '-' '_'
}

create_js_skeleton() {
  target=$1
  name=$2
  ensure_dir "$target/src"
  if [ ! -f "$target/package.json" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
      dry_run_print "create $target/package.json"
    else
      printf "%s\n" "{\n  \"name\": \"$name\",\n  \"version\": \"0.1.0\",\n  \"private\": true\n}" > "$target/package.json"
      add_action "Created file: $target/package.json"
    fi
  fi
  if [ ! -f "$target/src/index.js" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
      dry_run_print "create $target/src/index.js"
    else
      printf "%s\n" "console.log('Hello from $name');" > "$target/src/index.js"
      add_action "Created file: $target/src/index.js"
    fi
  fi
}

create_react_skeleton() {
  target=$1
  name=$2
  ensure_dir "$target/src"
  if [ ! -f "$target/package.json" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
      dry_run_print "create $target/package.json"
    else
      printf "%s\n" "{\n  \"name\": \"$name\",\n  \"version\": \"0.1.0\",\n  \"private\": true\n}" > "$target/package.json"
      add_action "Created file: $target/package.json"
    fi
  fi
  if [ ! -f "$target/src/App.jsx" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
      dry_run_print "create $target/src/App.jsx"
    else
      printf "%s\n" "export default function App() {\n  return <main>Hello from $name</main>;\n}\n" > "$target/src/App.jsx"
      add_action "Created file: $target/src/App.jsx"
    fi
  fi
}

create_python_skeleton() {
  target=$1
  name=$2
  module_name=$(normalize_python_module "$name")
  ensure_dir "$target/src/$module_name"
  if [ ! -f "$target/pyproject.toml" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
      dry_run_print "create $target/pyproject.toml"
    else
      printf "%s\n" "[project]\nname = \"$name\"\nversion = \"0.1.0\"\n" > "$target/pyproject.toml"
      add_action "Created file: $target/pyproject.toml"
    fi
  fi
  if [ ! -f "$target/src/$module_name/__init__.py" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
      dry_run_print "create $target/src/$module_name/__init__.py"
    else
      printf "%s\n" "__all__ = []" > "$target/src/$module_name/__init__.py"
      add_action "Created file: $target/src/$module_name/__init__.py"
    fi
  fi
}

create_rust_skeleton() {
  target=$1
  name=$2
  ensure_dir "$target/src"
  if [ ! -f "$target/Cargo.toml" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
      dry_run_print "create $target/Cargo.toml"
    else
      printf "%s\n" "[package]\nname = \"$name\"\nversion = \"0.1.0\"\nedition = \"2021\"\n" > "$target/Cargo.toml"
      add_action "Created file: $target/Cargo.toml"
    fi
  fi
  if [ ! -f "$target/src/main.rs" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
      dry_run_print "create $target/src/main.rs"
    else
      printf "%s\n" "fn main() {\n    println!(\"Hello from $name\");\n}\n" > "$target/src/main.rs"
      add_action "Created file: $target/src/main.rs"
    fi
  fi
}

create_go_skeleton() {
  target=$1
  name=$2
  ensure_dir "$target"
  if [ ! -f "$target/go.mod" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
      dry_run_print "create $target/go.mod"
    else
      printf "%s\n" "module $name\n\ngo 1.22" > "$target/go.mod"
      add_action "Created file: $target/go.mod"
    fi
  fi
  if [ ! -f "$target/main.go" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
      dry_run_print "create $target/main.go"
    else
      printf "%s\n" "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello from $name\")\n}\n" > "$target/main.go"
      add_action "Created file: $target/main.go"
    fi
  fi
}

create_static_skeleton() {
  target=$1
  name=$2
  ensure_dir "$target"
  if [ ! -f "$target/index.html" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
      dry_run_print "create $target/index.html"
    else
      printf "%s\n" "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n  <title>$name</title>\n  <link rel=\"stylesheet\" href=\"styles.css\" />\n</head>\n<body>\n  <main>\n    <h1>$name</h1>\n    <p>Static site scaffold.</p>\n  </main>\n</body>\n</html>" > "$target/index.html"
      add_action "Created file: $target/index.html"
    fi
  fi
  if [ ! -f "$target/styles.css" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
      dry_run_print "create $target/styles.css"
    else
      printf "%s\n" "body { font-family: sans-serif; padding: 2rem; }" > "$target/styles.css"
      add_action "Created file: $target/styles.css"
    fi
  fi
}

maybe_run_js_init() {
  target=$1
  cmd=$(resolve_js_init_cmd)
  if confirm "Run '$cmd' in $target?" "n"; then
    set -- $cmd
    if command_exists "$1"; then
      run_cmd_sh "cd \"$target\" && $cmd"
      add_action "Executed: $cmd in $target"
    else
      warn "Command not available: $cmd"
    fi
  fi
}

maybe_create_python_venv() {
  target=$1
  if confirm "Create Python venv in $target/.venv?" "n"; then
    if command_exists python3; then
      run_cmd_sh "cd \"$target\" && python3 -m venv .venv"
      add_action "Created Python venv: $target/.venv"
    else
      warn "python3 not available."
    fi
  fi
}

create_package_or_app() {
  root=$1
  name=$2
  rel_path=$3
  stack=$4

  validate_name "$name" || return 1
  validate_rel_path "$rel_path" || return 1

  target="$root/$rel_path/$name"

  if [ -e "$target" ]; then
    warn "$target already exists."
    if ! confirm "Use existing directory $target?" "n"; then
      return 0
    fi
  fi

  ensure_dir "$root/$rel_path"

  case $stack in
    React)
      ensure_dir "$target"
      create_react_skeleton "$target" "$name"
      maybe_run_js_init "$target"
      ;;
    Node)
      ensure_dir "$target"
      create_js_skeleton "$target" "$name"
      maybe_run_js_init "$target"
      ;;
    Rust)
      if [ ! -e "$target" ] && command_exists cargo && confirm "Use cargo new for $name?" "n"; then
        run_cmd_sh "cd \"$root/$rel_path\" && cargo new \"$name\" --bin"
        add_action "Executed: cargo new $name"
      else
        ensure_dir "$target"
        create_rust_skeleton "$target" "$name"
      fi
      ;;
    Python)
      ensure_dir "$target"
      create_python_skeleton "$target" "$name"
      maybe_create_python_venv "$target"
      ;;
    Go)
      ensure_dir "$target"
      if command_exists go && confirm "Run go mod init in $target?" "n"; then
        run_cmd_sh "cd \"$target\" && go mod init \"$name\""
        add_action "Executed: go mod init $name"
      else
        create_go_skeleton "$target" "$name"
      fi
      ;;
    Static)
      ensure_dir "$target"
      create_static_skeleton "$target" "$name"
      ;;
    *)
      warn "Unknown stack: $stack"
      ;;
  esac
}
