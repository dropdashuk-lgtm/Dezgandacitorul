# Dezgandacitorul.ro — Master Plan Website & Web App

## 1. Viziunea proiectului

**Dezgandacitorul.ro** va fi o platformă modernă pentru servicii de:

- deratizare;
- dezinsecție;
- dezinfecție;
- tratamente împotriva ploșnițelor;
- intervenții pentru locuințe;
- intervenții pentru firme și spații comerciale;
- abonamente recurente;
- servicii pentru asociații de proprietari;
- protecție pentru vii;
- protecție pentru livezi;
- servicii pentru ferme și alte suprafețe agricole.

Obiectivul nu este doar un site de prezentare, ci o experiență de tip aplicație:

> clientul intră → selectează problema → primește o estimare → alege data → lasă adresa și datele → trimite poze → primește confirmare → intervenția este administrată din dashboard.

---

# 2. Poziționare

## Brand

**Domeniu:** `dezgandacitorul.ro`

### Mesaj principal

> Scăpăm de dăunători. Rapid, discret și profesionist.

Alternative:

- „Probleme cu dăunătorii? Rezolvăm.”
- „De la ploșnițe la rozătoare. Intervenim rapid.”
- „Protecție pentru casă, afacere și agricultură.”
- „Programare simplă. Intervenție rapidă. Rezultate monitorizate.”

---

# 3. Avantaj competitiv

Platforma trebuie să fie mai ușor de folosit decât site-urile clasice DDD.

Diferențiatorii principali:

1. Programare online în 1–2 minute.
2. Estimare de preț înainte de apel.
3. Clientul poate încărca fotografii.
4. Diagnostic inițial în funcție de tipul dăunătorului.
5. Urmărirea programării.
6. Reprogramare online.
7. Confirmare prin SMS/email/WhatsApp.
8. Instrucțiuni înainte de intervenție.
9. Instrucțiuni după intervenție.
10. Follow-up automat după tratament.
11. Planuri recurente pentru firme.
12. Soluții speciale pentru agricultură.

---

# 4. Public țintă

## B2C

- apartamente;
- case;
- chiriași;
- proprietari;
- administratori de proprietăți;
- persoane cu infestări de ploșnițe;
- persoane cu gândaci;
- persoane cu șoareci/șobolani;
- proprietari de curți.

## B2B

- restaurante;
- hoteluri;
- pensiuni;
- depozite;
- magazine;
- birouri;
- clinici;
- saloane;
- săli de fitness;
- Airbnb;
- companii de property management;
- asociații de proprietari.

## Agricultură

- vii;
- livezi;
- ferme;
- sere;
- depozite agricole;
- spații de procesare;
- ferme de animale;
- terenuri agricole.

---

# 5. Zone inițiale

## Faza 1

- București — toate sectoarele;
- Ilfov.

## Faza 2

Extindere spre zonele adiacente:

- Otopeni;
- Voluntari;
- Pipera;
- Chiajna;
- Popești-Leordeni;
- Bragadiru;
- Măgurele;
- Pantelimon;
- Buftea;
- Tunari;
- Corbeanca;
- Domnești;
- Clinceni;
- Berceni;
- Afumați;
- Balotești;
- Snagov.

## Faza 3

Extindere regională după volum și profitabilitate.

---

# 6. Structura website-ului

## Pagini principale

```text
/
├── servicii
│   ├── plosnite
│   ├── gandaci
│   ├── rozatoare
│   ├── furnici
│   ├── purici
│   ├── capuse
│   ├── tantari
│   ├── molii
│   ├── viespi
│   ├── deratizare
│   ├── dezinsectie
│   └── dezinfectie
│
├── agricultura
│   ├── vii
│   ├── livezi
│   ├── ferme
│   ├── sere
│   └── depozite-agricole
│
├── firme
│   ├── restaurante
│   ├── hoteluri
│   ├── depozite
│   ├── birouri
│   ├── magazine
│   └── asociatii-proprietari
│
├── preturi
├── zone
├── programare
├── urgente
├── despre-noi
├── ghiduri
├── intrebari-frecvente
├── contact
├── cont
└── admin
```

---

# 7. Homepage

Homepage-ul trebuie să fie construit pentru conversie.

## HERO

Titlu mare:

> Scapă de dăunători fără stres.

Subtitlu:

