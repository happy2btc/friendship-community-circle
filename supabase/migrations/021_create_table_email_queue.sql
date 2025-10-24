-- Migration: create email_queue table for queued outbound emails
CREATE TABLE IF NOT EXISTS public.email_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient text NOT NULL,
  subject text NOT NULL,
  body_text text,
  body_html text,
  type text,
  metadata jsonb,
  sent boolean DEFAULT false,
  sent_at timestamptz,
  tries integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_queue_unsent ON public.email_queue (sent, tries, created_at);
