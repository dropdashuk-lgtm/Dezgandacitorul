-- Dezgandacitorul.ro — schema Supabase (Master Plan §29, extins cu §14/§16 documente & cereri urgente)
--
-- Tabelele sunt prefixate cu `dz_` pentru că acest proiect Supabase este
-- partajat cu o altă aplicație. Rulează acest script în SQL editor-ul
-- proiectului Supabase (idempotent — poate fi rulat de mai multe ori).

-- Profil aplicație, legat 1:1 de auth.users
create table if not exists dz_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  phone text,
  role text not null default 'CUSTOMER' check (role in ('CUSTOMER', 'ADMIN')),
  created_at timestamptz not null default now()
);

create table if not exists dz_customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references dz_profiles (id) on delete set null,
  name text not null,
  phone text not null,
  email text,
  address text,
  city text,
  county text,
  postal_code text,
  created_at timestamptz not null default now()
);
create index if not exists dz_customers_user_id_idx on dz_customers (user_id);

create table if not exists dz_service_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null,
  base_price numeric,
  price_note text,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists dz_bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references dz_customers (id) on delete cascade,
  service_slug text not null references dz_service_types (slug),
  property_type text not null,
  property_size text,
  infestation_level text,
  address text not null,
  city text not null,
  preferred_date text not null,
  notes text,
  status text not null default 'CERERE_NOUA' check (status in (
    'CERERE_NOUA', 'IN_EVALUARE', 'OFERTA_TRIMISA', 'CONFIRMATA',
    'TEHNICIAN_ALOCAT', 'IN_DRUM', 'IN_DESFASURARE',
    'FINALIZATA', 'FOLLOW_UP', 'INCHISA'
  )),
  quoted_price numeric,
  final_price numeric,
  technician_id uuid,
  created_at timestamptz not null default now()
);
create index if not exists dz_bookings_customer_id_idx on dz_bookings (customer_id);

