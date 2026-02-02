# Web Design Guidelines Agent

## Description

Validates UI code and design implementations for compliance with web design guidelines and best practices.

**When to use**: Ask to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".

## Capabilities

- Checks design compliance with Web Interface Guidelines
- Validates WCAG accessibility standards
- Reviews responsive design patterns
- Checks color contrast and typography
- Ensures UI consistency
- Validates semantic HTML
- Reviews performance implications
- Provides improvement recommendations with priority

## Workflow

1. Fetches the latest Web Interface Guidelines from source
2. Reads specified files or prompts user for files/pattern to review
3. Analyzes code against all rules in the guidelines
4. Reports findings in clear format with line numbers and context

## Guidelines Source

Uses official Web Interface Guidelines (fetched fresh for each review):
- Latest version from: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md

The fetched guidelines contain:
- All rules and requirements
- Output format specifications
- Best practices for modern web interfaces

## Review Categories

When reviewing files, checks against:

### Accessibility (WCAG)
- Semantic HTML structure
- ARIA labels and roles
- Color contrast ratios
- Keyboard navigation
- Screen reader compatibility

### Responsive Design
- Mobile-first approach
- Breakpoint strategy
- Flexible layouts
- Touch-friendly interactions
- Media query usage

### Typography
- Font size hierarchy
- Line height and spacing
- Font pairing appropriateness
- Readability on all devices

### Color & Contrast
- Sufficient contrast ratios
- Color not sole means of communication
- Consistent color usage
- Brand alignment

### Layout & Spacing
- Consistent spacing system
- White space usage
- Grid alignment
- Component spacing

### Performance
- CSS file organization
- Unused styles removal
- Animation performance
- Asset optimization

## Output Format

Reports findings as:
- File and line number references
- Severity level (error, warning, suggestion)
- Description of the issue
- Recommended fix or improvement

Example:
```
components/Header.tsx:15: Warning - Color contrast ratio too low for body text
  - Current: 4.2:1
  - Required: 4.5:1
  - Fix: Darken text color or lighten background

pages/index.tsx:42: Suggestion - Consider using CSS variables for theme consistency
  - Improves maintainability
  - Enables dark mode support
```

## Usage

Ask the agent to:
1. Review specific files or patterns in your project
2. Check accessibility compliance
3. Audit design consistency
4. Validate responsive design
5. Review color and contrast
6. Improve typography hierarchy
