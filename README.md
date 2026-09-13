# MoveWell Physiotherapy

Next.js 14 (App Router) + Tailwind CSS. Fully working frontend flow with
mock data — no database required to run. Backend connection points are
marked with TODO comments.

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000 — homepage, `/recommend` (smart questionnaire),
`/book` (full booking flow), `/admin` (appointment dashboard).

## What's real vs. mock right now

**Real (frontend logic, works as-is):**
- Pain-point selection with dynamic causes/treatments/services
- 5-step smart questionnaire producing a recommendation
- 6-step booking flow: type → therapist → date → time → details → confirmation
- Form validation (name, email format, phone format, terms checkbox)
- Mock slot availability (deterministic, so some slots always show as booked)
- Booking reference generation, add-to-calendar link, reschedule/cancel/return actions
- Admin dashboard with filters by date, therapist, pain point, status; inline status updates

**Mock — needs a real backend before launch:**
- `/api/book` just logs the payload and returns success — no database write yet
- No confirmation email or admin notification is actually sent
- Admin dashboard reads/writes an in-memory array (`lib/data.ts` → `SEED_BOOKINGS`), resets on refresh, and has no login/auth
- Slot availability is a deterministic mock formula, not real scheduling data

## Two-day sprint to publish

**Day 1 — backend & data**
- Stand up Postgres (Supabase or Neon) with tables for `bookings`,
  `therapists`, `services`, `availability`
- Wire `/api/book` to insert a real row, checking slot availability inside
  a transaction to prevent double bookings
- Add confirmation email (Resend/Postmark) and an admin notification
  (email or Slack webhook)
- Replace `SEED_BOOKINGS` and the pain point/therapist/service arrays in
  `lib/data.ts` with real content and a DB fetch where appropriate
- Push to GitHub, deploy to Vercel, connect your domain

**Day 2 — admin, polish, launch**
- Add a login gate to `/admin` (simple password auth is enough to start)
- Point the admin table at real bookings instead of the in-memory seed
- Replace testimonials, stats, and clinic contact details with real content
- Add the real Google Maps embed in the contact section
- Mobile QA on real devices, analytics (Plausible/GA4), favicon, meta/OG image
- Final review, then go live

## Structure

```
app/
  page.tsx              — homepage (hero, pain points, services, about, testimonials, contact)
  recommend/page.tsx    — 5-step smart questionnaire
  book/page.tsx          — 6-step booking flow
  admin/page.tsx         — appointment dashboard (mock data, no auth yet)
  api/book/route.ts      — booking submission endpoint (stub, see TODOs)
components/              — Header, Hero, PainPointSelector, sections, Footer
lib/data.ts               — all mock content: pain points, appointment types,
                             therapists, slots, services, testimonials, bookings
```

## Notes on the reference image

Layout, spacing, card style, and mobile composition follow the reference
screenshot's structure (rounded cards, generous spacing, single-column
mobile flow with a sticky progress bar in booking). Branding, copy, and
color tokens were made original for MoveWell (teal/beige/accent palette
defined in `tailwind.config.ts`).
