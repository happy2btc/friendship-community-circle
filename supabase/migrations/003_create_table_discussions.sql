/**
 * Discussions Table (Forum Topics)
 * Users can create topics and view public/circle topics.
 */

-- migrate:up
create table public.discussions (
  id uuid not null default gen_random_uuid() primary key,
  created_at timestamp with time zone not null default now(),
  title text not null,
  description text,
  author_id uuid not null references auth.users(id) on delete cascade,
  visibility text not null default 'public' check (visibility in ('private', 'circle', 'public'))
);

comment on table public.discussions is 'Public forum topics for community discussion.';

alter table public.discussions enable row level security;

-- Users can view their own private discussions AND all public discussions.
create policy "Users can view discussions"
on public.discussions for select
using ( (author_id = auth.uid()) or (visibility = 'public') );

-- Users can create discussions.
create policy "Users can create discussions"
on public.discussions for insert
to authenticated with check ( author_id = auth.uid() );

-- Users can update their own discussions.
create policy "Users can update their own discussions"
on public.discussions for update
using ( author_id = auth.uid() );

-- Users can delete their own discussions.
create policy "Users can delete their own discussions"
on public.discussions for delete
using ( author_id = auth.uid() );

-- migrate:down
drop table if exists public.discussions;