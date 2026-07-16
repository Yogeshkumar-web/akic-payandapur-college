# AKIC Payandapur Codebase Index

Last reviewed: 2026-07-16

## 1. Project Purpose

This repository contains the public website and admin panel for AKIC Payandapur,
an inter college in Moradabad, Uttar Pradesh.

The application provides:

- Public institutional information and photo gallery.
- Class/stream-wise subject information.
- A database-backed notice board.
- Downloadable study materials.
- A contact form and admin-side enquiry management.
- Supabase email/password authentication.
- An admin dashboard protected by authentication and a database role.

## 2. Technology Stack

| Area | Technology | Main location |
| --- | --- | --- |
| Framework | Next.js 16 App Router | `app/` |
| UI | React 19, TypeScript | `app/`, `components/` |
| Styling | Tailwind CSS 4 plus inline styles | `app/globals.css`, components |
| Database | PostgreSQL | Supabase-hosted or any PostgreSQL URL |
| ORM | Drizzle ORM | `db/schema.ts`, `lib/db.ts` |
| Authentication | Supabase Auth | `lib/supabase/`, `app/auth/actions.ts` |
| File storage | Supabase Storage | `lib/supabase/storage.ts`, `app/api/upload/route.ts` |
| Package manager | pnpm | `pnpm-lock.yaml`, `pnpm-workspace.yaml` |
| Fonts | Next.js Google Fonts: Inter and Nunito | `app/layout.tsx` |

Path alias `@/*` maps to the repository root, so imports such as
`@/db/schema` resolve to `db/schema.ts`.

## 3. High-Level Request Flow

### Public content

```text
Browser
  -> App Router page
  -> public API route
  -> Drizzle client
  -> PostgreSQL
```

Notices and study materials use this flow. Static pages such as subjects and
gallery keep their content directly inside their page files.

### Authentication

```text
Login/register form
  -> server action in app/auth/actions.ts
  -> Supabase Auth
  -> Supabase session cookies
  -> middleware refreshes the session
```

Registration also inserts a matching row into the local `users` table with the
default `student` role.

### Admin authorization

```text
Request to /admin/*
  -> middleware requires a Supabase session
  -> app/admin/layout.tsx loads public.users
  -> role must equal "admin"
  -> admin page renders
```

The layout is the effective page-level admin role guard. Server actions in
`app/admin/actions.ts` repeat the admin-role check before writing.

### File upload

The currently used admin forms upload directly from the browser:

```text
Admin form
  -> lib/supabase/storage.ts
  -> public "study-materials" bucket
  -> public URL stored through a server action
  -> PostgreSQL notice/study_materials row
```

`app/api/upload/route.ts` provides a separate server-side upload path with a
10 MB limit, but the current admin forms do not use it.

## 4. Route Map

### Public pages

| URL | File | Rendering and data |
| --- | --- | --- |
| `/` | `app/page.tsx` | Async server page; fetches up to three notices through `/api/notices` |
| `/subjects` | `app/subjects/page.tsx` | Static class 9-12 and Science/Arts curriculum data |
| `/notices` | `app/notices/page.tsx` | Client page; fetches notices and filters by category |
| `/resources` | `app/resources/page.tsx` | Client page; fetches materials and groups them by class |
| `/contact` | `app/contact/page.tsx` | Static contact details plus client contact form |
| `/gallery` | `app/gallery/page.tsx` | Static list of images from `public/` |
| `/login` | `app/(auth)/login/page.tsx` | Client form backed by the `login` server action |
| `/register` | `app/(auth)/register/page.tsx` | Client form backed by the `signup` server action |

The `(auth)` folder is a route group and is not included in the URL.

### Admin pages

All admin pages inherit the authentication and role checks in
`app/admin/layout.tsx`.

| URL | File | Purpose |
| --- | --- | --- |
| `/admin` | `app/admin/page.tsx` | Counts notices, materials, and users |
| `/admin/notices` | `app/admin/notices/page.tsx` | Uploads an optional attachment and creates a notice |
| `/admin/materials` | `app/admin/materials/page.tsx` | Uploads and saves a study material |
| `/admin/contact` | `app/admin/contact/page.tsx` | Server-rendered contact list and “Mark Resolved” action |
| `/admin/contacts` | `app/admin/contacts/page.tsx` | Alternate client-rendered contact management UI |

