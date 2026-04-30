-- Add additional metadata to Anime table
ALTER TABLE anime 
ADD COLUMN IF NOT EXISTS title_romaji TEXT,
ADD COLUMN IF NOT EXISTS title_english TEXT,
ADD COLUMN IF NOT EXISTS studio TEXT,
ADD COLUMN IF NOT EXISTS source TEXT,
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT FALSE;

-- Improve search vector to include new title fields
CREATE OR REPLACE FUNCTION anime_search_vector_trigger() RETURNS trigger AS $$
begin
  new.search_vector :=
    to_tsvector('english', coalesce(new.title, '')) ||
    to_tsvector('english', coalesce(new.title_romaji, '')) ||
    to_tsvector('english', coalesce(new.title_english, '')) ||
    to_tsvector('english', coalesce(new.synopsis, ''));
  return new;
end
$$ LANGUAGE plpgsql;

-- SUBTITLES
CREATE TABLE IF NOT EXISTS subtitles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_id UUID REFERENCES episodes(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  label TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE subtitles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Subtitles are viewable by everyone" ON subtitles FOR SELECT USING (true);
