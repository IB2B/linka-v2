# linka

Social media management app. AI writes posts and makes images and videos in
the user's own voice. Users then publish them to their social accounts
through the Late API.

Two roles: `USER` (dashboard at `/dashboard`) and `ADMIN` (dashboard at `/admin`).

## Repo layout

| Folder    | What it is                                   | Port |
| --------- | -------------------------------------------- | ---- |
| `client/` | Next.js 16 frontend (App Router, RSC)        | 3000 |
| `server/` | Express 5 API with raw MySQL (`mysql2`)      | 4000 |

Each folder has its own `package.json` and `node_modules`. The browser only
calls `/api/*` on the Next.js app, and `client/next.config.ts` forwards those
calls to Express. Login uses an httpOnly JWT cookie called `token`.

## Getting started

1. Install dependencies:

   ```bash
   npm install --prefix client && npm install --prefix server
   ```

2. Copy `server/.env.example` to `server/.env` and fill it in. The file
   explains every variable. The frontend reads `client/.env.local`.

3. Create or update the database tables:

   ```bash
   npm --prefix server run db:migrate
   ```

4. Start both apps, each in its own terminal:

   ```bash
   npm --prefix server run dev
   ```

   ```bash
   npm --prefix client run dev
   ```

5. Open http://localhost:3000.

## Database migrations

Migrations are plain SQL files in `server/migrations/NNNN_*.sql`.
`db:migrate` runs them in order and records each one in the `_migrations`
table. To change the schema, add a new numbered file. Never edit a
migration that has already run.

**Run `db:migrate` on production after every deploy that adds a migration.**

## Plans and limits

Posts and videos each have a monthly limit, and both reset on the 1st of the
month at midnight UTC. Images have a daily limit.

| Plan              | Posts / month | Videos / month | Images / day |
| ----------------- | ------------- | -------------- | ------------ |
| Free              | 5             | 0              | 20           |
| Creator ($29)     | 30            | 10             | 20           |
| Business ($79)    | 150           | 30             | 20           |
| Enterprise        | 10,000        | 100            | 20           |

- 1 post means 1 platform version, so a post for LinkedIn and X uses 2.
- Each platform gets its own video, so an avatar post for 2 platforms uses
  2 videos.
- Regenerating a post's text is free. Re-rendering a video uses a video.
- A failed video render doesn't count.
- Videos are counted in the `video_usage` table, so restarts and deploys
  don't reset the count.

The limits live in `server/src/lib/plan-features.ts`. If you change them,
also update the pricing text in `client/src/messages/*.json` (all 5 languages).

## Dashboard

- **Header:** search, then the **New post** button (AI generate or write by
  hand), then notifications. Keep plan and usage out of the header.
- **Plan card:** sits in the sidebar, right above the account row. It shows
  the plan, the reset date, and posts, images and videos as `used / limit`
  with a thin bar. Bars turn amber at 80% and red at 100%. The posts and
  videos bars have a small tick that marks how far through the month we are.
  An Upgrade button shows only on the free plan or when a limit runs low.
- The card reads `GET /api/users/me/usage`, loaded once in
  `client/src/app/dashboard/layout.tsx`. The code is in
  `client/src/components/dashboard/sidebar-plan-card.tsx`.
- The badge next to the user's name shows their plan.

## Integrations

- **Late API:** publishing posts, plus Instagram, Facebook, X and Reddit DMs
- **Unipile:** LinkedIn DMs
- **HeyGen:** avatar videos. Users can make their own avatar from one photo.
- **Higgsfield:** short clip videos made from an image
- **OpenAI / Anthropic / Gemini:** post text
- **OpenAI image models:** post images
- **Stripe:** billing and plans
- **SMTP (Google Workspace):** all transactional email

## Hosting

- Frontend: Vercel
- Backend and MySQL: Elestio (Docker, see `docker-compose.yml`)
- DNS: Cloudflare

Pushing to `main` deploys to production.

If Vercel marks a deploy as failed with an "upgrade to Pro" link, the
Vercel team has dropped to the Hobby plan. Hobby can't deploy from a private
GitHub organization. Move the team back to Pro, then redeploy `main`.

## Project rules

Read `AGENTS.md` before writing code. In short: every file stays under 80
lines, one component per file, and forms and errors use the shared
components and sonner toasts.