> Deratizare, dezinsecție și dezinfecție în București, Ilfov și zonele adiacente.

CTA principal:

**Programează intervenția**

CTA secundar:

**Sună acum**

CTA WhatsApp:

**Trimite poze pe WhatsApp**

---

# 8. Widget rapid de programare

În partea de sus a paginii trebuie să existe un modul tip aplicație.

## Pas 1 — Ce problemă ai?

Carduri:

- Ploșnițe
- Gândaci
- Șoareci / șobolani
- Furnici
- Purici
- Căpușe
- Viespi
- Țânțari
- Molii
- Dezinfecție
- Nu știu

## Pas 2 — Unde este problema?

- apartament;
- casă;
- restaurant;
- hotel;
- birou;
- magazin;
- depozit;
- asociație de proprietari;
- fermă;
- vie;
- livadă;
- alt tip.

## Pas 3 — Dimensiunea

Exemplu pentru locuințe:

- 1 cameră;
- 2 camere;
- 3 camere;
- 4+ camere;
- casă;
- suprafață în m².

## Pas 4 — Nivelul problemei

- am observat 1–2;
- apar frecvent;
- infestare serioasă;
- nu știu.

## Pas 5 — Locația

- București;
- Ilfov;
- altă localitate.

Câmp:

`Cod poștal / localitate`

## Pas 6 — Data

Calendar cu:

- astăzi;
- mâine;
- această săptămână;
- aleg altă dată.

## Pas 7 — Poze

Upload:

- JPG;
- PNG;
- HEIC.

Maximum recomandat:

5 imagini.

## Pas 8 — Date client

- nume;
- telefon;
- email;
- adresă;
- observații.

## Final

Buton:

> Cere confirmarea programării

---

# 9. Modul special — Ploșnițe

Aceasta trebuie să fie una dintre cele mai puternice landing page-uri.

URL:

`/servicii/plosnite`

## Hero

> Ai ploșnițe? Nu amâna tratamentul.

CTA:

**Programează tratamentul**

## Secțiuni

### Cum îți dai seama

- mușcături;
- pete pe saltea;
- insecte în jurul patului;
- ouă;
- urme în mobilier.

### Cum funcționează intervenția

1. Evaluare.
2. Pregătirea camerei.
3. Primul tratament.
4. Monitorizare.
5. Al doilea tratament dacă este necesar.
6. Follow-up.

### Upload foto

> Nu ești sigur că sunt ploșnițe? Trimite-ne o fotografie.

### Ghid înainte de tratament

Clientul primește automat checklist.

Exemplu:

- spală anumite textile;
- eliberează accesul în anumite zone;
- nu muta obiectele infestate în alte camere;
- urmează instrucțiunile primite pentru tratamentul ales.

### FAQ SEO

Exemple:

- Cum scap de ploșnițe?
- Câte tratamente sunt necesare?
- Pot reveni ploșnițele?
- De unde apar?
- Trebuie să arunc salteaua?
- Cât durează tratamentul?
- Când pot reveni în locuință?

---

# 10. Modul agricultură

URL:

`/agricultura`

Titlu:

> Protecție profesională pentru vii, livezi și ferme.

## Categorii

### Vii

- monitorizare;
- tratamente împotriva dăunătorilor;
- consultanță pentru intervenții;
- tratamente punctuale;
- contract sezonier.

### Livezi

- pomi fructiferi;
- monitorizare dăunători;
- intervenții programate;
- plan sezonier.

### Ferme

- rozătoare;
- insecte;
- depozite;
- silozuri;
- zone de hrană;
- clădiri tehnice.

### Sere

- insecte;
- monitorizare;
- tratamente adaptate;
- contract periodic.

---

# 11. Formular agricultură

Câmpuri:

- tip proprietate;
- suprafață;
- tip cultură;
- localitate;
- problemă observată;
- upload poze;
- telefon;
- email;
- descriere.

CTA:

> Cere evaluare

Pentru suprafețe mari nu trebuie afișat automat un preț fix.

Status:

> Cererea va fi evaluată înainte de ofertare.

---

# 12. Modul pentru firme

## Beneficii

- contracte lunare;
- documentație;
- intervenții recurente;
- istoric intervenții;
- locații multiple;
- facturare;
- raport lunar;
- reminder automat.

## Portal client business

Firma poate vedea:

