-- Create notifications table for user alerts (personal messages, etc.)
create table if not exists notifications (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references profiles(id) on delete cascade,
    message text not null,
    icon text default '🔔',
    link text,
    read boolean default false,
    created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table notifications enable row level security;

-- Policy: Users can see their own notifications
create policy "Users can view their notifications" on notifications
    for select using (auth.uid() = user_id);

-- Policy: Users can insert notifications for themselves or others (for app logic)
create policy "Users can insert notifications" on notifications
    for insert using (auth.uid() = user_id or true);

-- Policy: Users can mark their notifications as read
create policy "Users can update their notifications" on notifications
    for update using (auth.uid() = user_id);
