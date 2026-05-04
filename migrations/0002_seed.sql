-- Seeder for GoxStream (Factual Data per May 1, 2026)
-- 1. SUPERADMIN
-- Jika profil superadmin belum ada, tambahkan.
INSERT OR IGNORE INTO profiles (id, username, display_name, role) 
VALUES ('superadmin-user-id', 'superadmin', 'Gox Admin', 'superadmin');

-- 2. GENRES
INSERT OR IGNORE INTO genres (name, slug) VALUES 
('Action', 'action'),
('Adventure', 'adventure'),
('Fantasy', 'fantasy'),
('Sci-Fi', 'sci-fi'),
('Supernatural', 'supernatural'),
('Comedy', 'comedy'),
('Drama', 'drama'),
('Psychological', 'psychological');

-- 3. ANIME
-- Solo Leveling
INSERT OR REPLACE INTO anime (id, slug, title, synopsis, status, type, year, season, total_episodes, score) VALUES 
('sl-s1', 'solo-leveling-s1', 'Solo Leveling Season 1', 'Sung Jinwoo, hunter terlemah, mendapatkan kemampuan unik untuk level up setelah insiden di double dungeon.', 'completed', 'TV', 2024, 'winter', 12, 8.7),
('sl-s2', 'solo-leveling-s2', 'Solo Leveling Season 2 -Arise from the Shadow-', 'Jinwoo mulai membangkitkan pasukan bayangan dan menjadi ancaman bagi para Hunter tingkat atas.', 'completed', 'TV', 2025, 'winter', 12, 8.9);

-- Jujutsu Kaisen
INSERT OR REPLACE INTO anime (id, slug, title, synopsis, status, type, year, season, total_episodes, score) VALUES 
('jjk-s1', 'jujutsu-kaisen-s1', 'Jujutsu Kaisen Season 1', 'Yuji Itadori menjadi wadah Sukuna dan bergabung dengan Jujutsu High.', 'completed', 'TV', 2020, 'fall', 24, 8.6),
('jjk-s2', 'jujutsu-kaisen-s2', 'Jujutsu Kaisen Season 2', 'Kisah masa lalu Gojo Satoru dan Insiden Shibuya yang mengerikan.', 'completed', 'TV', 2023, 'summer', 23, 8.8),
('jjk-s3', 'jjk-s3', 'Jujutsu Kaisen Season 3 - Culling Game', 'Permainan mematikan yang diatur oleh Kenjaku dimulai.', 'completed', 'TV', 2026, 'winter', 12, 9.0);

-- Dr. Stone
INSERT OR REPLACE INTO anime (id, slug, title, synopsis, status, type, year, season, total_episodes, score) VALUES 
('dr-stone-s1', 'dr-stone-s1', 'Dr. Stone Season 1', 'Peradaban dimulai kembali dari nol dengan kekuatan sains Senku.', 'completed', 'TV', 2019, 'summer', 24, 8.3),
('dr-stone-s2', 'dr-stone-s2', 'Dr. Stone Season 2 - Stone Wars', 'Pertempuran antara Kerajaan Sains dan Kekaisaran Tsukasa.', 'completed', 'TV', 2021, 'winter', 11, 8.2),
('dr-stone-s3', 'dr-stone-s3', 'Dr. Stone Season 3 - New World', 'Senku berlayar melintasi lautan untuk mencari asal-usul pembatuan.', 'completed', 'TV', 2023, 'spring', 22, 8.4),
('dr-stone-s4', 'dr-stone-s4', 'Dr. Stone Season 4 - Science Future', 'Perjalanan akhir menuju masa depan dan luar angkasa.', 'ongoing', 'TV', 2026, 'spring', 12, 8.5);