The active admin layout links to `/admin/contact`, not `/admin/contacts`.

### API routes

| Endpoint | Methods | Access | Responsibility |
| --- | --- | --- | --- |
| `/api/notices` | GET, POST, PUT, DELETE | GET public; writes require a session | Notice queries and CRUD |
| `/api/study-materials` | GET, POST, DELETE | GET public; writes require a session | Material queries and CRUD |
| `/api/contact` | POST | Public | Creates a contact submission |
| `/api/admin/contacts` | GET, PATCH | Session required | Lists submissions and changes status |
| `/api/upload` | POST | Session required | Server-side upload to `study-materials` bucket |
| `/api/auth/check` | GET | Public response about current session | Authentication diagnostic endpoint |

## 5. Core Application Files

### App shell and styling

- `app/layout.tsx`
  - Defines site metadata.
  - Loads Inter and Nunito through `next/font`.
  - Does not contain the navbar or footer; individual public pages add them.
- `app/globals.css`
  - Imports Tailwind CSS 4.
  - Defines basic background/foreground variables and a dark-mode media rule.
- `app/error.tsx`
  - Root client error boundary with a retry button.
- `next.config.ts`
  - Enables the React compiler.
  - Allows Next Image qualities 75 and 90.

### Shared public components

- `components/Navbar.tsx`
  - Main responsive navigation.
  - Reads the browser Supabase session and listens for auth changes.
  - Shows “Admin Panel” to every signed-in user; actual authorization happens
    after navigation in the admin layout.
- `components/Footer.tsx`
  - Institution summary, quick links, and contact details.
- `components/TopStripe.tsx`
  - Homepage-only social/contact strip with default placeholder social links.
- `components/CollegeBranding.tsx`
  - Homepage institution branding, logos, Hindi name, and establishment text.
- `components/MainImages.tsx`
  - Client-side homepage carousel with timer, arrows, dots, hover pause, and
    touch swipe.
- `components/NoticeCard.tsx`
  - Notice presentation and optional attachment link.
- `components/MaterialCard.tsx`
  - Study material metadata and download link.
- `components/ContactForm.tsx`
  - Controlled form that posts JSON to `/api/contact`.

### Reusable UI primitives

- `components/ui/Button.tsx`
- `components/ui/Card.tsx`
- `components/ui/Input.tsx`
- `components/ui/Textarea.tsx`
- `components/ui/Tabs.tsx`

These are small local primitives, not a third-party component library.

### Present but not wired into the active layout

- `components/admin/Sidebar.tsx`
  - An alternate responsive admin sidebar.
  - Contains stale links such as `/admin/study-materials`; the active route is
    `/admin/materials`.
- `components/auth/LoginForm.tsx`
  - Alternate browser-side Supabase login form.
  - The active `/login` page uses the server action form instead.

## 6. Database Model

The canonical TypeScript schema is `db/schema.ts`.

### `notices`

| Column | Meaning |
| --- | --- |
| `id` | Serial primary key |
| `title` | Required title |
| `content` | Required notice body |
| `category` | Expected: Academic, Events, Holidays, or General |
| `date` | Notice date |
| `attachment_url` | Optional public attachment URL |
| `created_at` | Insert timestamp |

### `study_materials`

| Column | Meaning |
| --- | --- |
| `id` | Serial primary key |
| `title` | Required title |
| `description` | Optional description |
| `file_url` | Required public download URL |
| `class` | Expected values 9, 10, 11, or 12 |
| `subject` | Subject label |
| `uploaded_at` | Insert timestamp |

### `contact_submissions`

| Column | Meaning |
| --- | --- |
| `id` | Serial primary key |
| `name` | Required sender name |
| `email` | Required sender email |
| `phone` | Optional phone |
| `message` | Required message |
| `status` | Expected: pending, read, or resolved |
| `created_at` | Insert timestamp |

### `users`

| Column | Meaning |
| --- | --- |
| `id` | UUID matching `auth.users.id` by convention |
| `email` | User email |
| `role` | `student` by default; `admin` unlocks admin pages |
| `created_at` | Insert timestamp |

