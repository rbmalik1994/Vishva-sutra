# Changelog

## [Fixed] - 2026-01-22

### Bug Fixes

1. **Fixed I/O redirection issues**
   - All user prompts now correctly write to stderr (`>&2`)
   - Function return values properly use stdout
   - Prevents prompt text from being captured in variables
   
2. **Fixed `prompt_input` function**
   - Prompt and default value display now goes to stderr
   - Only the user's answer is returned to stdout
   - Fixes issue where prompt text was included in captured values

3. **Fixed `choose` function**
   - Menu options now display correctly with incrementing numbers
   - Empty input now properly defaults to option 1
   - Input validation improved to handle edge cases
   - All output except the selection goes to stderr

4. **Fixed `confirm` function**
   - Prompts now write to stderr
   - Case-insensitive matching for yes/no answers
   - Better handling of empty input

5. **Fixed color output**
   - Colors only enabled when stderr is a terminal (not stdout)
   - Prevents escape codes in piped/redirected output
   - Respects `NO_COLOR` environment variable

6. **Fixed numeric input validation**
   - Empty values properly handled with defaults
   - Better error messages for invalid numeric input
   - Prevents infinite loops on malformed input

7. **Fixed logging functions**
   - All log messages (`info`, `warn`, `error`, `ok`, `debug`) write to stderr
   - Stdout remains clean for function return values
   - `summarize_actions` output goes to stderr

### Impact

These fixes resolve critical issues where:
- Workspace root paths included the prompt text
- Menu selections didn't work properly
- Color codes appeared in non-terminal output
- Variables captured user prompts instead of just values

The script now works correctly in:
- Interactive mode
- Piped input mode
- Dry-run mode
- CI/CD environments
