-- Seed Data for Zenith
-- Populate Genres
INSERT INTO genres (name, slug) VALUES 
('Action', 'action'),
('Adventure', 'adventure'),
('Fantasy', 'fantasy'),
('Sci-Fi', 'sci-fi'),
('Romance', 'romance'),
('Comedy', 'comedy')
ON CONFLICT (slug) DO NOTHING;

-- Populate Anime
INSERT INTO anime (slug, title, synopsis, status, type, score, year, season, total_episodes) VALUES 
('solo-leveling', 'Solo Leveling', 'Ten years ago, "the Gate" appeared and connected the real world with the realm of magic and monsters...', 'ongoing', 'TV', 9.2, 2024, 'Winter', 12),
('one-piece', 'One Piece', 'Gol D. Roger was known as the "Pirate King", the strongest and most infamous being to have sailed the Grand Line...', 'ongoing', 'TV', 8.9, 1999, 'Fall', 1100),
('jujutsu-kaisen', 'Jujutsu Kaisen', 'Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital...', 'completed', 'TV', 9.0, 2020, 'Fall', 24)
ON CONFLICT (slug) DO NOTHING;

-- Link Anime and Genres
INSERT INTO anime_genres (anime_id, genre_id)
SELECT a.id, g.id FROM anime a, genres g WHERE a.slug = 'solo-leveling' AND g.slug IN ('action', 'adventure', 'fantasy')
ON CONFLICT DO NOTHING;

-- Add Episodes for Solo Leveling
INSERT INTO episodes (anime_id, episode_number, title)
SELECT id, 1, 'I''m Used to It' FROM anime WHERE slug = 'solo-leveling'
UNION ALL
SELECT id, 2, 'If I Had One More Chance' FROM anime WHERE slug = 'solo-leveling'
ON CONFLICT DO NOTHING;