- locațiile;
- intervențiile;
- programările;
- rapoartele;
- facturile;
- documentele;
- următoarea intervenție.

---

# 13. Model de preț

Site-ul poate folosi trei metode.

## A. Preț fix

Pentru intervenții standard.

Exemplu:

```text
Garsonieră
2 camere
3 camere
4 camere
Casă
```

## B. De la...

Exemplu:

> Tratament ploșnițe de la X lei.

## C. Ofertă personalizată

Pentru:

- ferme;
- vii;
- livezi;
- depozite;
- clădiri mari;
- infestări complexe.

---

# 14. Cont client

Clientul poate avea cont.

## Dashboard

```text
Bun venit, Alex

Următoarea intervenție
25 septembrie
14:00–16:00

Status:
CONFIRMATĂ

[Vezi programarea]
[Reprogramează]
[Contactează echipa]
```

## Clientul poate vedea

- programări;
- status;
- istoric;
- facturi;
- fotografii;
- recomandări;
- instrucțiuni;
- mesaje;
- documente.

---

# 15. Status intervenție

Flux recomandat:

```text
CERERE NOUĂ
↓
ÎN EVALUARE
↓
OFERTĂ TRIMISĂ
↓
CONFIRMATĂ
↓
TEHNICIAN ALOCAT
↓
ÎN DRUM
↓
INTERVENȚIE ÎN DESFĂȘURARE
↓
FINALIZATĂ
↓
FOLLOW-UP
↓
ÎNCHISĂ
```

---

# 16. Dashboard admin

URL:

`/admin`

## KPI

- cereri azi;
- programări azi;
- intervenții finalizate;
- venit azi;
- venit luna curentă;
- clienți noi;
- clienți recurenți;
- servicii cele mai cerute;
- zone cele mai cerute.

## Module

### Leads

- nume;
- telefon;
- serviciu;
- zonă;
- dată;
- status.

### Jobs

- ID;
- client;
- serviciu;
- tehnician;
- adresă;
- dată;
- status;
- valoare.

### Customers

CRM simplu.

### Technicians

- nume;
- telefon;
- disponibilitate;
- zone;
- servicii;
- lucrări.

### Calendar

Drag & drop pentru programări.

### Pricing

Adminul poate modifica prețurile.

### Locations

Zone de acoperire.

### Content

Editare:

- FAQ;
- ghiduri;
- articole;
- servicii.

---

# 17. Aplicație tehnician

Poate fi inițial PWA, fără aplicație Android/iOS separată.

## Tehnicianul vede

- joburile zilei;
- client;
- adresă;
- telefon;
- tip intervenție;
- instrucțiuni;
- poze client.

## Butoane

- Acceptă job;
- Pornește spre client;
- Am ajuns;
- Începe intervenția;
- Finalizează.

## La final

- upload poze;
- produse/proceduri utilizate;
- observații;
- recomandări;
- semnătură client;
- data follow-up.

---

# 18. Notificări

## Client

Email/SMS/WhatsApp:

### Cerere primită

> Am primit solicitarea ta.

### Programare confirmată

> Intervenția este confirmată.

### Cu 24h înainte

> Mâine avem programarea.

### Tehnician în drum

> Echipa se îndreaptă către locația ta.

### După intervenție

> Intervenția a fost finalizată.

### Follow-up

> Cum este situația după tratament?

---

# 19. WhatsApp

WhatsApp trebuie să fie foarte vizibil.

CTA:

> Trimite o poză

Mesaj precompletat:

> Bună ziua. Am o problemă cu dăunători și aș dori o evaluare.

---

# 20. SEO

SEO local este una dintre cele mai importante surse de clienți.

## Keyword clusters

### Ploșnițe

- dezinsecție ploșnițe București;
- tratament ploșnițe București;
- firmă ploșnițe București;
- exterminare ploșnițe;
- scăpat de ploșnițe.

### Gândaci

- dezinsecție gândaci București;
- firmă dezinsecție București;
- gândaci apartament București.

### Rozătoare

- deratizare București;
- deratizare Ilfov;
- firmă deratizare.

### General

- DDD București;
- firmă DDD București;
- deratizare dezinsecție dezinfecție București.

---

# 21. Landing pages locale

Trebuie create pagini reale, utile și diferențiate.

Exemple:

