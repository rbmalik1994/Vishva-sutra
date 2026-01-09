---
applyTo: "**/*"
description: Code review checklist and expectations.
---

# Code Review Instructions

<!-- Source: Adapted from github/awesome-copilot -->

## General Code Review Principles

- Be respectful and constructive
- Focus on code, not the person
- Explain reasoning behind feedback
- Suggest improvements with examples
- Recognize good code
- Review promptly
- Use checklists for consistency
- Learn from reviews

## What to Review

### Functionality
- Does code meet requirements?
- Are edge cases handled?
- Is error handling appropriate?
- Are inputs validated?
- Does it work as intended?

### Code Quality
- Is code readable and maintainable?
- Are names descriptive?
- Is code properly organized?
- Is there duplicate code?
- Are functions/methods focused?
- Is complexity minimized?

### Testing
- Are tests included?
- Do tests cover edge cases?
- Are tests meaningful?
- Is test coverage adequate?
- Do all tests pass?

### Security
- Are there security vulnerabilities?
- Is input validated?
- Are secrets exposed?
- Is authentication/authorization correct?
- Are dependencies secure?

### Performance
- Are there obvious performance issues?
- Are database queries efficient?
- Is caching used appropriately?
- Are resources cleaned up?
- Is memory managed properly?

### Documentation
- Is code documented?
- Are comments clear and helpful?
- Is README updated?
- Are API changes documented?
- Is changelog updated?

## Review Process

### Before Reviewing
- Understand the context
- Read related issues/tickets
- Check CI/CD status
- Review automated checks
- Allocate sufficient time

### During Review
- Read code thoroughly
- Test locally if needed
- Check for patterns and anti-patterns
- Look for potential bugs
- Consider maintainability
- Think about scalability

### Providing Feedback
- Be specific and actionable
- Categorize feedback (blocker, suggestion, question)
- Provide examples
- Link to resources
- Use positive language
- Ask questions to understand

### Receiving Feedback
- Be open to criticism
- Ask for clarification
- Explain your reasoning
- Address all comments
- Thank reviewers
- Learn and improve

## Review Checklist

- [ ] Code follows style guide
- [ ] Functions are small and focused
- [ ] Names are descriptive
- [ ] No hardcoded values
- [ ] Error handling is proper
- [ ] Tests are included and pass
- [ ] No security vulnerabilities
- [ ] Performance is acceptable
- [ ] Documentation is updated
- [ ] No breaking changes without notice
- [ ] Dependencies are justified
- [ ] Code is DRY (Don't Repeat Yourself)

## Common Issues to Check

- Magic numbers/strings
- Long functions/classes
- Deep nesting
- Duplicate code
- Missing error handling
- Unhandled edge cases
- Unclear naming
- Missing tests
- Hardcoded configuration
- Security vulnerabilities
- Memory leaks
- Race conditions
- Incorrect logic

## When to Approve

- All blocking issues resolved
- Code meets quality standards
- Tests pass and coverage is adequate
- Documentation is complete
- No security concerns
- Performance is acceptable
- CI/CD checks pass

## When to Request Changes

- Functional issues
- Security vulnerabilities
- Critical bugs
- Missing tests
- Major style violations
- Breaking changes without discussion
- Insufficient documentation
