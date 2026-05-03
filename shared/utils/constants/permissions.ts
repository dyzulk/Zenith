export const PERMISSIONS = {
  // Anime & Content
  ANIME_VIEW: 'anime:view',
  ANIME_CREATE: 'anime:create',
  ANIME_EDIT: 'anime:edit',
  ANIME_DELETE: 'anime:delete',
  EPISODE_MANAGE: 'episode:manage',
  GENRE_MANAGE: 'genre:manage',

  // Users
  USERS_VIEW: 'users:view',
  USERS_EDIT: 'users:edit',
  USERS_BAN: 'users:ban',

  // Comments (Optional for future)
  COMMENTS_VIEW: 'comments:view',
  COMMENTS_DELETE: 'comments:delete',

  // Settings
  SETTINGS_SEO: 'settings:seo',
  SETTINGS_APPEARANCE: 'settings:appearance',
  SETTINGS_CORE: 'settings:core',
  SETTINGS_SECURITY: 'settings:security',
  SETTINGS_PERMISSIONS: 'settings:permissions'
} as const
