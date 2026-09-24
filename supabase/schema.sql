-- Dezgandacitorul.ro — schema inițială Supabase (Master Plan §29)
-- Rulează acest script în SQL editor-ul proiectului Supabase.

create extension if not exists "pgcrypto";

-- users: gestionat de Supabase Auth (auth.users). Tabela `profiles` extinde
-- auth.users cu rolul aplicației.
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  phone text,
  role text not null default 'CUSTOMER'
    check (role in ('CUSTOMER', 'BUSINESS', 'TECHNICIAN', 'DISPATCHER', 'ADMIN')),
  created_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles (id) on delete set null,
  name text not null,
  phone text not null,
  email text,
  address text,
  city text,
  county text,
  postal_code text,
  created_at timestamptz not null default now()
);

create table if not exists service_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null,
  base_price numeric,
  active boolean not null default true
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers (id) on delete cascade,
  service_slug text not null references service_types (slug),
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

create table if not exists booking_photos (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings (id) on delete cascade,
  file_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists technicians (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  active boolean not null default true
);

alter table bookings
  add constraint bookings_technician_id_fkey
  foreign key (technician_id) references technicians (id) on delete set null;

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings (id) on delete cascade,
  technician_id uuid references technicians (id) on delete set null,
  status text not null default 'PENDING',
  started_at timestamptz,
  completed_at timestamptz,
  notes text
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers (id) on delete cascade,
  booking_id uuid references bookings (id) on delete set null,
  amount numeric not null,
  status text not null default 'UNPAID',
  issued_at timestamptz not null default now(),
  paid_at timestamptz
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers (id) on delete cascade,
  booking_id uuid references bookings (id) on delete set null,
  rating int not null check (rating between 1 and 5),
  comment text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security (Master Plan §61) ---------------------------------
alter table profiles enable row level security;
alter table customers enable row level security;
alter table bookings enable row level security;
alter table booking_photos enable row level security;
alter table reviews enable row level security;
alter table contact_messages enable row level security;

create policy "profiles: user reads own row" on profiles
  for select using (auth.uid() = id);

create policy "customers: user reads own row" on customers
  for select using (auth.uid() = user_id);

create policy "bookings: customer reads own bookings" on bookings
  for select using (
    exists (
      select 1 from customers c
      where c.id = bookings.customer_id and c.user_id = auth.uid()
    )
  );

-- Scrierile publice (formularul de programare/contact) se fac exclusiv prin
-- rutele API server-side, folosind cheia service_role — nu prin clientul
-- browser — de aceea nu există aici politici INSERT pentru anon/authenticated.

-- Date inițiale de exemplu -----------------------------------------------
insert into service_types (name, slug, category, base_price) values
  ('Tratament ploșnițe', 'plosnite', 'rezidential', 250),
  ('Dezinsecție gândaci', 'gandaci', 'rezidential', 200),
  ('Deratizare', 'rozatoare', 'rezidential', 220),
  ('Dezinsecție furnici', 'furnici', 'rezidential', 180),
  ('Dezinsecție purici', 'purici', 'rezidential', 200),
  ('Dezinsecție căpușe', 'capuse', 'rezidential', 220),
  ('Dezinsecție țânțari', 'tantari', 'rezidential', 200),
  ('Dezinsecție molii', 'molii', 'rezidential', 180),
  ('Dezinsecție viespi', 'viespi', 'rezidential', 250),
  ('Deratizare profesională', 'deratizare', 'rezidential', 220),
  ('Dezinsecție generală', 'dezinsectie', 'rezidential', 200),
  ('Dezinfecție spații', 'dezinfectie', 'rezidential', 200)
on conflict (slug) do nothing;
