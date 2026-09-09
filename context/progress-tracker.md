# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Foundation

## Current Goal

- Prisma schema and data layer are implemented and verified against the configured Prisma Cloud database; ready for project APIs.

## Completed

- Prisma schema and data layer (`05-prisma.md`): required models and constraints, cached Accelerate/direct client, first migration applied to Prisma Cloud, generated client, passing cloud data-layer verification, and passing production build.
- Design system foundation (`01-design-system.md`): dark theme tokens, shadcn/ui configuration, required primitives, Lucide React, and `cn()` utility.
- Editor chrome (`02-editor-chrome.md`): controlled top navbar, floating project sidebar with tabbed empty states and new-project action, plus an editor layout that owns sidebar visibility.
- Authentication (`03-auth.md`): Clerk dark-theme provider with product-token overrides, responsive sign-in and sign-up pages, protected routes, session-aware root redirects, and the built-in editor user menu.
- Project dialogs (`04-project-dialogs.md`): minimal editor home with the specified heading, description, and New Project button; create dialog with live slug preview; prefilled, focused rename form with Enter submission; destructive delete confirmation; owned-only sidebar actions; and mobile backdrop dismissal.
- Dedicated `useProjectActions` hook manages dialog, form, loading, and in-memory mock project state. Home/sidebar create and sidebar rename/delete actions are connected, with no API calls or persistence.

## In Progress

- None.

## Next Up

- Implement project APIs (`06-project-apis.md`) after Prisma setup is verified.

## Open Questions

- None for Prisma setup.

## Architecture Decisions

- The application is dark-only; product tokens in `app/globals.css` drive both Tailwind utilities and shadcn semantic colors.
- UI primitives are generated through the shadcn CLI and remain unmodified in `components/ui/`.
- Future dialogs compose the existing `DialogHeader`, `DialogTitle`, `DialogDescription`, and `DialogFooter` primitives, with product-token styling applied by feature components.
- Editor chrome is composed in `EditorLayout`; route content remains renderable as server-provided children across the client boundary.
- Authentication is enforced by Clerk in root `proxy.ts`; only the auth paths configured by the existing Clerk environment variables are public.
- The root route is a session-aware redirect, while the editor chrome is served from the protected `/editor` route.
- Project dialogs compose unmodified shadcn primitives. `EditorLayout` owns the project actions hook and displays the editor home when no route children are supplied; mock changes reset on reload.
- Prisma uses `prisma.config.ts` with the `prisma/` schema directory, including `models/project.prisma`. Clerk user IDs are stored as `Project.ownerId`; collaborator identity uses the required project/email unique constraint without an extra ID field.
- `lib/prisma.ts` caches one client globally outside production, selecting Accelerate for `prisma+postgres://` and the PostgreSQL adapter otherwise. Builds generate the ignored client output before compiling Next.js.
- Prisma CLI loads `.env`; Next.js prioritizes `.env.local`. Both saved `DATABASE_URL` values now match and target Prisma Cloud at `pooled.db.prisma.io`, using the direct PostgreSQL adapter.

## Session Notes

- Verified with ESLint, TypeScript, a `cn()` merge assertion, and a production webpack build.
- Editor chrome verified with ESLint, strict TypeScript, and a Next.js 16 production webpack build. Turbopack is unavailable in the execution environment because its CSS worker cannot bind a local port.
- Authentication verified with ESLint, strict TypeScript, and `npm run build`. The build script uses Next.js 16's supported webpack mode because Turbopack's CSS worker cannot bind a local port in the execution environment.
- Project dialogs verified with `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `git diff --check`. Browser interaction and mobile visual checks remain unverified in this session.
- Prisma setup (`05-prisma.md`): added both models, required enum, fields, indexes, uniqueness and cascade relation; implemented the cached client and installed the Accelerate extension.
- Started the existing local Prisma dev `default` instance and successfully created/applied `20260909083000_init_projects`. Schema validation, client generation, ESLint, and production build (including TypeScript) pass.
- Direct PostgreSQL smoke verification passed for singleton caching, project/collaborator creation, DRAFT default, relations, and cascade deletion in a rolled-back transaction. Accelerate singleton initialization succeeds, but queries are blocked by the local server's client-version compatibility error (`P6000`).
- Cloud follow-up: after the user saved the cloud URL in `.env`, confirmed it exactly matches `.env.local` and the effective CLI URL. Applied `20260909083000_init_projects` with `prisma migrate deploy`; `prisma migrate status` confirms the cloud schema is up to date.
- Cloud verification passed through `lib/prisma.ts`: singleton caching, project/collaborator creation, DRAFT and null canvas defaults, ARCHIVED update, relations, and cascade deletion. The transaction was rolled back, leaving no test records. The first attempt exceeded the default transaction acquisition wait; retry with a 30-second test-only wait passed.
- Regenerated Prisma Client and reran `npm run build`, including TypeScript, successfully against the saved cloud configuration. The earlier local Accelerate compatibility issue does not affect the configured cloud PostgreSQL connection. The existing local Prisma dev instance was not needed or modified during this follow-up.
