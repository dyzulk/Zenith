export interface Anime {
  id: string;
  slug: string;
  title: string;
  title_romaji?: string;
  title_english?: string;
  synopsis?: string;
  status: 'ongoing' | 'completed' | 'upcoming' | 'hiatus';
  type: 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special';
  rating?: string;
  score: number;
  year?: number;
  season?: 'winter' | 'spring' | 'summer' | 'fall';
  poster_key?: string;
  banner_key?: string;
  total_episodes?: number;
  studio?: string;
  source?: string;
  created_at: string;
  updated_at: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Episode {
  id: string;
  anime_id: string;
  episode_number: number;
  title?: string;
  synopsis?: string;
  duration_seconds?: number;
  thumbnail_key?: string;
  aired_at?: string;
  view_count: number;
  created_at: string;
}

export interface VideoSource {
  id: string;
  episode_id: string;
  quality: '360p' | '480p' | '720p' | '1080p';
  format: 'hls' | 'mp4' | 'dash';
  r2_key: string;
  file_size?: number;
  is_primary: boolean;
  created_at: string;
}

export interface Subtitle {
  id: string;
  episode_id: string;
  language: string; // 'id', 'en', 'jp'
  label: string;    // 'Indonesia', 'English'
  r2_key: string;   // Path to .vtt file
  created_at: string;
}

export interface Profile {
  id: string;
  username: string;
  display_name?: string;
  avatar_url?: string;
  role: 'superadmin' | 'admin' | 'editor' | 'user';
  created_at: string;
}

export interface Comment {
  id: string;
  episode_id: string;
  user_id: string;
  parent_id?: string;
  body: string;
  is_spoiler: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  user?: Profile; // Joined data
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  meta?: {
    page?: number;
    total?: number;
  };
}
