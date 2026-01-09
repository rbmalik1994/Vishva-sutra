---
applyTo: "**/*.py"
---
# Python Instructions (concise)

- Use descriptive names and include type hints for all public functions and methods.
- Provide PEP 257-style docstrings for modules, classes, and public functions; add brief algorithm notes and complexity when relevant.
- Keep functions small and focused; extract complex logic into private helpers.
- Handle edge cases explicitly and raise specific, well-documented exceptions.
- Document external dependencies and their purpose in the module docstring; never commit secrets.
- Prioritize readability and maintainability over clever or terse code.

## Code Style

### PEP 8 Compliance

- Follow the PEP 8 style guide.
- Use an automatic formatter (e.g., `black`) to keep formatting consistent.
- Use 4 spaces for indentation; do not use tabs.
- Limit physical line length to 79 characters:
    - Wrap comments and docstrings at ~72 characters.
    - Wrap long string literals around ~75 characters when practical.
- Use meaningful names for variables, functions, classes, and constants.
- Use blank lines to improve readability:
    - Two blank lines between top-level functions and classes.
    - One blank line between methods within a class.
    - One blank line to separate logical sections inside functions/methods.
- Place docstrings immediately after the `def` or `class` statement (module docstrings at file top).
- Separate logical steps with blank lines and keep functions concise.
- Avoid combining unrelated statements on one line.


### Type Hints

- Use type hints for all public functions, methods, and module-level callables.
- Annotate parameters and return types; prefer explicit types over `Any`.
- Prefer modern syntax when available (e.g., `list[str]`, `T1 | T2`) and use `Optional[T]` for nullable values.
- Add `from __future__ import annotations` to simplify forward references.
- Use `typing` primitives (`TypeAlias`, `Protocol`, `Callable`, `Iterable`, `Sequence`, `Mapping`, `Union`, `Optional`) for complex signatures.
- Create named `TypeAlias` entries for repeated or complex types.
- Run `mypy` or `pyright` in CI with reasonable strictness for new code.
- Use `typing.cast`, `typing.overload`, and `TypeVar` only when necessary.
- Keep annotations readable: break long signatures across lines and document non-obvious types.

### Imports

- Group imports into three sections, separated by a blank line: standard library, third‑party, then local imports.
- Prefer absolute imports and one import per line; enforce ordering with `isort`.

### Naming conventions

- Follow PEP 8 naming conventions.
- Modules and packages: lowercase_with_underscores.
- Classes: PascalCase (CamelCase).
- Functions and methods: snake_case (lowercase_with_underscores).
- Variables: snake_case.
- Constants: UPPERCASE_WITH_UNDERSCORES.
- Protected members (internal use): _single_leading_underscore.
- Private members (name mangling): __double_leading_underscore — avoid unless necessary.
- Prefer clear, descriptive names and consistency across the project.

### Docstrings & Comments

- Use PEP 257 docstrings for public modules, classes, and functions.
- Prefer reStructuredText (reST) for Sphinx compatibility or follow the project's chosen style consistently.
- Module docstring: file top (after `__future__` imports).
- Class docstring: immediately after the class statement.
- Function/method docstring: immediately after the `def` statement.
- Docstrings should include: brief description, parameters, return value, and raised exceptions; add algorithm notes and complexity only when relevant.
- Keep docstrings concise and current; avoid restating obvious behavior.
- Use comments sparingly to explain intent or rationale (the "why").

### Virtual Environments