create table if not exists dz_booking_photos (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references dz_bookings (id) on delete cascade,
  file_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists dz_technicians (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  active boolean not null default true
);

alter table dz_bookings drop constraint if exists dz_bookings_technician_id_fkey;
alter table dz_bookings
  add constraint dz_bookings_technician_id_fkey
  foreign key (technician_id) references dz_technicians (id) on delete set null;

create table if not exists dz_jobs (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references dz_bookings (id) on delete cascade,
  technician_id uuid references dz_technicians (id) on delete set null,
  status text not null default 'PENDING',
  started_at timestamptz,
  completed_at timestamptz,
  notes text
);

create table if not exists dz_invoices (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references dz_customers (id) on delete cascade,
  booking_id uuid references dz_bookings (id) on delete set null,
  amount numeric not null,
  status text not null default 'UNPAID',
  issued_at timestamptz not null default now(),
  paid_at timestamptz
);

create table if not exists dz_reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references dz_customers (id) on delete cascade,
  booking_id uuid references dz_bookings (id) on delete set null,
  rating int not null check (rating between 1 and 5),
  comment text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists dz_contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Documente & contracte per client (Master Plan §14)
create table if not exists dz_documents (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references dz_customers (id) on delete cascade,
  booking_id uuid references dz_bookings (id) on delete set null,
  title text not null,
  doc_type text not null default 'document' check (doc_type in ('contract', 'document', 'factura', 'raport', 'altul')),
  storage_path text not null,
  uploaded_by uuid references dz_profiles (id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists dz_documents_customer_id_idx on dz_documents (customer_id);

-- Cereri urgente ale clienților — documente sau intervenție (extensie peste §57)
create table if not exists dz_urgent_requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references dz_customers (id) on delete cascade,
  request_type text not null check (request_type in ('document', 'interventie_urgenta')),
  description text not null,
  status text not null default 'NOUA' check (status in ('NOUA', 'IN_LUCRU', 'REZOLVATA')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);
create index if not exists dz_urgent_requests_customer_id_idx on dz_urgent_requests (customer_id);

-- Helper: e utilizatorul curent admin?
create or replace function dz_is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from dz_profiles where id = auth.uid() and role = 'ADMIN'
  );
$$;

-- Auto-creare profil CUSTOMER la fiecare înregistrare (auth.users insert)
create or replace function dz_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into dz_profiles (id, email, phone, role)
  values (new.id, new.email, new.raw_user_meta_data ->> 'phone', 'CUSTOMER')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists dz_on_auth_user_created on auth.users;
create trigger dz_on_auth_user_created
  after insert on auth.users
  for each row execute function dz_handle_new_user();

-- Row Level Security (Master Plan §61) ---------------------------------
alter table dz_profiles enable row level security;
alter table dz_customers enable row level security;
alter table dz_service_types enable row level security;
alter table dz_bookings enable row level security;
alter table dz_booking_photos enable row level security;
alter table dz_documents enable row level security;
alter table dz_urgent_requests enable row level security;
alter table dz_reviews enable row level security;
alter table dz_contact_messages enable row level security;

drop policy if exists "dz_profiles: own row" on dz_profiles;
create policy "dz_profiles: own row" on dz_profiles
  for select using (auth.uid() = id or dz_is_admin());

drop policy if exists "dz_service_types: public read" on dz_service_types;
create policy "dz_service_types: public read" on dz_service_types
  for select using (true);
drop policy if exists "dz_service_types: admin write" on dz_service_types;
create policy "dz_service_types: admin write" on dz_service_types
  for all using (dz_is_admin()) with check (dz_is_admin());

drop policy if exists "dz_customers: own row" on dz_customers;
create policy "dz_customers: own row" on dz_customers
  for select using (auth.uid() = user_id or dz_is_admin());
drop policy if exists "dz_customers: admin manage" on dz_customers;
create policy "dz_customers: admin manage" on dz_customers
  for all using (dz_is_admin()) with check (dz_is_admin());

drop policy if exists "dz_bookings: own bookings" on dz_bookings;
create policy "dz_bookings: own bookings" on dz_bookings
  for select using (
    exists (select 1 from dz_customers c where c.id = dz_bookings.customer_id and (c.user_id = auth.uid() or dz_is_admin()))
  );

drop policy if exists "dz_booking_photos: own photos" on dz_booking_photos;
create policy "dz_booking_photos: own photos" on dz_booking_photos
  for select using (
    exists (
      select 1 from dz_bookings b join dz_customers c on c.id = b.customer_id
      where b.id = dz_booking_photos.booking_id and (c.user_id = auth.uid() or dz_is_admin())
    )
  );

drop policy if exists "dz_documents: own documents" on dz_documents;
create policy "dz_documents: own documents" on dz_documents
  for select using (
    exists (select 1 from dz_customers c where c.id = dz_documents.customer_id and (c.user_id = auth.uid() or dz_is_admin()))
  );
drop policy if exists "dz_documents: admin manage" on dz_documents;
create policy "dz_documents: admin manage" on dz_documents
  for all using (dz_is_admin()) with check (dz_is_admin());

drop policy if exists "dz_urgent_requests: own requests" on dz_urgent_requests;
create policy "dz_urgent_requests: own requests" on dz_urgent_requests
  for select using (
    exists (select 1 from dz_customers c where c.id = dz_urgent_requests.customer_id and (c.user_id = auth.uid() or dz_is_admin()))
  );
drop policy if exists "dz_urgent_requests: customer insert" on dz_urgent_requests;
create policy "dz_urgent_requests: customer insert" on dz_urgent_requests
  for insert with check (
    exists (select 1 from dz_customers c where c.id = dz_urgent_requests.customer_id and c.user_id = auth.uid())
  );
drop policy if exists "dz_urgent_requests: admin update" on dz_urgent_requests;
create policy "dz_urgent_requests: admin update" on dz_urgent_requests
  for update using (dz_is_admin());

drop policy if exists "dz_reviews: public read approved" on dz_reviews;
create policy "dz_reviews: public read approved" on dz_reviews
  for select using (approved = true or dz_is_admin());

-- Scrierile pentru bookings/contact_messages/customers se fac exclusiv prin
-- rutele API server-side, cu cheia service_role — nu există politici INSERT
-- publice pentru aceste tabele.

-- Storage buckets --------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('dz-booking-photos', 'dz-booking-photos', true, 8388608, array['image/jpeg', 'image/png', 'image/heic']),
  ('dz-documents', 'dz-documents', false, 15728640, array['application/pdf', 'image/jpeg', 'image/png'])
on conflict (id) do nothing;

drop policy if exists "dz-booking-photos: public read" on storage.objects;
create policy "dz-booking-photos: public read" on storage.objects
  for select using (bucket_id = 'dz-booking-photos');

drop policy if exists "dz-documents: owner or admin read" on storage.objects;
create policy "dz-documents: owner or admin read" on storage.objects
  for select using (
    bucket_id = 'dz-documents' and (
      dz_is_admin() or exists (
        select 1 from dz_documents d
        join dz_customers c on c.id = d.customer_id
        where d.storage_path = storage.objects.name and c.user_id = auth.uid()
      )
    )
  );

-- Date inițiale — servicii cu preț estimativ, editabile din /admin/preturi
insert into dz_service_types (name, slug, category, base_price, price_note) values
  ('Tratament ploșnițe', 'plosnite', 'rezidential', 250, 'Preț estimativ — poate varia în funcție de suprafață și nivelul infestării'),
  ('Dezinsecție gândaci', 'gandaci', 'rezidential', 200, 'Preț estimativ — poate varia în funcție de suprafață'),
  ('Deratizare', 'rozatoare', 'rezidential', 220, 'Preț estimativ — poate varia în funcție de suprafață'),
  ('Dezinsecție furnici', 'furnici', 'rezidential', 180, 'Preț estimativ'),
  ('Dezinsecție purici', 'purici', 'rezidential', 200, 'Preț estimativ'),
  ('Dezinsecție căpușe', 'capuse', 'rezidential', 220, 'Preț estimativ'),
  ('Dezinsecție țânțari', 'tantari', 'rezidential', 200, 'Preț estimativ'),
  ('Dezinsecție molii', 'molii', 'rezidential', 180, 'Preț estimativ'),
  ('Dezinsecție viespi', 'viespi', 'rezidential', 250, 'Preț estimativ'),
  ('Deratizare profesională', 'deratizare', 'rezidential', 220, 'Preț estimativ'),
  ('Dezinsecție generală', 'dezinsectie', 'rezidential', 200, 'Preț estimativ'),
  ('Dezinfecție spații', 'dezinfectie', 'rezidential', 200, 'Preț estimativ'),
  ('Evaluare agricultură', 'agricultura', 'agricultura', null, 'Ofertă personalizată — evaluată individual, fără preț fix afișat')
on conflict (slug) do nothing;

-- Cont admin -------------------------------------------------------------
-- Contul admin (admin@dezgandacitorul.ro) este creat separat, prin Supabase
-- Auth (nu prin acest script), pentru a putea seta o parolă în siguranță.
-- După crearea utilizatorului în auth.users, rulează:
--
--   insert into dz_profiles (id, email, role)
--   values ('<user-id-din-auth.users>', 'admin@dezgandacitorul.ro', 'ADMIN')
--   on conflict (id) do update set role = 'ADMIN';
