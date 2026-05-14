# @almafintech/react-components

Component library for Allaria React projects.

## Stack
- React 18 + TypeScript
- Rollup (build), Storybook 8 (dev/docs), Jest + Testing Library (tests)
- SCSS Modules for styling
- Radix UI

## Figma Design System
- File: https://www.figma.com/design/vGf75zcl3Q4uUx26zTXmNj
- When implementing a new component, fetch the design from Figma first via the Figma MCP tool, then adapt the output to the conventions below.

## Commands
- `npm run storybook` — start Storybook on port 6006
- `npm run dev` — watch build via Rollup
- `npm run build` — full production build (`rollup` + `post:build`)
- `npm test` — run Jest suite
- `npm run test-watch` — Jest in watch mode
- `npm run commit` — conventional commit via Commitizen

## Component conventions
- Each component lives in `src/<ComponentName>/`
- Files per component:
  - `<ComponentName>.tsx` — main implementation
  - `<ComponentName>.module.scss` — scoped styles
  - `types.ts` — prop types/interfaces
  - `index.ts` — re-export
  - `utils.ts` — local helpers (when needed)
- Styling: SCSS modules. CSS custom properties (`var(--token-name)`) for theme tokens.

## Storybook conventions
- Each component must have autodocs enabled (`tags: ['autodocs']` in the default export meta)
- Every prop must have at least one dedicated story demonstrating it

## Radix UI usage
- Use **primitives only** (`@radix-ui/react-<primitive>`). Do **not** install or import `@radix-ui/themes` — we ship our own styles via SCSS modules.
- Install primitives individually as needed (e.g. `@radix-ui/react-dropdown-menu`, `@radix-ui/react-dialog`).
- Radix primitives provide unstyled, accessible behavior — apply project styles on top.
- **Do not use NextUI / HeroUI.** These libraries are being removed — existing components that still depend on them will be migrated to Radix incrementally. Never reach for `@nextui-org/*` or `@heroui/*` in new code, even if the package is still in `package.json`.
