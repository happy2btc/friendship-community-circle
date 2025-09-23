-- migrate:up
ALTER TABLE public.events ADD COLUMN repeat text NOT NULL DEFAULT 'none';
ALTER TABLE public.events ADD COLUMN timezone text NOT NULL DEFAULT 'UTC';

-- migrate:down
ALTER TABLE public.events DROP COLUMN IF EXISTS repeat;
ALTER TABLE public.events DROP COLUMN IF EXISTS timezone;
