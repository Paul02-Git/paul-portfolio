-- Guestbook feature: a single-row atomic visit counter + a public message wall.
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).
-- All access happens server-side via the service-role key (see lib/supabase.ts),
-- so RLS is enabled with no policies as a safety net only.

create table if not exists guestbook_visits (
  id smallint primary key default 1,
  total bigint not null default 0,
  updated_at timestamptz not null default now(),
  constraint guestbook_visits_singleton check (id = 1)
);

insert into guestbook_visits (id, total) values (1, 0)
  on conflict (id) do nothing;

alter table guestbook_visits enable row level security;

-- Atomic increment (avoids read-then-write races). Called via supabase-js `.rpc(...)`.
create or replace function increment_guestbook_visits()
returns bigint
language sql
security definer
set search_path = public
as $$
  update guestbook_visits
    set total = total + 1, updated_at = now()
    where id = 1
    returning total;
$$;

create table if not exists guestbook_messages (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null,
  nickname text not null check (char_length(nickname) between 1 and 40),
  message text not null check (char_length(message) between 1 and 300),
  created_at timestamptz not null default now()
);

create index if not exists guestbook_messages_visitor_id_idx
  on guestbook_messages (visitor_id);

create index if not exists guestbook_messages_created_at_idx
  on guestbook_messages (created_at desc);

alter table guestbook_messages enable row level security;
