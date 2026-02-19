# Tasks: migrate-ui-to-shadcn

## Phase 1: Foundation

- [ ] Install Tailwind CSS v4, postcss, shadcn utilities, lucide-react, next-themes
- [ ] Create `packages/ui/postcss.config.mjs`
- [ ] Create `packages/ui/src/app/globals.css` with Tailwind + shadcn CSS variables (New York light/dark)
- [ ] Create `packages/ui/src/lib/utils.ts` with `cn()` helper
- [ ] Create shadcn component files in `packages/ui/src/components/ui/`: button, card, alert, separator, sheet, skeleton, badge

## Phase 2: Layout Restructure (SSR)

- [ ] Rewrite `providers.tsx` → thin `ThemeProvider` client wrapper (remove GeistProvider, CssBaseline, layout structure)
- [ ] Rewrite `layout.tsx` → move Header + main + Footer here; import `globals.css`; use `suppressHydrationWarning` for next-themes
- [ ] Delete `src/hooks/useTheme/` directory (replaced by next-themes)

## Phase 3: Server Components

- [ ] Rewrite `Footer.tsx` → Server Component, Tailwind classes, `lucide-react`, no Geist
- [ ] Rewrite `Header.tsx` → SC shell + `ThemeSwitcher` CC + `HeaderActions` CC
- [ ] Rewrite `ThemeSwitcher.tsx` → use `next-themes` `useTheme`, shadcn `Button`, `lucide-react`
- [ ] Rewrite `Preloader.tsx` → Server Component, Tailwind, no Geist
- [ ] Rewrite `loading.tsx` → no `'use client'`, delegates to Preloader (now SC)

## Phase 4: View Components

- [ ] Rewrite `HomePage/Guest.tsx` → stays CC (onClick), replace Geist with shadcn + Tailwind
- [ ] Rewrite `HomePage/Member.tsx` → convert to SC, `next/link`, Tailwind, no Geist
- [ ] Rewrite `ActivitiesPage/Guest.tsx` → convert to SC, `next/link`, shadcn Card, Tailwind
- [ ] Rewrite `ActivitiesPage/Error.tsx` → stays CC (onClick), shadcn Card + Alert + Button
- [ ] Rewrite `ActivitiesList.tsx` → stays CC (onClick), shadcn Card + Button, `lucide-react`

## Phase 5: Drawer & Image Generator

- [ ] Rewrite `ImageGenerationDrawer.tsx` → shadcn `Sheet` replaces Geist `Drawer`
- [ ] Rewrite `ImageGenerationDrawer/Title/Title.tsx` → shadcn `SheetHeader`/`SheetTitle`, `lucide-react`
- [ ] Rewrite `Content/Content.tsx` → shadcn `SheetContent`, Card, Tailwind grid (no Geist)
- [ ] Rewrite `Content/Signals/Signals.tsx` → Tailwind typography (no Geist Text)
- [ ] Rewrite `Content/Prompt/Prompt.tsx` → Tailwind typography
- [ ] Rewrite `Content/Image/Content/Content.tsx` → shadcn Button, Tailwind, next-themes, `lucide-react`
- [ ] Rewrite `Content/ExpandableCard/ExpandableCard.tsx` → shadcn Card + Separator
- [ ] Rewrite `Content/ExpandableCard/Title/Title.tsx` → Tailwind typography
- [ ] Rewrite `Content/ExpandableCard/Expander/Expander.tsx` → shadcn Button, `lucide-react`
- [ ] Rewrite `Content/ExpandableCard/States/Items/Items.tsx` → Tailwind list

## Phase 6: Cleanup

- [ ] Remove `@geist-ui/core`, `@geist-ui/icons`, `wouter` from `package.json`
- [ ] Replace `wouter` Link usages with `next/link`
- [ ] Run `bun run build` and fix any issues
- [ ] Run `bun run test` from root — all tests pass
- [ ] Run `bun run lint` from root — no errors
