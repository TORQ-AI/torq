# Change Proposal: migrate-ui-to-shadcn

## Summary

Replace `@geist-ui/core` and `@geist-ui/icons` with shadcn/ui (Tailwind CSS v4, Radix UI primitives, `lucide-react`) and `next-themes`, enabling full SSR and pushing client boundaries down from the top-level `<Providers>` shell to only the components that genuinely need browser APIs or React hooks.

## Motivation

- `@geist-ui/core` is a client-only React context library. Its `GeistProvider` wraps the entire application at the top of the tree, forcing every component into the client bundle regardless of whether it has any interactivity.
- The current architecture results in ~40 files with `'use client'` when only ~20 genuinely require it.
- shadcn/ui components are not bundled as a library — they are copied into the project and can be used as Server or Client Components as needed.
- `next-themes` provides SSR-safe theme management for Next.js App Router out of the box, replacing ~60 lines of custom theme logic.
- Tailwind CSS v4 eliminates all inline `style={{}}` objects and provides a consistent, themeable design system.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Tailwind version | v4 | CSS-first config, lighter setup, full shadcn support |
| shadcn style | New York | Compact, sharp corners — closest to Geist aesthetic |
| Dark mode | `next-themes` | SSR-safe, zero flash, works with shadcn CSS variables |
| Icon library | `lucide-react` | Used by shadcn/ui by default; 1:1 icon replacements for `@geist-ui/icons` |
| Drawer → Sheet | shadcn `Sheet` | Radix-based slide-in panel; same UX as Geist `Drawer` |
| SSR depth | Maximum | All presentational-only components converted to Server Components |

## SSR Architecture Change

### Before
```
layout.tsx (SC) → Providers.tsx ('use client') → [ENTIRE APP CLIENT]
```

### After
```
layout.tsx (SC)
  ├── ThemeProvider ('use client', thin wrapper)
  ├── Header (SC) → ThemeSwitcher ('use client') + HeaderActions ('use client')
  ├── main (SC wrapper)
  │   ├── page.tsx (SC) → HomePage.tsx ('use client')
  │   └── activities/page.tsx (SC) → ActivitiesPage.tsx ('use client')
  └── Footer (SC)
```

### Components Gaining SSR

| Component | Before | After |
|-----------|--------|-------|
| `Footer` | CC | **SC** |
| `Header` (shell) | CC | **SC** |
| `Preloader` | CC | **SC** |
| `loading.tsx` | CC | **SC** |
| `HomePage/Member` | CC | **SC** |
| `ActivitiesPage/Guest` | CC | **SC** |
| `not-found.tsx` | Already SC | Still SC |

## Scope

- **Package**: `packages/ui`
- **Breaking changes**: None externally — UI-only package, internal refactor

## Dependencies

### Added
- `tailwindcss@^4`
- `@tailwindcss/postcss`
- `postcss`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `lucide-react`
- `next-themes`
- `tw-animate-css`
- `@radix-ui/react-dialog`
- `@radix-ui/react-slot`
- `@radix-ui/react-separator`

### Removed
- `@geist-ui/core`
- `@geist-ui/icons`
- `wouter`
