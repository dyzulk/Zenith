-- RLS Policies and Triggers for Zenith

-- 1. Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE anime ENABLE ROW LEVEL SECURITY;
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE anime_genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 2. Define Policies

-- Profiles: Users can view all profiles, but only edit their own.
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Anime: Everyone can read, only admins can modify (checked via role in profiles).
CREATE POLICY "Anime is viewable by everyone" ON anime
  FOR SELECT USING (true);

-- Episodes: Everyone can read.
CREATE POLICY "Episodes are viewable by everyone" ON episodes
  FOR SELECT USING (true);

-- Video Sources: Everyone can read (Worker will handle presigning access).
CREATE POLICY "Video sources are viewable by everyone" ON video_sources
  FOR SELECT USING (true);

-- Watch History: Users can only see and manage their own history.
CREATE POLICY "Users can manage own watch history" ON watch_history
  FOR ALL USING (auth.uid() = user_id);

-- Bookmarks: Users can only see and manage their own bookmarks.
CREATE POLICY "Users can manage own bookmarks" ON bookmarks
  FOR ALL USING (auth.uid() = user_id);

-- Comments: Everyone can read, users can insert and edit their own.
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (NOT is_deleted);

CREATE POLICY "Authenticated users can insert comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING (auth.uid() = user_id);

-- 3. Triggers for updated_at

CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profiles_updated BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER on_anime_updated BEFORE UPDATE ON anime FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER on_watch_history_updated BEFORE UPDATE ON watch_history FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER on_comments_updated BEFORE UPDATE ON comments FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- 4. Search Vector for Anime

ALTER TABLE anime ADD COLUMN IF NOT EXISTS search_vector TSVECTOR;

CREATE OR REPLACE FUNCTION anime_search_vector_trigger() RETURNS trigger AS $$
begin
  new.search_vector :=
    to_tsvector('english', coalesce(new.title, '')) ||
    to_tsvector('english', coalesce(new.synopsis, ''));
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_anime_search_vector BEFORE INSERT OR UPDATE ON anime
FOR EACH ROW EXECUTE PROCEDURE anime_search_vector_trigger();

CREATE INDEX IF NOT EXISTS idx_anime_search ON anime USING GIN(search_vector);
