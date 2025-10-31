create table positive_impact (
  id uuid primary key default gen_random_uuid(),
  contributor_id uuid references profiles(id),
  type text not null check (type in ('time', 'item', 'money')),
  details text,
  points_awarded integer not null,
  created_at timestamptz default now()
);