# GitHub Copilot Setup Guide

This repository is configured with comprehensive GitHub Copilot instructions for multi-language development.

## 📋 Overview

This setup includes:
- **Main Instructions**: Repository-wide coding standards and guidelines
- **Language-Specific Instructions**: TypeScript/React, Python, and Rust
- **Cross-Cutting Concerns**: Testing, security, performance, documentation, code review
- **Reusable Prompts**: Common development tasks
- **Specialized Agents**: Architecture, code review, and debugging modes
- **CI/CD Integration**: Automated quality checks

## 🚀 Quick Start

### 1. Install GitHub Copilot

1. Install the GitHub Copilot extension in VS Code
2. Sign in with your GitHub account
3. Ensure you have an active Copilot subscription

### 2. Verify Configuration

The Copilot configuration is automatically loaded from [.github/copilot-instructions.md](.github/copilot-instructions.md).

You can verify it's working by:
1. Open any code file
2. Start typing or use Copilot chat
3. Copilot suggestions should follow project guidelines

### 3. Enable Copilot Chat

1. Open Copilot Chat (Ctrl+Shift+I or Cmd+Shift+I)
2. Try asking questions about the codebase
3. Use `@workspace` to include workspace context

## 📚 Using Instructions

### Language-Specific Instructions

Instructions are automatically applied based on file type:

- **TypeScript/React** (`.ts`, `.tsx`, `.js`, `.jsx`): [typescript-react.instructions.md](.github/instructions/typescript-react.instructions.md)
- **Python** (`.py`): [python.instructions.md](.github/instructions/python.instructions.md)
- **Rust** (`.rs`): [rust.instructions.md](.github/instructions/rust.instructions.md)

### Cross-Cutting Instructions

These apply to all code:

- [Testing](.github/instructions/testing.instructions.md)
- [Security](.github/instructions/security.instructions.md)
- [Performance](.github/instructions/performance.instructions.md)
- [Documentation](.github/instructions/documentation.instructions.md)
- [Code Review](.github/instructions/code-review.instructions.md)

## 🎯 Using Prompts

Prompts are reusable templates for common tasks. Reference them in Copilot Chat:

### Available Prompts

1. **Setup Component**: `#file:.github/prompts/setup-component.prompt.md`
   - Generate new components with tests

2. **Write Tests**: `#file:.github/prompts/write-tests.prompt.md`
   - Create comprehensive test suites

3. **Code Review**: `#file:.github/prompts/code-review.prompt.md`
   - Get detailed code review feedback

4. **Refactor Code**: `#file:.github/prompts/refactor-code.prompt.md`
   - Improve code quality and structure

5. **Generate Docs**: `#file:.github/prompts/generate-docs.prompt.md`
   - Create documentation for code

6. **Debug Issue**: `#file:.github/prompts/debug-issue.prompt.md`
   - Get help debugging problems

### Example Usage

```
I want to create a new user profile component.
#file:.github/prompts/setup-component.prompt.md
```

## 🤖 Using Specialized Agents

Agents provide focused assistance for specific workflows:

### Architect Agent

For system design and architecture planning:

```
I need help designing a scalable API architecture.
#file:.github/agents/architect.agent.md
```

### Reviewer Agent

For comprehensive code reviews:

```
Please review my recent changes for quality and security.
#file:.github/agents/reviewer.agent.md
```

### Debugger Agent

For debugging complex issues:

```
I'm getting a null pointer exception in the user service.
#file:.github/agents/debugger.agent.md
```

## 💡 Tips and Best Practices

### Getting Better Suggestions

1. **Be Specific**: Provide clear context in comments
2. **Use Type Hints**: Strong typing improves suggestions
3. **Follow Patterns**: Copilot learns from existing code
4. **Review Suggestions**: Always review and test generated code

### Effective Chat Usage

1. **Use @workspace**: Include workspace context for better answers
2. **Reference Files**: Use `#file:path/to/file` to include specific files
3. **Ask for Explanations**: Request code explanations to learn
4. **Iterate**: Refine questions based on responses

### Customizing Instructions

You can customize instructions by editing files in `.github/`:

1. Edit [.github/copilot-instructions.md](.github/copilot-instructions.md) for general changes
2. Modify language-specific files in `.github/instructions/`
3. Create custom prompts in `.github/prompts/`
4. Add specialized agents in `.github/agents/`

## 🔧 Project-Specific Setup

### TypeScript/React Projects

1. Ensure `tsconfig.json` has strict mode enabled
2. Install ESLint and Prettier
3. Configure testing with Jest and React Testing Library
4. Use TypeScript path aliases for clean imports

### Python Projects

1. Use Python 3.11+ with type hints
2. Configure `pyproject.toml` or `setup.py`
3. Install pytest and coverage tools
4. Use virtual environments (venv, conda)

### Rust Projects

1. Use latest stable Rust toolchain
2. Configure Cargo.toml properly
3. Install clippy and rustfmt
4. Enable appropriate lints

## 🧪 Testing with CI/CD

The [copilot-setup-steps.yml](.github/workflows/copilot-setup-steps.yml) workflow:

- Runs on push and pull requests
- Tests all three languages in parallel
- Performs linting and testing
- Ensures code quality before merge

Trigger manually: Actions tab → Copilot Setup Steps → Run workflow

## 📖 Learning Resources

### GitHub Copilot Documentation
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide)
- [Best Practices](https://github.blog/developer-skills/github/how-to-use-github-copilot-in-your-ide-tips-tricks-and-best-practices/)

### Pattern Sources
- This configuration is adapted from [github/awesome-copilot](https://github.com/github/awesome-copilot)
- See individual files for specific attribution

## 🤝 Contributing

When contributing code:

1. Follow language-specific guidelines
2. Write tests for new features
3. Update documentation
4. Ensure CI/CD passes
5. Request code review

## 📝 Customization Examples

### Add a New Language

1. Create `.github/instructions/language-name.instructions.md`
2. Add `applyTo` pattern in frontmatter
3. Reference in main instructions
4. Update CI/CD workflow if needed

### Create a Custom Prompt

1. Create `.github/prompts/task-name.prompt.md`
2. Add frontmatter with agent, model, and tools
3. Write clear instructions for the task
4. Reference in chat with `#file:` syntax

### Add a Specialized Agent

1. Create `.github/agents/agent-name.agent.md`
2. Define agent role and capabilities
3. Provide structured guidance
4. Use in chat by referencing the file

## 🐛 Troubleshooting

### Copilot Not Responding

1. Check Copilot status in VS Code status bar
2. Verify internet connection
3. Sign out and back in to Copilot
4. Restart VS Code

### Instructions Not Applied

1. Ensure file is in `.github/` directory
2. Check YAML frontmatter syntax
3. Verify `applyTo` patterns are correct
4. Reload VS Code window

### Poor Suggestions

1. Provide more context in comments
2. Use type annotations
3. Follow existing code patterns
4. Break down complex tasks
5. Reference specific instruction files

## 📞 Getting Help

- Review [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- Check [awesome-copilot examples](https://github.com/github/awesome-copilot)
- Ask in Copilot Chat: "How do I use custom instructions?"

## 🎉 Next Steps

1. Explore each instruction file to understand guidelines
2. Try using different prompts for common tasks
3. Experiment with specialized agents
4. Customize instructions for your workflow
5. Share improvements with the team

Happy coding with GitHub Copilot! 🚀
