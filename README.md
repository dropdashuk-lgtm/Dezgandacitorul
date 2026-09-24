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

Fără variabilele de mediu Supabase completate, site-ul public funcționează (formularele de programare
și contact răspund cu succes, dar cererile sunt doar logate în consolă, nu persistate), însă `/admin` și
`/cont` necesită Supabase configurat pentru autentificare. Fără `RESEND_API_KEY`, emailurile nu sunt
trimise. Vezi `lib/supabase/server.ts` și `lib/email.ts`.

> Proiectul Supabase live pentru acest site rulează schema din `supabase/schema.sql` (tabele `dz_*`,
> prefixate pentru că baza e partajată cu o altă aplicație). Cere URL-ul, anon key și service role key
> administratorului proiectului pentru `.env.local` / variabilele de mediu din Vercel.

## Structură

```text
app/                          pagini publice: homepage, servicii, agricultura, firme, programare...
app/admin/login                autentificare admin (fără layout admin)
app/admin/(dashboard)          dashboard admin protejat: /admin, /preturi, /clienti, /clienti/[id], /cereri
app/cont/login, /inregistrare  autentificare + înregistrare client (fără layout cont)
app/cont/(dashboard)           cont client protejat: /cont, /cereri
app/api/                       route handlers: bookings, contact, cont/profile, urgent-requests,
                                admin/services, admin/documents, admin/urgent-requests/[id]
components/                    UI, layout, booking stepper, secțiuni homepage, auth, admin, cont
lib/                           date statice, clienți Supabase (browser/server/admin), email, rate-limit, auth guards
middleware.ts                  protejează /admin și /cont (sesiune + rol ADMIN pentru /admin)
types/                         tipuri TypeScript comune
supabase/schema.sql            schema completă a bazei de date (tabele dz_*, RLS, storage buckets)
docs/MASTER_PLAN.md            documentul complet de produs
```

## Autentificare & roluri

- **Admin**: `admin@dezgandacitorul.ro`, creat direct în Supabase Auth (parolă generată — cere-o
  administratorului sesiunii care a provizionat contul; nu e stocată în acest repo). Autentificare la
  `/admin/login`. Rolul `ADMIN` este ținut în `dz_profiles.role`.
- **Clienți**: se înregistrează singuri la `/cont/inregistrare` (email + parolă). La prima intrare li se
  cere să completeze profilul (nume, telefon, adresă), care creează rândul din `dz_customers` legat de
  contul lor.

## Funcționalități cont client / admin

- **Prețuri estimative** — adminul le editează din `/admin/preturi` (`dz_service_types.base_price` +
  `price_note`); paginile publice (`/preturi`, `/servicii/[slug]`) le preiau live, cu revalidare la 5 minute,
  și cad pe valorile statice din `lib/data/services.ts` dacă Supabase nu e disponibil.
- **Documente & contracte per client** — adminul încarcă documente (contract, factură, raport etc.) per
  client din `/admin/clienti/[id]`, stocate privat în bucket-ul `dz-documents`. Clientul le vede și le
  descarcă din `/cont`, prin URL-uri semnate (expiră după o oră).
- **Cereri urgente** — clientul autentificat poate cere din `/cont/cereri` documente sau o intervenție
  urgentă; adminul le vede și le actualizează statusul (Nouă / În lucru / Rezolvată) din `/admin/cereri`.

## Stadiu (Sprint 1-2, conform roadmap din MASTER_PLAN.md §49)

Implementat:

- Homepage complet, pagini servicii (inclusiv ploșnițe), agricultură, firme, prețuri, zone, ghiduri, FAQ,
  contact, urgențe
- Booking funcțional (`/programare`) cu upload foto, legat automat de contul clientului dacă e autentificat
- Autentificare completă (Supabase Auth) pentru admin și clienți, cu RLS pe toate tabelele sensibile
- Admin: dashboard cu KPI reale, gestionare prețuri, listă clienți + documente per client, cereri urgente
- Cont client: dashboard cu programări, documente, cereri urgente
- SEO de bază: metadata, sitemap.xml, robots.txt, JSON-LD

Rămas de făcut pentru lansare (vezi §67 Definition of Done din master plan):

- Analytics (Google Analytics, Search Console, Microsoft Clarity)
- Texte juridice finale (confidențialitate, cookies, termeni) — verificate juridic
- Notificări automate (SMS/WhatsApp) pentru schimbări de status ale programării
- Testare completă end-to-end și backup pentru baza de date
