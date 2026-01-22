#!/bin/sh
# Idempotency test for workspace-package-builder.

set -eu
if (set -o pipefail) 2>/dev/null; then
  set -o pipefail
fi

SCRIPT_DIR=$(CDPATH= cd "$(dirname "$0")" && pwd)
MAIN_SH="$SCRIPT_DIR/main.sh"

if [ ! -x "$MAIN_SH" ]; then
  chmod +x "$MAIN_SH" || true
fi

TMP_DIR=$(mktemp -d)

cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

snapshot_dir() {
  out_file=$1
  find "$TMP_DIR" -type f -print | sort | while IFS= read -r file; do
    cksum "$file"
  done > "$out_file"
}

INPUTS=$(cat <<EOF
$TMP_DIR


1
sample-site
packages
6
EOF
)

printf "%s" "$INPUTS" | "$MAIN_SH" --yes
snapshot_dir "$TMP_DIR/first_snapshot.txt"

printf "%s" "$INPUTS" | "$MAIN_SH" --yes
snapshot_dir "$TMP_DIR/second_snapshot.txt"

if diff "$TMP_DIR/first_snapshot.txt" "$TMP_DIR/second_snapshot.txt" >/dev/null 2>&1; then
  echo "Idempotency check passed."
else
  echo "Idempotency check failed." >&2
  exit 1
fi