```text
/dezinsectie-sector-1
/dezinsectie-sector-2
/dezinsectie-sector-3
/dezinsectie-sector-4
/dezinsectie-sector-5
/dezinsectie-sector-6

/deratizare-sector-1
...

/dezinsectie-otopeni
/dezinsectie-voluntari
/dezinsectie-pipera
/dezinsectie-popesti-leordeni
```

Nu se recomandă duplicarea mecanică a aceluiași text.

Fiecare pagină trebuie să conțină informații relevante pentru zona respectivă.

---

# 22. Ghiduri SEO

Secțiune:

`/ghiduri`

Primele articole:

1. Cum îți dai seama dacă ai ploșnițe.
2. De unde apar ploșnițele.
3. Cum scapi de ploșnițe.
4. De ce reapar gândacii.
5. Ce atrage gândacii în apartament.
6. Cum identifici urmele de șoareci.
7. Diferența dintre deratizare și dezinsecție.
8. Ce trebuie făcut înainte de dezinsecție.
9. Ce trebuie făcut după dezinsecție.
10. Cum protejezi un restaurant de dăunători.

---

# 23. Homepage — structură completă

```text
HEADER
↓
HERO
↓
BOOKING WIDGET
↓
SERVICII
↓
PLOȘNIȚE — secțiune specială
↓
CUM FUNCȚIONEAZĂ
↓
ZONE
↓
DE CE NOI
↓
AGRICULTURĂ
↓
B2B
↓
RECENZII
↓
FAQ
↓
CTA FINAL
↓
FOOTER
```

---

# 24. Design system

## Stil

- modern;
- premium;
- foarte curat;
- simplu;
- prietenos;
- profesional;
- mobile-first.

## Culori

### Principal

Verde închis:

`#0B5D3B`

### Verde secundar

`#1F8A55`

### Accent

Portocaliu:

`#FF5A1F`

### Background

`#F7FAF8`

### Text

`#17201C`

---

# 25. Fonturi

Recomandări:

- Inter;
- Manrope;
- DM Sans;
- Plus Jakarta Sans.

Recomandare:

**Manrope + Inter**

---

# 26. UI components

Construim componente reutilizabile:

```text
Button
Input
Select
Card
Modal
Badge
Tabs
Accordion
Calendar
Upload
Toast
Breadcrumb
PriceCard
ServiceCard
LocationCard
ReviewCard
TechnicianCard
BookingStepper
StatusBadge
```

---

# 27. Tech stack

## Frontend

- Next.js;
- TypeScript;
- Tailwind CSS;
- shadcn/ui.

## Hosting

- Vercel.

## Database

- Supabase PostgreSQL.

## Authentication

- Supabase Auth.

## Storage

- Supabase Storage.

Pentru:

- fotografii;
- documente;
- rapoarte.

## Email

- Resend.

## SMS

Faza 2:

- Twilio;
- alt provider local/european.

## Payments

Faza 2:

- Stripe.

---

# 28. Structură repo

```text
dezgandacitorul/
│
├── app/
│   ├── page.tsx
│   ├── servicii/
│   ├── agricultura/
│   ├── firme/
│   ├── preturi/
│   ├── programare/
│   ├── cont/
│   └── admin/
│
├── components/
│
├── lib/
│
├── public/
│
├── types/
│
├── supabase/
│
├── docs/
│
├── .env.local
├── README.md
└── MASTER_PLAN.md
```

---

# 29. Database — tabele inițiale

## users

```text
id
email
phone
role
created_at
```

## customers

```text
id
user_id
name
phone
email
address
city
county
postal_code
created_at
```

## service_types

```text
id
name
slug
category
base_price
active
```

## bookings

```text
id
customer_id
service_type_id
property_type
infestation_level
address
city
preferred_date
preferred_time
notes
status
quoted_price
final_price
technician_id
created_at
```

## booking_photos

```text
id
booking_id
file_url
created_at
```

## technicians

```text
id
name
phone
email
active
```

## jobs

```text
id
booking_id
technician_id
status
started_at
completed_at
notes
```

## invoices

```text
id
customer_id
booking_id
amount
status
issued_at
paid_at
```

## reviews

```text
id
customer_id
booking_id
rating
comment
approved
created_at
```

---

# 30. Tipuri utilizatori

```text
CUSTOMER
BUSINESS
TECHNICIAN
DISPATCHER
ADMIN
```

---

