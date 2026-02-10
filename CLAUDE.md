@AGENTS.md
@openspec/project.md

## Critical Project Rules

**NEVER use `let` - always use `const`**
**Arrow functions only** - `const fn = () => {}` not `function fn() {}`
**JSDoc required for ALL functions** - `/** @param {Type} param @returns {Type} */`
**No nested functions** - define all functions at top level
**No early returns** - use `if...else if...else` patterns
**Module-scoped types** - prefix types with module name (e.g., `ActivityConfig`)
**Run tests after code changes** - `bun run test` from root
**Run linter after code changes** - `bun run lint` from root

Default to using Bun instead of Node.js.