-- 4. ANIME_GENRES
-- Solo Leveling
INSERT OR IGNORE INTO anime_genres (anime_id, genre_id) SELECT 'sl-s1', id FROM genres WHERE name IN ('Action', 'Adventure', 'Fantasy');
INSERT OR IGNORE INTO anime_genres (anime_id, genre_id) SELECT 'sl-s2', id FROM genres WHERE name IN ('Action', 'Adventure', 'Fantasy');
-- Jujutsu Kaisen
INSERT OR IGNORE INTO anime_genres (anime_id, genre_id) SELECT 'jjk-s1', id FROM genres WHERE name IN ('Action', 'Supernatural', 'Fantasy');
INSERT OR IGNORE INTO anime_genres (anime_id, genre_id) SELECT 'jjk-s2', id FROM genres WHERE name IN ('Action', 'Supernatural', 'Fantasy');
INSERT OR IGNORE INTO anime_genres (anime_id, genre_id) SELECT 'jjk-s3', id FROM genres WHERE name IN ('Action', 'Supernatural', 'Fantasy');
-- Dr. Stone
INSERT OR IGNORE INTO anime_genres (anime_id, genre_id) SELECT 'dr-stone-s1', id FROM genres WHERE name IN ('Adventure', 'Sci-Fi', 'Comedy');
INSERT OR IGNORE INTO anime_genres (anime_id, genre_id) SELECT 'dr-stone-s2', id FROM genres WHERE name IN ('Adventure', 'Sci-Fi', 'Comedy');
INSERT OR IGNORE INTO anime_genres (anime_id, genre_id) SELECT 'dr-stone-s3', id FROM genres WHERE name IN ('Adventure', 'Sci-Fi', 'Comedy');
INSERT OR IGNORE INTO anime_genres (anime_id, genre_id) SELECT 'dr-stone-s4', id FROM genres WHERE name IN ('Adventure', 'Sci-Fi', 'Comedy');

-- 5. EPISODES
INSERT OR REPLACE INTO episodes (id, anime_id, episode_number, title, synopsis) VALUES 
('sl-s1-e1', 'sl-s1', 1, 'Masa Depan Terlemah', 'Jinwoo memasuki dungeon ganda yang misterius.'),
('sl-s2-e1', 'sl-s2', 1, 'Bangkitnya Bayangan', 'Pasukan bayangan pertama Jinwoo mulai terbentuk.'),
('jjk-s1-e1', 'jjk-s1', 1, 'Ryomen Sukuna', 'Yuji memakan jari Sukuna.'),
('jjk-s2-e1', 'jjk-s2', 1, 'Hidden Inventory', 'Masa muda Gojo Satoru.'),
('jjk-s3-e1', 'jjk-s3', 1, 'The Culling Game Begins', 'Awal mula game kematian Kenjaku.'),
('dr-stone-s1-e1', 'dr-stone-s1', 1, 'Stone World', 'Senku bangkit dari pembatuan.'),
('dr-stone-s2-e1', 'dr-stone-s2', 1, 'Stone Wars Beginning', 'Persiapan perang melawan Tsukasa.'),
('dr-stone-s3-e1', 'dr-stone-s3', 1, 'New World Map', 'Pembuatan peta dunia baru.'),
('dr-stone-s4-e1', 'dr-stone-s4', 1, 'To the Future', 'Ambisi mencapai bulan dimulai.');

-- 6. VIDEO SOURCES (CDN URLs)
INSERT OR REPLACE INTO video_sources (id, episode_id, quality, format, file_key, url) VALUES 
('sl-s1-e1-360p', 'sl-s1-e1', '360p', 'mp4', 'dummy', 'https://cdn.gox.my.id/anime/demo/episode/1/360p.mp4'),
('sl-s1-e1-480p', 'sl-s1-e1', '480p', 'mp4', 'dummy', 'https://cdn.gox.my.id/anime/demo/episode/1/480p.mp4'),
('sl-s1-e1-720p', 'sl-s1-e1', '720p', 'mp4', 'dummy', 'https://cdn.gox.my.id/anime/demo/episode/1/720p.mp4'),
('sl-s1-e1-1080p', 'sl-s1-e1', '1080p', 'mp4', 'dummy', 'https://cdn.gox.my.id/anime/demo/episode/1/1080p.mp4'),
('jjk-s1-e1-360p', 'jjk-s1-e1', '360p', 'mp4', 'dummy', 'https://cdn.gox.my.id/anime/demo/episode/1/360p.mp4'),
('dr-stone-s1-e1-360p', 'dr-stone-s1-e1', '360p', 'mp4', 'dummy', 'https://cdn.gox.my.id/anime/demo/episode/1/360p.mp4');