There are no database-level enums, foreign keys, check constraints, indexes
beyond primary keys, or uniqueness constraints in the current Drizzle schema.

### Migrations

- `drizzle/0000_neat_toad.sql` is the only generated migration visible in the
  working tree.
- `drizzle.config.ts` reads `DATABASE_URL`, uses `db/schema.ts`, and writes
  generated migrations to `drizzle/`.
- `.gitignore` currently ignores `drizzle/`, even though migration files are
  already tracked.

Important: the existing initial migration does not contain the newer
`notices.attachment_url` column that is present in `db/schema.ts`. A fresh
migration should be generated and committed before relying on attachments in a
database created only from the tracked migration.

## 7. Supabase Integration

### Clients

- `lib/supabase/client.ts`
  - Browser client.
  - Used by Navbar, direct storage uploads, and the unused LoginForm.
- `lib/supabase/server.ts`
  - Cookie-aware server client.
  - Used by server actions, admin guards, and API routes.
  - Wraps Supabase fetch calls with a 60-second timeout.
- `utils/supabase/middleware.ts`
  - Refreshes auth cookies for matched requests.
  - Redirects unauthenticated `/admin*` requests to `/login`.
- `middleware.ts`
  - Connects the utility to Next.js middleware and excludes static/image files.

### Storage

- Required bucket name: `study-materials`.
- Current UI expects the bucket/files to be publicly readable.
- `materials/` is used for study materials.
- `notices/` is used for notice attachments.
- `lib/supabase/storage.ts` contains both upload and delete helpers, but no
  current UI calls `deleteFile`.

## 8. Server Actions

### `app/auth/actions.ts`

- `login`
  - Signs in through Supabase and redirects to `/`.
- `signup`
  - Creates the Supabase Auth user.
  - Inserts a `users` row with role `student`.
  - Does not roll back the Auth user if the database insert fails.
- `signout`
  - Signs out and redirects to `/login`.

### `app/admin/actions.ts`

- `addNotice`
  - Requires an authenticated user whose database role is `admin`.
  - Creates a notice and revalidates public/admin routes.
- `saveMaterial`
  - Requires the same admin check.
  - Saves a URL previously uploaded by the browser.
- `resolveQuery`
  - Requires the same admin check.
  - Changes a contact submission status to `resolved`.

## 9. Content and Static Assets

The `public/` directory contains all current branding, gallery, and carousel
images:

- `maa.png`
- `up-board-logo.png`
- `college_gate.jpg`
- `college_rooms.jpg`
- `college_parking.jpg`
- `college_middle_view.jpg`
- `group_photo.jpg`
- Portrait variants and `principle_image.jpg`

When replacing an image, check all three likely consumers:

1. `components/MainImages.tsx`
2. `app/gallery/page.tsx`
3. `app/page.tsx` or `components/CollegeBranding.tsx`

Institution facts and contact details are currently duplicated across
`app/page.tsx`, `app/contact/page.tsx`, `components/TopStripe.tsx`,
`components/CollegeBranding.tsx`, and `components/Footer.tsx`.

## 10. Environment Variables

Required by the code:

```env
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Used by the homepage server-to-server API fetch:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

`README.md` also documents `SUPABASE_SERVICE_ROLE_KEY`, but the current source
code does not use it.

Do not commit `.env` or `.env.local`; both are ignored.

## 11. Development Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm db:generate
pnpm db:push
pnpm db:studio
```

Type-check independently with:

```bash
pnpm exec tsc --noEmit
```

The current `lint` script is `next lint`. Next.js 16 no longer provides the
historical `next lint` command, so linting should be changed to an ESLint CLI
command before treating `pnpm lint` as a reliable validation step.

The current `pnpm-workspace.yaml` contains placeholder `allowBuilds` values
(`set this to true or false`). Verify or replace these values if dependency
build approval causes install/runtime problems.

## 12. Where to Make Common Changes

