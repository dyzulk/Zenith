-- Initial Schema for Zenith (D1 / SQLite)

-- PROFILES (Users)
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('superadmin', 'admin', 'editor', 'user')),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ANIME
CREATE TABLE IF NOT EXISTS anime (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  synopsis TEXT,
  status TEXT NOT NULL CHECK (status IN ('ongoing', 'completed', 'upcoming', 'hiatus')),
  type TEXT NOT NULL CHECK (type IN ('TV', 'Movie', 'OVA', 'ONA', 'Special')),
  rating TEXT,
  score REAL DEFAULT 0,
  year INTEGER,
  season TEXT CHECK (season IN ('winter', 'spring', 'summer', 'fall')),
  poster_key TEXT,
  banner_key TEXT,
  total_episodes INTEGER,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- GENRES
CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- ANIME_GENRES
CREATE TABLE IF NOT EXISTS anime_genres (
  anime_id TEXT REFERENCES anime(id) ON DELETE CASCADE,
  genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (anime_id, genre_id)
);

-- EPISODES
CREATE TABLE IF NOT EXISTS episodes (
  id TEXT PRIMARY KEY,
  anime_id TEXT REFERENCES anime(id) ON DELETE CASCADE,
  episode_number REAL NOT NULL,
  title TEXT,
  synopsis TEXT,
  duration_seconds INTEGER,
  thumbnail_key TEXT,
  aired_at DATETIME,
  view_count INTEGER DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(anime_id, episode_number)
);

-- VIDEO SOURCES
CREATE TABLE IF NOT EXISTS video_sources (
  id TEXT PRIMARY KEY,
  episode_id TEXT REFERENCES episodes(id) ON DELETE CASCADE,
  quality TEXT NOT NULL CHECK (quality IN ('360p', '480p', '720p', '1080p')),
  format TEXT NOT NULL CHECK (format IN ('hls', 'mp4', 'dash')),
  r2_key TEXT NOT NULL,
  file_size INTEGER,
  is_primary BOOLEAN DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- SUBTITLES
CREATE TABLE IF NOT EXISTS subtitles (
  id TEXT PRIMARY KEY,
  episode_id TEXT REFERENCES episodes(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  label TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- WATCH HISTORY
CREATE TABLE IF NOT EXISTS watch_history (
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  episode_id TEXT REFERENCES episodes(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, episode_id)
);

-- BOOKMARKS
CREATE TABLE IF NOT EXISTS bookmarks (
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  anime_id TEXT REFERENCES anime(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'plan' CHECK (status IN ('watching', 'completed', 'plan', 'dropped')),
  added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, anime_id)
);

-- COMMENTS
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  episode_id TEXT REFERENCES episodes(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id TEXT REFERENCES comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  is_spoiler BOOLEAN DEFAULT 0,
  is_deleted BOOLEAN DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_anime_slug ON anime(slug);
CREATE INDEX IF NOT EXISTS idx_episodes_anime_id ON episodes(anime_id);
CREATE INDEX IF NOT EXISTS idx_watch_history_user_id ON watch_history(user_id);
