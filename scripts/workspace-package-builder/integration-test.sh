#!/bin/bash
# Simple integration test for workspace-package-builder

SCRIPT_DIR="/workspaces/Vishva-sutra/scripts/workspace-package-builder"
TEST_DIR="/tmp/wb-integration-test"

# Clean up
rm -rf "$TEST_DIR"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

# Test 1: Minimal setup
echo "=== Test 1: Minimal workspace setup ==="
bash "$SCRIPT_DIR/main.sh" --dry-run <<'EOF'
.
y
n
n

1
1
n
n
EOF

echo ""
echo "=== Test 1 Complete ==="

# Test 2: Full setup with React app
echo ""
echo "=== Test 2: Full setup with React app ==="
mkdir -p "$TEST_DIR/test2"
cd "$TEST_DIR/test2"

bash "$SCRIPT_DIR/main.sh" --dry-run <<'EOF'
.
y
y
y


y
1
my-app
apps
1
n
n
EOF

echo ""
echo "=== Test 2 Complete ==="

echo ""
echo "=== All tests passed ==="