- Use virtual environments for all projects.
- Recommended: `poetry` for new projects; `pipenv` or `venv` is acceptable for existing projects.
- Use environment-specific commands to run tools and scripts (the project's runner rather than the global Python).
- Manage dev dependencies with the tool's dev groups or dev-install features.
- Never commit virtual environment directories (e.g., `venv/`, `.venv/`); add them to `.gitignore`.
- Document the chosen tool and brief setup steps in the project README.

## Best Practices

### Functions

- Keep functions small and focused (ideally < 50 lines).
- Use descriptive names and provide docstrings for public functions.
- Use default arguments wisely; avoid mutable defaults.

### Classes
- Follow single responsibility principle
- Use `@property` for getters/setters
- Implement `__str__` and `__repr__` methods
- Use `@dataclass` for data containers
- Follow composition over inheritance

### Error Handling

- Raise specific exceptions instead of generic `Exception`.
- Create domain-specific exceptions where appropriate.
- Use context managers for resource management and add context when logging or re-raising errors.
- Do not swallow exceptions silently.

### Async/Await
- Use `asyncio` for I/O-bound operations
- Mark async functions with `async def`
- Use `await` for async calls
- Use `asyncio.gather()` for concurrent tasks
- Implement proper exception handling in async code

### Common Patterns & Anti-patterns

- Use context managers (`with`) for deterministic cleanup.
- Prefer list comprehensions and generator expressions for concise transformations; use generators for streaming large datasets.
- Use f-strings for formatting; avoid embedding side effects—assign intermediate results first.
- Use `enum.Enum` for symbolic constants instead of ad-hoc strings or numbers.
- Avoid mutable default arguments; use `None` and initialize inside the function.
- Catch specific exceptions; avoid bare `except:` blocks.


## Testing

### Pytest Standards

- Write tests for public functions and methods using `pytest`.
- Name test files `test_*.py` or `*_test.py` and use descriptive test names.
- Use fixtures for shared setup and `parametrize` for multiple scenarios.
- Mock external dependencies and focus tests on behavior.
- Include cases for critical paths and edge cases (empty inputs, invalid types, large inputs).
- Document edge-case expectations in test docstrings or comments.

### Test Organization
```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/           # End-to-end tests
├── conftest.py    # Shared fixtures
└── fixtures/      # Test data
```

### Coverage

- Aim for 80%+ coverage on critical modules.
- Focus on business logic and edge cases; use `pytest-cov` for reports.
- Avoid testing third-party framework internals.

## Security

### Input Validation

- Validate untrusted input and sanitize before rendering.
- Use parameterized queries to prevent SQL injection.
- Store secrets in environment variables and never log them.

### Dependencies

- Keep dependencies minimal and justify new additions.
- Pin production dependencies in `requirements.txt` or a lockfile.
- Regularly scan dependencies with `pip-audit` and review licenses.

## Performance

### Optimization

- Profile before optimizing and measure improvements.
- Use generators for large datasets and caching for expensive computations.
- Use `__slots__` sparingly for memory-critical classes.
- Avoid premature optimization.

### Database

- Use connection pooling and pagination for large queries.
- Add indexes for frequently queried fields and avoid N+1 patterns.
- Prefer bulk operations where appropriate.

## Documentation

### Docstrings

- Use a consistent docstring style (Google, NumPy, or reST) across the project.
- Document public modules, classes, and functions with parameter and return types.
- Provide concise usage examples for complex functions.
- Keep docstrings up to date.

### Comments
- Use comments for non-obvious code
- Explain why, not what
- Keep comments concise
- Update comments when code changes
- Remove commented-out code

## Project structure and packaging (improved)

Provide a predictable, testable, and distributable layout. Keep package code under src/, keep tests and CI at the repo root, and include metadata, docs, and tooling files.

Guidelines
- Use the "src/" layout to avoid import-time issues and ensure tests import the installed package.
- Keep package __init__.py minimal; expose a clean public API (explicit __all__ or top-level imports) and store version in a single source (e.g., package._version or setuptools_scm).
- Prefer pyproject.toml (PEP 621) for build metadata and dependency/tool configs (black, isort, mypy, coverage, tox/ nox).
- Include LICENSE, README.md, CHANGELOG.md, CONTRIBUTING.md, and CODE_OF_CONDUCT.md at repo root.
- Use a top-level tests/ directory with clear separation of unit/integration/e2e tests and a conftest.py for shared fixtures.
- Keep examples/ or examples/quickstart.md to demonstrate common usage.
- Add .github/workflows/ CI configs to run linters, tests, type checks, and build verification.
- Add .pre-commit-config.yaml to enforce formatting and basic checks locally.
- Avoid committing virtual environment directories; include a concise setup section in README explaining the preferred virtualenv/tooling (venv, poetry).
- Provide docs/ (Sphinx or MkDocs) with an API reference and quickstart; keep docs in sync with public API.

Minimal recommended repo tree
project/
├── src/
│   └── package_name/
│       ├── __init__.py          # minimal: metadata + public API
│       ├── _version.py          # single source of truth for version (optional)
│       ├── main.py
│       ├── models/
│       ├── services/
│       ├── api/
│       └── utils/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── conftest.py
├── docs/                        # Sphinx or MkDocs source
├── examples/                    # usage examples and small demos
├── pyproject.toml               # project metadata, build backend, tooling config
├── requirements.txt             # (optional) pinned deps for non-poetry projects
├── MANIFEST.in                  # if needed for sdist include rules
├── .github/workflows/           # CI for tests, linters, release
├── .pre-commit-config.yaml
├── .gitignore
├── LICENSE
├── README.md
└── CHANGELOG.md

Packaging & release tips
- Use a reproducible build system (poetry, flit, or setuptools with pyproject) and prefer pinned dev dependencies.
- Use setuptools_scm or a single source file for versioning to avoid drift.
- Validate builds locally with `python -m build` and run `twine check` on generated metadata.
- Ensure CI builds a wheel and runs tests against it (install from the built wheel) to catch packaging/import issues.

Testing & CI
- Run pytest with coverage; fail CI on coverage regressions for critical modules.
- Run linters (flake8/ruff), formatter (black), and type checks (mypy/pyright) in CI.
- Keep tests deterministic and fast; split slow integration/e2e into separate CI jobs.

Documentation
- Document public modules and API in docstrings; generate API docs automatically.
- Add a concise Quickstart in README and link to more detailed docs in docs/.

## Code Examples

### Type Hints
```python
from typing import List, Optional, Dict, Any

def process_users(
    users: List[Dict[str, Any]],
    filter_active: bool = True
) -> Optional[List[str]]:
    """
    Process user data and return names.
    
    Args:
        users: List of user dictionaries
        filter_active: Whether to filter active users only
    
    Returns:
        List : List of user names, or None if no users
    """
    if not users:
        return None
    
    filtered = [u for u in users if not filter_active or u.get('active')]
    return [u['name'] for u in filtered]
```

### Async Pattern
```python
import asyncio
from typing import List

async def fetch_data(url: str) -> dict:
    """Fetch data from URL asynchronously."""
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

async def fetch_all(urls: List[str]) -> List[dict]:
    """Fetch data from multiple URLs concurrently."""
    tasks = [fetch_data(url) for url in urls]
    return await asyncio.gather(*tasks)
```

### Error Handling
```python
class ValidationError(Exception):
    """Raised when data validation fails."""
    pass

def validate_email(email: str) -> str:
    """Validate email address.
    
    Args:
        email(str): Email address to validate
    
    Returns:
        str: Validated email address
    
    Raises:
        ValidationError: If email format is invalid
    """
    if '@' not in email:
        raise ValidationError(f"Invalid email format: {email}")
    return email.lower()
```
