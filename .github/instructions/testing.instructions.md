---
applyTo: "**/*"
description: Cross-cutting testing guidelines for all languages in this repo.
---

# Testing Instructions

<!-- Source: Adapted from github/awesome-copilot -->

## General Testing Principles

- Write tests for all new features and bug fixes
- Maintain minimum 80% code coverage
- Keep tests independent and isolated
- Use descriptive test names that explain intent
- Follow Arrange-Act-Assert (AAA) pattern
- Test behavior, not implementation
- Write tests before fixing bugs (reproduce first)

## Test Types

### Unit Tests
- Test individual functions and methods
- Mock external dependencies
- Fast execution (< 1ms per test)
- High code coverage focus
- Test edge cases and error conditions

### Integration Tests
- Test interaction between components
- Use real dependencies when possible
- Test API contracts
- Validate database operations
- Test authentication and authorization

### End-to-End Tests
- Test complete user workflows
- Use real browser/environment
- Simulate user interactions
- Test critical business paths
- Keep minimal but comprehensive

## Test Organization

- Place tests near code they test
- Use clear directory structure
- Group related tests
- Use shared fixtures appropriately
- Keep test data separate from test logic

## Best Practices

- Run tests frequently during development
- Fix failing tests immediately
- Don't skip or ignore tests
- Refactor tests along with code
- Review test code quality same as production code
- Use continuous integration for automated testing
- Monitor test execution time
- Parallelize slow test suites

## Test Data

- Use factories or builders for test data
- Avoid hardcoded values
- Use realistic test data
- Clean up test data after tests
- Use separate test database
- Seed test data consistently

## Mocking

- Mock external services and APIs
- Use dependency injection for testability
- Verify mock interactions when needed
- Don't over-mock; test real code when possible
- Use test doubles appropriately (mocks, stubs, fakes)
