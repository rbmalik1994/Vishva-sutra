# GitHub Copilot Instructions

<!-- Source: Adapted from patterns in github/awesome-copilot -->

## Project Overview

This is a multi-language, multi-platform project with strict development standards.

### Technologies
- **Languages**: TypeScript (React), Python, Rust
- **Project Types**: Web application, API, mobile app, desktop app, SDK
- **Databases**: PostgreSQL, MongoDB, SQLite
- **Team**: Solo developer with future growth potential

## General Guidelines

### Code Quality
- Follow language-specific style guides and best practices
- Write clean, maintainable, and well-documented code
- Use meaningful variable and function names
- Keep functions small and focused on a single responsibility
- Apply DRY (Don't Repeat Yourself) principle

### Testing
- Write tests for all new features and bug fixes
- Aim for high test coverage (minimum 80%)
- Include unit tests, integration tests, and E2E tests where appropriate
- Follow TDD (Test-Driven Development) when feasible

### Security
- Never commit sensitive data (API keys, passwords, tokens)
- Validate all user inputs
- Use parameterized queries to prevent SQL injection
- Follow OWASP security best practices
- Keep dependencies up to date

### Performance
- Optimize database queries
- Implement caching where appropriate
- Profile code to identify bottlenecks
- Use asynchronous operations for I/O-bound tasks
- Monitor and log performance metrics

### Documentation
- Document all public APIs and complex logic
- Keep README.md up to date
- Use inline comments for non-obvious code
- Maintain changelog for version tracking

## Language-Specific Instructions

Language-specific instructions are located in the `.github/instructions/` directory:

- TypeScript/React: See [typescript-react.instructions.md](.github/instructions/typescript-react.instructions.md)
- Python: See [python.instructions.md](.github/instructions/python.instructions.md)
- Python (Pylint): See [python-pylint.instructions.md](.github/instructions/python-pylint.instructions.md)
- Rust: See [rust.instructions.md](.github/instructions/rust.instructions.md)

## Cross-Cutting Concerns

Additional instructions for specific concerns:

- Testing: [testing.instructions.md](.github/instructions/testing.instructions.md)
- Security: [security.instructions.md](.github/instructions/security.instructions.md)
- Performance: [performance.instructions.md](.github/instructions/performance.instructions.md)
- Documentation: [documentation.instructions.md](.github/instructions/documentation.instructions.md)
- Code Review: [code-review.instructions.md](.github/instructions/code-review.instructions.md)

## Prompts

Reusable prompts for common tasks are available in `.github/prompts/`:

- Component setup: [setup-component.prompt.md](.github/prompts/setup-component.prompt.md)
- Test generation: [write-tests.prompt.md](.github/prompts/write-tests.prompt.md)
- Code review: [code-review.prompt.md](.github/prompts/code-review.prompt.md)
- Refactoring: [refactor-code.prompt.md](.github/prompts/refactor-code.prompt.md)
- Documentation: [generate-docs.prompt.md](.github/prompts/generate-docs.prompt.md)
- Debugging: [debug-issue.prompt.md](.github/prompts/debug-issue.prompt.md)

## Specialized Agents

For complex workflows, use specialized agent modes:

- Architecture planning: [architect.agent.md](.github/agents/architect.agent.md)
- Code review: [reviewer.agent.md](.github/agents/reviewer.agent.md)
- Debugging: [debugger.agent.md](.github/agents/debugger.agent.md)

## Git Workflow

- Create feature branches from `main`
- Write clear, descriptive commit messages
- Keep commits atomic and focused
- Squash commits before merging to main
- Use pull requests for code review
- Ensure CI/CD pipeline passes before merging

## Development Process

1. **Planning**: Define requirements and design approach
2. **Implementation**: Write code following language-specific guidelines
3. **Testing**: Write and run tests
4. **Review**: Self-review code and run linters
5. **Documentation**: Update relevant documentation
6. **Commit**: Create clear commit with descriptive message
7. **CI/CD**: Ensure all checks pass

## Database Guidelines

### PostgreSQL
- Use migrations for schema changes
- Index frequently queried columns
- Use transactions for data consistency
- Implement connection pooling

### MongoDB
- Design schema for query patterns
- Use indexes for performance
- Implement data validation
- Use aggregation pipelines efficiently

### SQLite
- Use for local development and testing
- Enable foreign keys
- Use transactions for write operations
- Regular vacuum for maintenance