| Change requested | Start here | Also inspect |
| --- | --- | --- |
| Homepage layout/content | `app/page.tsx` | `CollegeBranding`, `MainImages`, `TopStripe` |
| Main navigation | `components/Navbar.tsx` | All public routes |
| School name/contact facts | Branding/Footer/TopStripe/contact page | Homepage metadata and copy |
| Subject curriculum | `app/subjects/page.tsx` | `components/ui/Tabs.tsx` |
| Gallery images | `app/gallery/page.tsx` | `public/` |
| Notice display | `app/notices/page.tsx`, `NoticeCard.tsx` | `/api/notices` |
| Notice creation | `app/admin/notices/page.tsx` | `addNotice`, storage helper, schema |
| Resource display | `app/resources/page.tsx`, `MaterialCard.tsx` | `/api/study-materials` |
| Material upload | `app/admin/materials/page.tsx` | `saveMaterial`, storage helper |
| Contact form | `ContactForm.tsx` | `/api/contact`, schema |
| Contact administration | `app/admin/contact/page.tsx` | `resolveQuery` |
| Login/register behavior | `app/(auth)/*`, `app/auth/actions.ts` | Supabase clients, middleware |
| Admin permissions | `app/admin/layout.tsx` | Every write API and server action |
| Database fields | `db/schema.ts` | Generate a Drizzle migration |
| Theme/UI primitives | `app/globals.css`, `components/ui/` | Inline styles across pages |

## 13. Known Risks and Maintenance Notes

These observations describe the reviewed code; they are not fixes applied by
this index.

### Authorization is inconsistent

- `app/admin/layout.tsx` and admin server actions require `users.role ===
  "admin"`.
- Write methods in `/api/notices`, `/api/study-materials`, and
  `/api/admin/contacts` only require a valid session, not an admin role.
- Therefore a signed-in `student` can potentially call those APIs directly.
- `/api/upload` also accepts any authenticated user.

Future admin work should centralize and reuse a server-side admin assertion in
every privileged action and route handler.

### Two contact administration screens exist

- `/admin/contact` is linked from the active layout and uses server rendering.
- `/admin/contacts` is a richer client screen backed by an API.

Choose one canonical route before extending this feature to avoid duplicated
behavior.

### Two upload implementations exist

- Active forms call Supabase Storage directly from the browser.
- `/api/upload` uploads on the server and validates a 10 MB limit.

The direct path relies heavily on bucket RLS policies and does not apply the
server route's size validation.

### Database migration drift

`attachment_url` exists in the TypeScript schema but not in the tracked initial
migration. Schema changes should always be paired with generated migrations.

### Notice ordering

`/api/notices` orders by `date` ascending. The homepage then takes the first
three entries, which produces the oldest notices rather than the latest ones.

### Static institutional facts conflict

Establishment years differ:

- Homepage: 1994
- College branding: 1992
- Footer: 1966

Phone numbers and email addresses also differ between TopStripe, contact page,
and footer. Move these values into one config module after confirming the
correct official data.

### Registration is publicly available

Any visitor can create a `student` account through `/register`. Confirm whether
student accounts are an intended product feature; current public features do
not otherwise require a student login.

### Navbar role presentation

Every authenticated user sees an “Admin Panel” link. Non-admin users are later
redirected home by the admin layout. If student login remains supported, the
navbar should use role-aware presentation.

### Error and logging cleanup

- `app/error.tsx` includes a localhost-specific production error message.
- `lib/supabase/server.ts` logs every Supabase fetch URL.
- Upload routes log file information and public URLs.
- Login/register pages suppress action typing with `@ts-ignore`.

Review these before production hardening.

### No automated tests

No unit, integration, or browser test suite is currently present. At minimum,
future work should manually verify public pages, auth redirects, role rejection,
contact submission, notice creation, and material upload.

## 14. Recommended Validation Loop

For normal changes:

```bash
pnpm exec tsc --noEmit
pnpm build
git diff --check
```

For database changes:

```bash
pnpm db:generate
# Review the generated SQL before applying it.
pnpm db:push
```

For auth/admin changes, test all three states:

1. Signed out.
2. Signed in with `student` role.
3. Signed in with `admin` role.

For storage changes, verify file-type and size handling, bucket policies,
successful public download, and deletion/cleanup behavior.

## 15. Working Tree Note

At the time this index was created, the repository already had extensive
uncommitted modifications across most source files. Treat those changes as the
current working baseline and inspect `git diff` carefully before editing,
committing, or reverting anything.