# 31. Booking API

Endpoints propuse:

```text
POST /api/bookings
GET /api/bookings/:id
PATCH /api/bookings/:id

POST /api/bookings/:id/photos

POST /api/quotes
POST /api/contact

GET /api/services
GET /api/locations

GET /api/customer/bookings

GET /api/admin/bookings
PATCH /api/admin/bookings/:id/status
```

---

# 32. Lead scoring

Platforma poate prioritiza automat cererile.

Exemplu:

### Prioritate mare

- ploșnițe;
- restaurant;
- hotel;
- infestare severă;
- solicitare urgentă.

### Prioritate medie

- gândaci;
- rozătoare;
- firmă.

### Prioritate normală

- consultanță;
- prevenție;
- ofertă viitoare.

---

# 33. Quote engine

Exemplu logică:

```text
base_price
+
property_size
+
infestation_level
+
location_fee
+
urgency_fee
+
optional_services
=
estimated_price
```

Pentru agricultură:

```text
manual_quote = true
```

---

# 34. Analytics

Instalăm de la început:

- Google Analytics;
- Google Search Console;
- Microsoft Clarity;
- Meta Pixel dacă rulăm reclame Meta.

Events:

```text
booking_started
booking_completed
phone_clicked
whatsapp_clicked
quote_requested
photo_uploaded
agriculture_lead
business_lead
```

---

# 35. Google Business Profile

Important pentru SEO local.

Trebuie optimizat cu:

- servicii;
- fotografii;
- telefon;
- website;
- program;
- zone;
- review-uri;
- postări regulate.

CTA către:

`dezgandacitorul.ro/programare`

---

# 36. Review system

După intervenție:

SMS/email:

> Cum a fost experiența ta?

Dacă clientul este mulțumit:

CTA:

> Lasă o recenzie

Recenziile trebuie colectate constant.

---

# 37. Google Ads

Primele campanii pot fi foarte targetate.

## Campaign 1

**Ploșnițe București**

Keywords:

```text
tratament plosnite bucuresti
dezinsectie plosnite
firma plosnite bucuresti
scap de plosnite
```

Landing page:

`/servicii/plosnite`

## Campaign 2

**Deratizare București**

Landing:

`/servicii/deratizare`

## Campaign 3

**Dezinsecție București**

Landing:

`/servicii/dezinsectie`

---

# 38. Meta Ads

Campanii bune pentru awareness și remarketing.

Exemple creative:

> Te trezești cu mușcături și nu știi de unde?

CTA:

**Verifică dacă ai ploșnițe**

---

# 39. Lead magnet

Putem avea:

> Ghid gratuit: 7 semne că ai ploșnițe.

Clientul lasă:

- email;
- telefon opțional.

---

# 40. AI assistant — Faza 2

Chat:

> Spune-ne ce problemă ai.

AI poate pune întrebări:

- Ce insectă ai observat?
- Unde ai văzut-o?
- De câte ori?
- Ai fotografii?
- Apartament sau casă?

AI nu trebuie să promită identificare 100%.

CTA final:

> Recomandăm o evaluare profesională.

---

# 41. Fotografii

Site-ul trebuie să arate oameni reali și echipament profesional.

Categorii foto:

- tehnician în uniformă;
- apartament;
- restaurant;
- echipament;
- tratament exterior;
- livadă;
- vie;
- fermă.

Trebuie evitate imaginile excesiv de dezgustătoare în homepage.

---

# 42. Trust signals

Homepage:

- firmă autorizată;
- tehnicieni instruiți;
- programări rapide;
- soluții profesionale;
- suport după intervenție;
- servicii pentru persoane și companii.

Dacă există certificări, autorizații sau acreditări concrete, acestea trebuie afișate numai după verificare.

---

# 43. Pagina „De ce noi”

Secțiuni:

- experiență;
- rapiditate;
- transparență;
- comunicare;
- tratamente adaptate;
- follow-up;
- clienți rezidențiali;
- clienți business;
- agricultură.

---

# 44. FAQ general

Exemple:

- În cât timp puteți veni?
- Cât costă o intervenție?
- Trebuie să plec din casă?
- Este nevoie de mai multe intervenții?
- Pot programa online?
- Lucrați în Ilfov?
- Lucrați cu firme?
- Aveți contracte recurente?
- Tratați ferme?
- Tratați vii și livezi?

