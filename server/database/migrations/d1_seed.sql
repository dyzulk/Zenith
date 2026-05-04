INSERT INTO `permissions` (`id`, `name`, `description`) VALUES
('settings:view', 'View Settings', 'Can view site-wide settings'),
('settings:update', 'Update Settings', 'Can update site-wide settings'),
('users:view', 'View Users', 'Can view user list'),
('users:manage', 'Manage Users', 'Can create, edit, and delete users'),
('anime:create', 'Create Anime', 'Can add new anime titles'),
('anime:edit', 'Edit Anime', 'Can modify existing anime titles'),
('episode:manage', 'Manage Episodes', 'Can add/edit episodes and video sources'),
('genre:manage', 'Manage Genres', 'Can manage anime genres'),
('stats:view', 'View Statistics', 'Can view dashboard analytics');

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
('superadmin', 'Super Administrator', 'Has access to everything'),
('admin', 'Administrator', 'Can manage content and users'),
('editor', 'Editor', 'Can manage content only'),
('user', 'Member', 'Regular member');

INSERT INTO `role_permissions` (`role_id`, `permission_id`) VALUES
('superadmin', 'settings:view'), ('superadmin', 'settings:update'),
('superadmin', 'users:view'), ('superadmin', 'users:manage'),
('superadmin', 'anime:create'), ('superadmin', 'anime:edit'),
('superadmin', 'episode:manage'), ('superadmin', 'genre:manage'),
('superadmin', 'stats:view'),
('admin', 'settings:view'), ('admin', 'settings:update'),
('admin', 'users:view'), ('admin', 'users:manage'),
('admin', 'anime:create'), ('admin', 'anime:edit'),
('admin', 'episode:manage'), ('admin', 'genre:manage'),
('admin', 'stats:view'),
('editor', 'anime:create'), ('editor', 'anime:edit'),
('editor', 'episode:manage'), ('editor', 'genre:manage'),
('editor', 'stats:view');

INSERT INTO `profiles` (`id`, `username`, `display_name`, `avatar_url`, `role_id`, `password_hash`, `created_at`, `updated_at`) VALUES
('admin-uuid-001', 'goxstream', 'Gox Admin', 'https://avatars.githubusercontent.com/u/1', 'superadmin', 'ydiqbpakYnY8PzQrFFUidUfat6Ap9kwsLn5Bgm3b55/jVaqVYXcUt5pCV8PuvVId', (strftime('%s', 'now')), (strftime('%s', 'now')));

INSERT INTO `anime_statuses` (`id`, `name`, `color`) VALUES
('ongoing', 'Ongoing', 'primary'),
('completed', 'Completed', 'success'),
('upcoming', 'Upcoming', 'info'),
('hiatus', 'Hiatus', 'warning');

INSERT INTO `anime_types` (`id`, `name`) VALUES
('TV', 'TV Series'),
('Movie', 'Movie'),
('OVA', 'OVA'),
('ONA', 'ONA'),
('Special', 'Special');

INSERT INTO `seasons` (`id`, `name`) VALUES
('winter', 'Winter'),
('spring', 'Spring'),
('summer', 'Summer'),
('fall', 'Fall');

INSERT INTO `genres` (`id`, `name`, `slug`) VALUES
(1, 'Action', 'action'),
(2, 'Adventure', 'adventure'),
(3, 'Fantasy', 'fantasy'),
(4, 'Sci-Fi', 'sci-fi'),
(5, 'Supernatural', 'supernatural'),
(6, 'Comedy', 'comedy'),
(7, 'Drama', 'drama'),
(8, 'Psychological', 'psychological'),
(9, 'Shounen', 'shounen'),
(10, 'Romance', 'romance');

INSERT INTO `video_qualities` (`id`, `name`) VALUES
('360p', '360p'),
('480p', '480p'),
('720p', '720p HD'),
('1080p', '1080p FHD');

INSERT INTO `video_formats` (`id`, `name`) VALUES
('hls', 'HLS (.m3u8)'),
('mp4', 'MP4 (.mp4)'),
('dash', 'DASH (.mpd)');

INSERT INTO `bookmark_statuses` (`id`, `name`, `color`) VALUES
('watching', 'Watching', 'primary'),
('completed', 'Completed', 'success'),
('plan', 'Plan to Watch', 'gray'),
('dropped', 'Dropped', 'error');

