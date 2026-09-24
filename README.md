# Dezgandacitorul.ro

Platformă web pentru servicii de deratizare, dezinsecție și dezinfecție — București, Ilfov și zonele adiacente.
Documentul complet de produs este în [`docs/MASTER_PLAN.md`](./docs/MASTER_PLAN.md).

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (Postgres, Auth, Storage) — vezi [`supabase/schema.sql`](./supabase/schema.sql)
- Resend (email tranzacțional)

## Setup local

```bash
npm install
cp .env.local.example .env.local   # completează valorile Supabase / Resend
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000).

Fără variabilele de mediu Supabase/Resend completate, aplicația rulează normal — formularele de
programare și contact răspund cu succes, dar cererile sunt doar logate în consolă (nu sunt persistate)
și emailurile nu sunt trimise. Vezi `lib/supabase/server.ts` și `lib/email.ts`.

## Structură

```text
app/                 pagini (App Router): homepage, servicii, agricultura, firme, programare, admin, cont...
app/api/             route handlers: /api/bookings, /api/contact
components/          componente UI, layout, booking stepper, secțiuni homepage
lib/                 utilitare, date statice (servicii/zone/FAQ/ghiduri), client Supabase, email, rate-limit
types/               tipuri TypeScript comune
supabase/schema.sql  schema inițială a bazei de date (tabele + RLS)
docs/MASTER_PLAN.md  documentul complet de produs
```

## Stadiu (Sprint 1 — Fundament + Website, conform roadmap din MASTER_PLAN.md §49)

Implementat:

- Homepage complet (hero, widget de programare, servicii, ploșnițe, cum funcționează, zone, de ce noi,
  agricultură, B2B, recenzii, FAQ, CTA final)
- Pagini servicii (`/servicii`, `/servicii/[slug]`), inclusiv pagina specială ploșnițe
- Widget/pagină de programare funcțional(ă) (`/programare`), cu upload foto și trimitere spre `/api/bookings`
- Pagini agricultură, firme, prețuri, zone (+ pagini per zonă), urgențe, despre noi, ghiduri, contact, FAQ
- Mockup-uri pentru `/cont` și `/admin` (fără autentificare încă)
- Schema inițială Supabase cu RLS de bază
- SEO de bază: metadata, sitemap.xml, robots.txt, JSON-LD (LocalBusiness, Service, FAQPage)

Rămas de făcut pentru lansare (vezi §67 Definition of Done din master plan):

- Conectarea reală a proiectului Supabase (rulare `supabase/schema.sql`, bucket `booking-photos`)
- Autentificare (Supabase Auth) pentru `/cont` și `/admin`, cu RLS complet
- Analytics (Google Analytics, Search Console, Microsoft Clarity)
- Texte juridice finale (confidențialitate, cookies, termeni) — verificate juridic
- Testare completă a formularelor și backup pentru baza de date