---

# 45. Mobile-first

Majoritatea clienților vor intra de pe telefon.

Trebuie să avem permanent jos:

```text
[Sună] [WhatsApp] [Programare]
```

---

# 46. Conversie

Scopul fiecărei pagini:

1. Sună.
2. WhatsApp.
3. Programare.
4. Cerere ofertă.

Nu trebuie să existe pagini fără CTA.

---

# 47. MVP

Versiunea 1 trebuie să includă:

- homepage;
- servicii;
- ploșnițe;
- gândaci;
- rozătoare;
- agricultură;
- firme;
- zone;
- contact;
- programare;
- upload poze;
- dashboard admin simplu;
- email confirmare;
- analytics;
- SEO de bază.

---

# 48. Ce NU construim în MVP

Pentru a lansa repede, nu construim inițial:

- aplicație Android;
- aplicație iOS;
- AI complex;
- rutare automată;
- plăți complexe;
- marketplace;
- abonamente avansate;
- algoritm de preț foarte complex.

---

# 49. Roadmap

## Săptămâna 1 — Fundament

- brand;
- logo;
- culori;
- structură;
- repo GitHub;
- proiect Next.js;
- Vercel;
- Supabase;
- database schema.

## Săptămâna 2 — Website

- homepage;
- servicii;
- ploșnițe;
- gândaci;
- rozătoare;
- agricultură;
- firme;
- contact.

## Săptămâna 3 — Booking app

- booking stepper;
- calendar;
- upload poze;
- salvare lead;
- email confirmare.

## Săptămâna 4 — Admin

- login admin;
- leads;
- bookings;
- calendar;
- status;
- clienți.

## Săptămâna 5 — SEO

- pagini zone;
- ghiduri;
- metadata;
- sitemap;
- schema markup;
- Search Console.

## Săptămâna 6 — Lansare

- test mobile;
- test booking;
- analytics;
- Google Business;
- reclame;
- lansare oficială.

---

# 50. Priorități lansare

Ordine:

```text
1. Homepage
2. Booking
3. Ploșnițe
4. Dezinsecție
5. Deratizare
6. Contact
7. Admin
8. SEO local
9. Agricultură
10. B2B
```

---

# 51. KPI primele 90 zile

Urmărim:

- vizitatori;
- lead-uri;
- apeluri;
- click WhatsApp;
- booking-uri;
- cost per lead;
- conversion rate;
- valoare medie job;
- clienți recurenți;
- review-uri Google.

---

# 52. Strategie de creștere

## Faza 1

București + Ilfov.

Focus:

- ploșnițe;
- gândaci;
- rozătoare.

## Faza 2

B2B.

Focus:

- restaurante;
- hoteluri;
- asociații;
- depozite.

## Faza 3

Agricultură.

Focus:

- vii;
- livezi;
- ferme;
- sere.

## Faza 4

Extindere regională.

---

# 53. Upsell

După o intervenție:

- monitorizare;
- a doua intervenție;
- prevenție;
- abonament;
- capcane;
- tratament exterior;
- inspecție periodică.

---

# 54. Abonamente business

Exemplu:

## Basic

- inspecție periodică;
- intervenții programate;
- raport.

## Professional

- intervenții recurente;
- prioritate;
- dashboard;
- documente.

## Enterprise

- locații multiple;
- SLA;
- manager dedicat;
- raportare centralizată.

---

# 55. Abonamente agricultură

Model sezonier:

- evaluare;
- plan;
- vizite;
- monitorizare;
- intervenții;
- raport.

---

# 56. Sistem referral

Clientul primește:

> Recomandă-ne unui prieten.

Beneficiu posibil:

- reducere;
- credit;
- serviciu suplimentar.

Structura exactă se stabilește comercial.

---

# 57. Pagina de urgență

URL:

`/urgente`

Titlu:

> Ai nevoie de intervenție rapidă?

CTA:

**Sună acum**

Servicii urgente:

- ploșnițe;
- viespi;
- rozătoare;
- infestări business;
- situații critice.

---

# 58. Sitemap SEO

Trebuie generat automat:

`/sitemap.xml`

Plus:

`/robots.txt`

---

# 59. Structured data

Schema.org:

- LocalBusiness;
- Service;
- FAQPage;
- BreadcrumbList;
- Review;
- AggregateRating — doar dacă există date reale și eligibile pentru afișare.

