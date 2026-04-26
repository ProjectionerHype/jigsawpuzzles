# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Jigscape (jigsaw-puzzle artifact) — Cloudflare Workers deployment

The `artifacts/jigsaw-puzzle` artifact is configured to deploy to **Cloudflare Workers** (using Workers Static Assets), so a backend (e.g., daily puzzle leaderboard) can be added later in the same Worker without changing hosting.

Files involved:
- `artifacts/jigsaw-puzzle/wrangler.jsonc` — Worker + assets config (name `jigscape`, SPA-style fallback for client routes)
- `artifacts/jigsaw-puzzle/worker/index.ts` — Worker entrypoint. Currently routes `/api/*` to a 501 placeholder and forwards everything else to the static assets binding. Add API handlers here later.
- `artifacts/jigsaw-puzzle/worker/tsconfig.json` — Worker-only tsconfig using `@cloudflare/workers-types`.

Commands (run from repo root):
- `pnpm --filter @workspace/jigsaw-puzzle run cf:build` — build the SPA for production with `BASE_PATH=/`.
- `pnpm --filter @workspace/jigsaw-puzzle run cf:dev` — local Worker preview via `wrangler dev`.
- `pnpm --filter @workspace/jigsaw-puzzle run cf:deploy` — build + `wrangler deploy` to Cloudflare. Requires `wrangler login` (or `CLOUDFLARE_API_TOKEN`) on the deploy machine.
- `pnpm --filter @workspace/jigsaw-puzzle run cf:typecheck` — typecheck the Worker code.

Adding the backend later (e.g., daily-puzzle leaderboard):
1. Add API handlers in `worker/index.ts` under the `/api/*` branch.
2. Add storage bindings (D1, KV, or Durable Objects) to `wrangler.jsonc` under `d1_databases` / `kv_namespaces` / `durable_objects`.
3. Update `Env` interface in `worker/index.ts` to include the new bindings.
No frontend hosting change is required.