INSERT INTO `site_settings` (`key`, `value`, `updated_at`) VALUES
('site_name', 'ZenithStream', (strftime('%s', 'now'))),
('site_description', 'Premium Anime Streaming Platform', (strftime('%s', 'now'))),
('theme_color', '#3b82f6', (strftime('%s', 'now'))),
('video_proxy_enabled', 'false', (strftime('%s', 'now')));

INSERT INTO `franchises` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
('franchise-sl', 'Solo Leveling', 'solo-leveling', (strftime('%s', 'now')), (strftime('%s', 'now'))),
('franchise-jjk', 'Jujutsu Kaisen', 'jujutsu-kaisen', (strftime('%s', 'now')), (strftime('%s', 'now'))),
('franchise-csm', 'Chainsaw Man', 'chainsaw-man', (strftime('%s', 'now')), (strftime('%s', 'now')));

INSERT INTO `anime` (`id`, `slug`, `title`, `synopsis`, `status_id`, `type_id`, `rating`, `score`, `year`, `season_id`, `poster_key`, `banner_key`, `total_episodes`, `franchise_id`, `franchise_order`, `created_at`, `updated_at`) VALUES
('anime-sl-s1', 'solo-leveling', 'Solo Leveling', 'Sung Jinwoo, hunter terlemah, mendapatkan kemampuan unik.', 'completed', 'TV', 'R-17', 9.0, 2024, 'winter', '/demo/demo-potrait.webp', '/demo/demo-landscape.webp', 12, 'franchise-sl', 1, (strftime('%s', 'now')), (strftime('%s', 'now'))),
('anime-jjk-s2', 'jujutsu-kaisen-s2', 'Jujutsu Kaisen Season 2', 'Insiden Shibuya dimulai.', 'completed', 'TV', 'R-17', 9.0, 2023, 'summer', '/demo/demo-potrait.webp', '/demo/demo-landscape.webp', 23, 'franchise-jjk', 2, (strftime('%s', 'now')), (strftime('%s', 'now'))),
('anime-csm-m1', 'chainsaw-man-movie', 'Chainsaw Man - The Movie: Reze Arc', 'Film layar lebar Chainsaw Man.', 'upcoming', 'Movie', 'R-17', 0, 2025, 'summer', '/demo/demo-potrait.webp', '/demo/demo-landscape.webp', 1, 'franchise-csm', 1, (strftime('%s', 'now')), (strftime('%s', 'now')));

INSERT INTO `anime_genres` (`anime_id`, `genre_id`) VALUES
('anime-sl-s1', 1), ('anime-sl-s1', 3),
('anime-jjk-s2', 1), ('anime-jjk-s2', 5),
('anime-csm-m1', 1), ('anime-csm-m1', 7);

INSERT INTO `episodes` (`id`, `anime_id`, `episode_number`, `title`, `synopsis`, `duration_seconds`, `thumbnail_key`, `view_count`, `created_at`) VALUES
('ep-sl-01', 'anime-sl-s1', 1, 'Episode 1', 'Awal mula sang hunter terkuat.', 1420, '/demo/demo-landscape.webp', 1250, (strftime('%s', 'now'))),
('ep-sl-02', 'anime-sl-s1', 2, 'Episode 2', 'Dungeon ganda yang mematikan.', 1420, '/demo/demo-landscape.webp', 1100, (strftime('%s', 'now')));

INSERT INTO `video_sources` (`id`, `episode_id`, `quality_id`, `format_id`, `file_key`, `url`, `is_primary`, `created_at`) VALUES
('src-sl-01-1080', 'ep-sl-01', '1080p', 'mp4', 'demo/1080p.mp4', 'https://cdn.zenith.dyzulk.net.eu.org/anime/demo/episode/1/1080p.mp4', 1, (strftime('%s', 'now'))),
('src-sl-01-720', 'ep-sl-01', '720p', 'mp4', 'demo/720p.mp4', 'https://cdn.zenith.dyzulk.net.eu.org/anime/demo/episode/1/720p.mp4', 0, (strftime('%s', 'now'))),
('src-sl-01-480', 'ep-sl-01', '480p', 'mp4', 'demo/480p.mp4', 'https://cdn.zenith.dyzulk.net.eu.org/anime/demo/episode/1/480p.mp4', 0, (strftime('%s', 'now'))),
('src-sl-01-360', 'ep-sl-01', '360p', 'mp4', 'demo/360p.mp4', 'https://cdn.zenith.dyzulk.net.eu.org/anime/demo/episode/1/360p.mp4', 0, (strftime('%s', 'now')));
