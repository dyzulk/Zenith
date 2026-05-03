export const useZenithImage = () => {
  const normalize = (path: string) => {
    if (!path) return ''
    // Fix multiple slashes and ensure leading slash
    let clean = path.replace(/\/+/g, '/')
    if (!clean.startsWith('/')) clean = '/' + clean
    return clean
  }

  const resolve = (key?: string, url?: string, fallback?: string) => {
    const input = key || url
    if (!input) return fallback || ''

    if (input.startsWith('http')) return input

    let clean = normalize(input)

    // Special handling for local demo assets stored in public/demo
    // The seeder sometimes prefixes these with /api/r2/ or they come raw from DB
    if (clean.includes('/demo/')) {
      // If it's a demo path, we want it to be served directly from public/
      // Strip any /api/r2 prefix if present
      return clean.replace('/api/r2/', '/')
    }

    // If it's already a valid API route, return it
    if (clean.startsWith('/api/r2/')) return clean

    // Otherwise, assume it's a raw R2 key and prefix it
    return normalize(`/api/r2/${clean}`)
  }

  const getPoster = (anime: any) => {
    if (!anime) return '/img/placeholder-poster.jpg'
    return resolve(
      anime.poster_key || anime.posterKey,
      anime.poster_url || anime.posterUrl || anime.image,
      '/img/placeholder-poster.jpg'
    )
  }

  const getBanner = (anime: any) => {
    if (!anime) return '/img/placeholder-banner.jpg'
    return resolve(
      anime.banner_key || anime.bannerKey,
      anime.banner_url || anime.bannerUrl || anime.banner,
      '/img/placeholder-banner.jpg'
    )
  }

  const getThumbnail = (episode: any) => {
    if (!episode) return '/img/placeholder-ep.jpg'
    return resolve(
      episode.thumbnail_key || episode.thumbnailKey,
      episode.thumbnail_url || episode.thumbnailUrl || episode.thumbnail,
      '/img/placeholder-ep.jpg'
    )
  }

  const getAvatar = (user: any) => {
    if (!user) return '/img/default-avatar.png'
    return resolve(
      user.avatar_key || user.avatarKey,
      user.avatar_url || user.avatarUrl,
      '/img/default-avatar.png'
    )
  }

  return {
    getPoster,
    getBanner,
    getThumbnail,
    getAvatar,
    resolve
  }
}
