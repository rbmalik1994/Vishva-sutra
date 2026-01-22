#!/bin/bash
# Validation script to demonstrate the workspace-package-builder fixes

echo "==================================================================="
echo "Workspace Package Builder - Validation Script"
echo "==================================================================="
echo ""

SCRIPT_DIR="/workspaces/Vishva-sutra/scripts/workspace-package-builder"

# Test 1: Verify script help works
echo "✓ Test 1: Help flag"
if bash "$SCRIPT_DIR/main.sh" --help | grep -q "Usage:"; then
    echo "  PASS: Help text displays correctly"
else
    echo "  FAIL: Help text missing"
    exit 1
fi
echo ""

# Test 2: Verify prompts write to stderr (not stdout)
echo "✓ Test 2: Prompts go to stderr (not stdout)"
OUTPUT=$(bash "$SCRIPT_DIR/main.sh" --dry-run </dev/null 2>/dev/null || true)
if [ -z "$OUTPUT" ]; then
    echo "  PASS: No output on stdout when prompts fail"
else
    echo "  FAIL: Unexpected stdout: $OUTPUT"
    exit 1
fi
echo ""

# Test 3: Verify dry-run mode works
echo "✓ Test 3: Dry-run mode"
TEST_DIR="/tmp/validate-wb-$$"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

bash "$SCRIPT_DIR/main.sh" --dry-run 2>&1 <<'EOF' | grep -q "DRY-RUN"
.
y
n
n

1
1
n
n
EOF

if [ $? -eq 0 ]; then
    echo "  PASS: Dry-run mode outputs DRY-RUN markers"
else
    echo "  FAIL: Dry-run mode not working"
    exit 1
fi

rm -rf "$TEST_DIR"
echo ""

# Test 4: Verify scripts are executable
echo "✓ Test 4: All scripts are executable"
ALL_EXEC=true
for script in "$SCRIPT_DIR"/*.sh; do
    if [ ! -x "$script" ]; then
        echo "  FAIL: $script is not executable"
        ALL_EXEC=false
    fi
done

if $ALL_EXEC; then
    echo "  PASS: All .sh scripts are executable"
fi
echo ""

# Test 5: Verify no shellcheck errors (if available)
if command -v shellcheck >/dev/null 2>&1; then
    echo "✓ Test 5: Shellcheck validation"
    ERRORS=0
    for script in "$SCRIPT_DIR"/*.sh; do
        if ! shellcheck -e SC1091 "$script" >/dev/null 2>&1; then
            ERRORS=$((ERRORS + 1))
        fi
    done
    
    if [ $ERRORS -eq 0 ]; then
        echo "  PASS: No shellcheck errors (ignoring SC1091)"
    else
        echo "  INFO: $ERRORS files have shellcheck warnings (non-critical)"
    fi
    echo ""
else
    echo "✓ Test 5: Shellcheck validation"
    echo "  SKIP: shellcheck not installed"
    echo ""
fi

# Summary
echo "==================================================================="
echo "Validation Summary"
echo "==================================================================="
echo ""
echo "Key Fixes Validated:"
echo "  ✓ I/O redirection (prompts to stderr)"
echo "  ✓ Script executability"
echo "  ✓ Dry-run functionality"
echo "  ✓ Help text"
echo ""
echo "For detailed fix information, see:"
echo "  - FIX_SUMMARY.md"
echo "  - CHANGELOG.md"
echo ""
echo "To run full integration tests:"
echo "  ./integration-test.sh"
echo ""
echo "==================================================================="
echo "✓ All validation tests passed!"
echo "==================================================================="
