# GitHub Copilot Agents Configuration

Custom agents configured for GitHub Copilot to provide consistent capabilities across different AI tools used by the team. These agents are synchronized with Claude Code skills to ensure your team has the same specialized capabilities regardless of which AI agent you use.

## Quick Reference

| Agent | Purpose | Files |
|-------|---------|-------|
| [Create Changelog](#create-changelog) | Generate changelog entries from git diffs | [Copilot](./agents/create-changelog.md) \| [Claude](../.cursor/skills/create-changelog/SKILL.md) |
| [Frontend Design](#frontend-design) | Create production-grade frontend interfaces | [Copilot](./agents/frontend-design.md) \| [Claude](../.cursor/skills/frontend-design/SKILL.md) |
| [Web Design Guidelines](#web-design-guidelines) | Validate UI code against design standards | [Copilot](./agents/web-design-guidelines.md) \| [Claude](../.cursor/skills/web-design-guidelines/SKILL.md) |
| [Code Review](#code-review) | Comprehensive code analysis with quality scoring | [Copilot](./agents/review-code.md) \| [Claude](../.cursor/skills/review-code/SKILL.md) |

## Agents

### Create Changelog

Generates changelog entries from git diffs using the "Keep a Changelog" standard.

**When to use**: Ask to generate a changelog entry after making code changes

**Key capabilities**:
- Analyzes git diff between current and main branch
- Categorizes changes (Added, Changed, Fixed, Security, etc.)
- Extracts ticket IDs from branch names
- Documents only actual changes, avoids speculation
- Produces properly formatted changelog content

**Example**: `Generate a changelog entry for my current branch`

→ [View detailed instructions](./agents/create-changelog.md)

### Frontend Design

Creates distinctive, production-grade frontend interfaces with high design quality.

**When to use**: Request to build UI components, pages, dashboards, or styling improvements

**Key capabilities**:
- Generates complete, production-ready components
- Applies modern design patterns and accessibility standards
- Provides styling with Tailwind CSS and CSS-in-JS
- Ensures responsive and performant implementations
- Commits to distinctive aesthetic directions (avoids "AI slop")

**Example**: `Create a beautiful landing page for our product`

→ [View detailed instructions](./agents/frontend-design.md)

### Web Design Guidelines

Validates UI implementations against design standards and accessibility requirements.

**When to use**: Review UI for accessibility, design compliance, or best practices

**Key capabilities**:
- Checks WCAG accessibility standards
- Validates responsive design patterns
- Reviews color contrast and typography
- Ensures UI consistency and best practices
- Provides prioritized improvement recommendations

**Example**: `Review my component for accessibility and design compliance`

→ [View detailed instructions](./agents/web-design-guidelines.md)

### Code Review

Provides comprehensive code analysis with detailed feedback and quality scoring.

**When to use**: Request detailed code review, analyze changes, or audit specific files

**Key capabilities**:
- Analyzes code between branches with adaptive review depth
- Identifies security issues, bugs, and performance concerns
- Provides quality score (1-10) with detailed breakdown
- Prioritizes findings by impact (critical > major > suggestions)
- Suggests improvements for code quality and maintainability

**Example**: `Review my code changes and provide recommendations`

→ [View detailed instructions](./agents/review-code.md)

## Using Agents

### In GitHub Copilot Chat

1. Open GitHub Copilot Chat in VS Code
2. Ask your question naturally: `Review my code`, `Generate a changelog`, etc.
3. Copilot will use the appropriate agent based on your request

### Triggering Specific Agents

Agents are triggered based on context. To ensure the right agent is used:

- **Changelog**: Mention "changelog", "change log", "release notes"
- **Frontend Design**: Request "design", "build UI", "create component", "styling"
- **Web Design Guidelines**: Ask to "review", "audit design", "check accessibility"
- **Code Review**: Request "code review", "review changes", "analyze code"

## Keeping Agents in Sync

These GitHub Copilot agents are synchronized with Claude Code skills. Both sets of instructions contain the same core logic and capabilities, formatted appropriately for each platform.

### Updating Agents

If you need to update an agent's instructions:

1. **Modify the Claude skill first** (`.cursor/skills/[skill-name]/SKILL.md`)
2. **Update the Copilot agent** (`.github/copilot/agents/[skill-name].md`)
3. **Use the sync tool** to verify both are in sync:
   ```bash
   bun scripts/skill-converter.ts status
   ```

### Synchronization Tool

The `skill-converter` utility helps manage both formats:

```bash
# List available Claude skills
bun scripts/skill-converter.ts list

# Compare specific skill versions
bun scripts/skill-converter.ts compare create-changelog

# Check sync status of all skills
bun scripts/skill-converter.ts status
```

## Architecture

These agents leverage:
- **GitHub Copilot Chat**: Native VS Code integration for natural language interaction
- **Copilot Coding Agent**: Autonomous code execution and modification
- **Copilot CLI**: Command-line based AI assistance

## Additional Resources

- [Complete cross-agent skills documentation](../../CROSS_AGENT_SKILLS.md)
- [Claude skills documentation](./.cursor/skills/skill-creator/SKILL.md)
- [GitHub Copilot documentation](https://docs.github.com/en/copilot)
- [Project coding conventions](../../openspec/project.md)
