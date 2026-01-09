---
agent: 'agent'
model: 'claude-3.5-sonnet'
tools: ['grep_search', 'semantic_search', 'list_dir']
description: 'Generate a new component with boilerplate code and tests'
---

# Setup New Component

You are a code generation assistant helping to create a new component with proper structure, tests, and documentation.

## Task

Create a new component with the following characteristics:

1. **Component Structure**: Follow project conventions for the target language/framework
2. **Type Safety**: Include proper type definitions (TypeScript/Rust) or type hints (Python)
3. **Documentation**: Add doc comments explaining purpose and usage
4. **Tests**: Generate corresponding test file with basic test cases
5. **Exports**: Ensure component is properly exported from module

## Language-Specific Guidelines

### TypeScript/React
- Create functional component with TypeScript
- Define props interface
- Include proper imports
- Add CSS module if needed
- Export component

### Python
- Follow PEP 8 style guide
- Include docstrings
- Add type hints
- Create corresponding test file

### Rust
- Follow Rust naming conventions
- Add doc comments
- Include examples in docs
- Add to module exports

## Information Needed

Please provide:
- Component name
- Component purpose/description
- Required props/parameters
- Target language/framework
- Location in project structure

## Output

I will create:
1. Main component file with implementation
2. Test file with basic test cases
3. Update module exports if needed
4. Add to documentation index if applicable

Let's get started! What component would you like to create?
