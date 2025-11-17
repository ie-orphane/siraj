CREATE TABLE IF NOT EXISTS public.ft_connections (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  login TEXT NOT NULL,
  avatar TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);