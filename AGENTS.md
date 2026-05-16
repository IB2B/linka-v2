<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# linka — project rules

Social media management app. AI generates post text/images, users post via the **Late API**. Two roles: `USER` | `ADMIN` (uppercase enum). Two role-based dashboards under `/dashboard` and `/admin`.

## Hard rules

- **80-line cap** on every `.ts`/`.tsx` file. shadcn `components/ui/*` is exempt (vendor code). Split before submitting.
- **One thing per file.** Types in `*-props.ts` / `*.types.ts`, one component per `.tsx`, helpers/constants in their own files. Pages and layouts compose — they don't contain markup blocks.
- **No duplicated JSX.** Extract repeated blocks (e.g. avatar+name+email, label+input pairs) into shared components.
- **No backwards-compat hacks.** Delete unused code; don't leave `// removed` comments or rename to `_unused`.

## Architecture

### Stack
- **Repo layout:** root holds two siblings — `client/` (Next.js 16 App Router, RSC, port 3000) and `server/` (Express 5 + raw MySQL via `mysql2`, port 4000). Each has its own `package.json`, `node_modules`, and `tsconfig.json`. Run `cd client && npm run dev` and `cd server && npm run dev` in two terminals.
- **Browser only ever hits `/api/*` on the Next origin** — `client/next.config.ts` rewrites it to Express. No CORS, cookies are same-origin.

### Auth & API
- **All API logic lives in `server/`.** Do not add `client/src/app/api/*` routes for auth, billing, users, or stripe — they're proxied to Express.
- **Auth flow:** Express issues an httpOnly JWT cookie (`token`) on `/api/auth/{register,login}`. `client/src/proxy.ts` redirects unauthenticated visitors away from protected paths based on cookie presence; layouts call `fetchMe()` to load the user from `/api/users/me`.
- **`requireRole(role)`** in layouts guards entire dashboard sections — pages don't need to re-check. Returns `{ user: Me }`, no DB client.
- **Server route layout:** zod schema → handler → `db.query(...)`. Routes split by domain: `auth.ts`, `users.ts`, `billing.ts`, `stripe.ts`. Each file stays under 80 lines.
- **Server actions** in `client/src/app/dashboard/**/actions.ts` are thin — they forward `cookie` headers to `/api/*` and return `{ success } | { error }`.
- **Typed fetch client** for browser flows lives in `client/src/lib/api/auth-client.ts` (`postJson<T>()`). Reuse it for new endpoints.
- **`useLogout()`** hook owns the logout mutation; never inline the fetch.

### Forms
- Use `<FormField>`, `<PasswordField>`, `<FormSubmitButton>` from `client/src/components/forms/`. Never hand-roll `<Input>`+`<Label>` pairs.
- Errors → **sonner toasts** (`<Toaster />` is mounted in root layout). No inline error text.
- Loading state → shared `<Spinner />` from `client/src/components/ui/spinner.tsx`. Every loading button uses this exact spinner.
- Validation lives in zod (`refine` for cross-field rules like password match).

### Dashboard
- `AppSidebar` is role-aware via `getNavigationForRole(role)`. To add a nav item, edit `client/src/lib/dashboard/navigation.ts`.
- Lucide icons must NOT cross the RSC boundary as props. Resolve them inside client components (see `sidebar-nav.tsx` pattern).

### Database
- **MySQL via raw SQL migrations.** Migration files at `server/migrations/NNNN_*.sql`, applied in order by `npm --prefix server run db:migrate`. Tracking table: `_migrations`. To add a change, drop a new numbered file — never edit applied migrations.
- DB access through `mysql2/promise` pool exported from `server/src/lib/db.ts`. Always use `?` placeholders — never string-concat values.
- New users land with `onboarding_completed=false, onboarding_step=1`. A future onboarding gate will redirect mid-onboarding users before the role dashboard.
- On register: `INSERT INTO users` directly with bcrypt-hashed `password_hash`, default `role='USER'`. No triggers.
- Tables: `users`, `user_profiles`, `subscriptions`, `linkedin_credentials`, `writing_samples`, `generated_content`, `posting_history`, `admin_actions`, `support_tickets`. Snake_case columns; map to camelCase in JSON responses.
- **Avatar/file storage is not wired up** — `uploadAvatarAction` returns a "migration pending" error until a blob backend (S3/R2) is chosen.

## UI / shadcn (this variant uses base-ui, not Radix)

- **`render` prop, not `asChild`.** `<DropdownMenuTrigger render={<SidebarMenuButton />}>...</...>` is the pattern.
- **`onClick`, not `onSelect`** on `DropdownMenuItem` and similar.
- **`DropdownMenuLabel` must be inside a `DropdownMenuGroup`** — base-ui requires the group context.
- **Lucide icons** for iconography (configured in `components.json`).
- **Tooltips** require `<TooltipProvider>` at the root (already wired).

## Performance defaults

- **RSC by default.** Mark `"use client"` only when hooks/events/browser APIs require it.
- **Stream** with Suspense + `loading.tsx` rather than blocking pages on slow data.
- **Parallel-fetch** with `Promise.all` for independent API/SQL queries; never sequential awaits.
- **Avoid heavy client deps.** Check bundle impact before adding a library; prefer the existing primitives (shadcn, sonner, lucide, zod) before reaching for new ones.

## Proxy (formerly middleware)

Next.js 16+ renamed the `middleware.ts` convention to `proxy.ts`. The function is exported as `proxy` (or default). The current `client/src/proxy.ts` only redirects unauthenticated visitors away from `/dashboard` and `/admin` based on the presence of the `token` cookie — full JWT verification happens server-side on every `/api/*` call.