---

# 60. Performance

Ținte:

- pagină rapidă;
- imagini optimizate;
- lazy loading;
- Core Web Vitals bune;
- design fără animații grele.

---

# 61. Security

- rate limiting;
- validare upload;
- limită dimensiune fișiere;
- autentificare admin;
- RLS Supabase;
- protecție formulare spam;
- CAPTCHA unde este necesar;
- log-uri pentru acțiuni admin.

---

# 62. Privacy

Trebuie să existe:

- Politica de confidențialitate;
- Politica cookies;
- Termeni și condiții;
- consimțământ marketing separat;
- opțiune de ștergere/solicitare date;
- retenție controlată a fotografiilor și documentelor.

Textele finale juridice trebuie verificate înainte de lansare.

---

# 63. Componente pagină produs/serviciu

Template comun:

```text
Hero
↓
Simptome
↓
Cum identificăm problema
↓
Cum intervenim
↓
Preț / Ofertă
↓
Cum te pregătești
↓
După tratament
↓
FAQ
↓
Recenzii
↓
CTA
```

---

# 64. CTA-uri standard

### Primary

**Programează intervenția**

### Secondary

**Cere ofertă**

### Phone

**Sună acum**

### WhatsApp

**Trimite poze**

---

# 65. Prompt pentru Claude / AI coding assistant

```text
You are building Dezgandacitorul.ro, a modern Romanian pest-control
website and booking web application.

Stack:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Vercel
- Resend

Primary market:
Bucharest, Ilfov and adjacent areas.

Main services:
- pest control
- insect control
- disinfection
- bed bug treatments
- cockroach treatments
- rodent control
- business contracts
- agriculture: vineyards, orchards and farms

The product must feel like an application, not a traditional brochure website.

Primary conversion actions:
1. Book intervention
2. Call
3. WhatsApp
4. Request quote

Build mobile-first.

Create reusable components.

Do not hard-code operational data if it should be managed from the database.

Use a clean premium design with:
- dark green
- green
- white
- orange CTA

Build the project incrementally.
Do not remove existing working functionality while adding new functionality.
```

---

# 66. Prima versiune pe care trebuie să o construim

## Sprint 1

Trebuie să avem funcțional:

```text
dezgandacitorul.ro
|
|-- Homepage
|-- Programare
|-- Ploșnițe
|-- Gândaci
|-- Deratizare
|-- Agricultură
|-- Firme
|-- Contact
|
|-- Supabase
|-- Booking DB
|-- Upload poze
|-- Email confirmare
|-- Admin leads
```

---

# 67. Definition of Done pentru MVP

MVP-ul este gata de lansare când:

- domeniul este conectat;
- site-ul merge perfect pe mobil;
- booking-ul funcționează;
- cererea apare în admin;
- clientul primește confirmarea;
- fotografiile pot fi încărcate;
- telefonul și WhatsApp funcționează;
- paginile principale sunt indexabile;
- sitemap este activ;
- analytics este instalat;
- există pagini de privacy/cookies/terms;
- sunt testate formularele;
- este făcut backup pentru baza de date;
- adminul este protejat.

---

# 68. Următorii pași practici

```text
1. Creăm repo GitHub: dezgandacitorul
2. Inițializăm Next.js
3. Instalăm Tailwind + shadcn/ui
4. Conectăm Vercel
5. Conectăm domeniul dezgandacitorul.ro
6. Creăm proiectul Supabase
7. Creăm schema DB
8. Construim homepage-ul
9. Construim booking stepper
10. Construim pagina Ploșnițe
11. Construim admin-ul
12. Adăugăm SEO
13. Testăm
14. Lansăm
```

---

# 69. Direcția finală

**Dezgandacitorul.ro** trebuie să devină mai mult decât „o firmă de DDD cu un website”.

Ținta este:

> o platformă de servicii locale, ușor de folosit, care transformă o problemă stresantă într-un proces simplu de programare, intervenție și follow-up.

Modelul poate fi ulterior extins în alte orașe și poate include:

- echipe proprii;
- tehnicieni parteneri;
- contracte business;
- abonamente;
- servicii agricole;
- aplicație tehnician;
- automatizări;
- CRM;
- rutare;
- plăți;
- sistem de recenzii;
- AI pentru trierea cererilor.
