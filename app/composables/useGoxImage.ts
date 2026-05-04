import { IMAGES } from '#shared/utils/constants/images'

export const useGoxImage = () => {
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
    // The seeder sometimes prefixes these with /api/storage/ or they come raw from DB
    if (clean.includes('/demo/')) {
      // If it's a demo path, we want it to be served directly from public/
      // Strip any /api/storage prefix if present
      return clean.replace('/api/storage/', '/')
    }

    // If it's already a valid API route, return it
    if (clean.startsWith('/api/storage/')) return clean

    // Otherwise, assume it's a raw storage key and prefix it
    return normalize(`/api/storage/${clean}`)
  }

  const getPoster = (anime: any) => {
    if (!anime) return IMAGES.PLACEHOLDER.POSTER
    return resolve(
      anime.poster_key || anime.posterKey,
      anime.poster_url || anime.posterUrl || anime.image,
      IMAGES.PLACEHOLDER.POSTER
    )
  }

  const getBanner = (anime: any) => {
    if (!anime) return IMAGES.PLACEHOLDER.BANNER
    return resolve(
      anime.banner_key || anime.bannerKey,
      anime.banner_url || anime.bannerUrl || anime.banner,
      IMAGES.PLACEHOLDER.BANNER
    )
  }

  const getThumbnail = (episode: any) => {
    if (!episode) return IMAGES.PLACEHOLDER.EPISODE
    return resolve(
      episode.thumbnail_key || episode.thumbnailKey,
      episode.thumbnail_url || episode.thumbnailUrl || episode.thumbnail,
      IMAGES.PLACEHOLDER.EPISODE
    )
  }

  const getAvatar = (user: any) => {
    if (!user) return IMAGES.PLACEHOLDER.AVATAR
    return resolve(
      user.avatar_key || user.avatarKey,
      user.avatar_url || user.avatarUrl,
      IMAGES.PLACEHOLDER.AVATAR
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
