-- GoxStream Advanced Seed Data V2
-- Adding 10+ New Titles and Full Episode Lists

-- 1. Frieren: Beyond Journey's End
INSERT OR IGNORE INTO `anime` (`id`, `slug`, `title`, `synopsis`, `status_id`, `type_id`, `rating`, `score`, `year`, `season_id`, `poster_key`, `banner_key`, `total_episodes`, `created_at`, `updated_at`) VALUES
('anime-frieren', 'frieren-beyond-journeys-end', 'Frieren: Beyond Journey''s End', 'An elf mage and her companions defeat the Demon King and go their separate ways.', 'completed', 'TV', 'PG-13', 9.1, 2023, 'fall', '/demo/demo-potrait.webp', '/demo/demo-landscape.webp', 12, (strftime('%s', 'now')), (strftime('%s', 'now')));

-- 2. Spy x Family
INSERT OR IGNORE INTO `anime` (`id`, `slug`, `title`, `synopsis`, `status_id`, `type_id`, `rating`, `score`, `year`, `season_id`, `poster_key`, `banner_key`, `total_episodes`, `created_at`, `updated_at`) VALUES
('anime-sxf', 'spy-x-family', 'Spy x Family', 'A spy, an assassin, and a telepath form a fake family.', 'completed', 'TV', 'PG-13', 8.5, 2022, 'spring', '/demo/demo-potrait.webp', '/demo/demo-landscape.webp', 12, (strftime('%s', 'now')), (strftime('%s', 'now')));

-- 3. Attack on Titan
INSERT OR IGNORE INTO `anime` (`id`, `slug`, `title`, `synopsis`, `status_id`, `type_id`, `rating`, `score`, `year`, `season_id`, `poster_key`, `banner_key`, `total_episodes`, `created_at`, `updated_at`) VALUES
('anime-aot', 'attack-on-titan', 'Attack on Titan', 'Humans fight for survival against giant Titans.', 'completed', 'TV', 'R-17', 9.0, 2013, 'spring', '/demo/demo-potrait.webp', '/demo/demo-landscape.webp', 13, (strftime('%s', 'now')), (strftime('%s', 'now')));

-- 4. Demon Slayer
INSERT OR IGNORE INTO `anime` (`id`, `slug`, `title`, `synopsis`, `status_id`, `type_id`, `rating`, `score`, `year`, `season_id`, `poster_key`, `banner_key`, `total_episodes`, `created_at`, `updated_at`) VALUES
('anime-ds', 'demon-slayer', 'Demon Slayer: Kimetsu no Yaiba', 'A boy becomes a demon slayer to save his sister.', 'completed', 'TV', 'R-17', 8.6, 2019, 'spring', '/demo/demo-potrait.webp', '/demo/demo-landscape.webp', 12, (strftime('%s', 'now')), (strftime('%s', 'now')));

-- 5. Vinland Saga
INSERT OR IGNORE INTO `anime` (`id`, `slug`, `title`, `synopsis`, `status_id`, `type_id`, `rating`, `score`, `year`, `season_id`, `poster_key`, `banner_key`, `total_episodes`, `created_at`, `updated_at`) VALUES
('anime-vinland', 'vinland-saga', 'Vinland Saga', 'A young man joins a band of mercenaries to avenge his father.', 'completed', 'TV', 'R-17', 8.8, 2019, 'summer', '/demo/demo-potrait.webp', '/demo/demo-landscape.webp', 12, (strftime('%s', 'now')), (strftime('%s', 'now')));

-- 6. My Hero Academia
INSERT OR IGNORE INTO `anime` (`id`, `slug`, `title`, `synopsis`, `status_id`, `type_id`, `rating`, `score`, `year`, `season_id`, `poster_key`, `banner_key`, `total_episodes`, `created_at`, `updated_at`) VALUES
('anime-mha', 'my-hero-academia', 'My Hero Academia', 'A boy without powers in a world of superheroes.', 'ongoing', 'TV', 'PG-13', 8.0, 2016, 'spring', '/demo/demo-potrait.webp', '/demo/demo-landscape.webp', 13, (strftime('%s', 'now')), (strftime('%s', 'now')));

-- 7. Haikyu!!
INSERT OR IGNORE INTO `anime` (`id`, `slug`, `title`, `synopsis`, `status_id`, `type_id`, `rating`, `score`, `year`, `season_id`, `poster_key`, `banner_key`, `total_episodes`, `created_at`, `updated_at`) VALUES
('anime-haikyu', 'haikyu', 'Haikyu!!', 'A short boy strives to become a volleyball star.', 'completed', 'TV', 'PG-13', 8.7, 2014, 'spring', '/demo/demo-potrait.webp', '/demo/demo-landscape.webp', 12, (strftime('%s', 'now')), (strftime('%s', 'now')));

-- 8. Blue Lock
INSERT OR IGNORE INTO `anime` (`id`, `slug`, `title`, `synopsis`, `status_id`, `type_id`, `rating`, `score`, `year`, `season_id`, `poster_key`, `banner_key`, `total_episodes`, `created_at`, `updated_at`) VALUES
('anime-bluelock', 'blue-lock', 'Blue Lock', 'Japan creates a revolutionary training program for strikers.', 'ongoing', 'TV', 'PG-13', 8.3, 2022, 'fall', '/demo/demo-potrait.webp', '/demo/demo-landscape.webp', 12, (strftime('%s', 'now')), (strftime('%s', 'now')));

-- 9. Hell's Paradise
INSERT OR IGNORE INTO `anime` (`id`, `slug`, `title`, `synopsis`, `status_id`, `type_id`, `rating`, `score`, `year`, `season_id`, `poster_key`, `banner_key`, `total_episodes`, `created_at`, `updated_at`) VALUES
('anime-hellp', 'hells-paradise', 'Hell''s Paradise', 'Convicts search for the elixir of life on a mysterious island.', 'completed', 'TV', 'R-17', 8.2, 2023, 'spring', '/demo/demo-potrait.webp', '/demo/demo-landscape.webp', 13, (strftime('%s', 'now')), (strftime('%s', 'now')));

-- 10. Mushoku Tensei
INSERT OR IGNORE INTO `anime` (`id`, `slug`, `title`, `synopsis`, `status_id`, `type_id`, `rating`, `score`, `year`, `season_id`, `poster_key`, `banner_key`, `total_episodes`, `created_at`, `updated_at`) VALUES
('anime-mushoku', 'mushoku-tensei', 'Mushoku Tensei: Jobless Reincarnation', 'A shut-in is reborn in a world of magic.', 'ongoing', 'TV', 'R-17', 8.7, 2021, 'winter', '/demo/demo-potrait.webp', '/demo/demo-landscape.webp', 11, (strftime('%s', 'now')), (strftime('%s', 'now')));

-- Adding Episodes for Frieren (Demo)
INSERT OR IGNORE INTO `episodes` (`id`, `anime_id`, `episode_number`, `title`, `synopsis`, `duration_seconds`, `thumbnail_key`, `view_count`, `created_at`) VALUES
('ep-f-01', 'anime-frieren', 1, 'The Journey''s End', 'Return of the heroes.', 1420, '/demo/demo-landscape.webp', 100, (strftime('%s', 'now'))),
('ep-f-02', 'anime-frieren', 2, 'It Didn''t Have to Be Magic', 'Finding an apprentice.', 1420, '/demo/demo-landscape.webp', 90, (strftime('%s', 'now'))),
('ep-f-03', 'anime-frieren', 3, 'Killing Magic', 'Testing powers.', 1420, '/demo/demo-landscape.webp', 85, (strftime('%s', 'now')));

-- Adding Video Sources (Quick loop for demo)
INSERT OR IGNORE INTO `video_sources` (`id`, `episode_id`, `quality_id`, `format_id`, `url`, `is_primary`, `created_at`)
SELECT 'src-' || id || '-1080', id, '1080p', 'mp4', 'https://cdn.zenith.dyzulk.net.eu.org/anime/demo/episode/1/1080p.mp4', 1, (strftime('%s', 'now')) FROM `episodes` WHERE id LIKE 'ep-f-%';
