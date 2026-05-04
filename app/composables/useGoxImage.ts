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
    const { settings } = usePublicSettings()
    const input = key || url
    if (!input) return fallback || ''

    if (input.startsWith('http')) return input

    let clean = normalize(input)

    // Special handling for local demo assets stored in public/demo
    if (clean.includes('/demo/')) {
      return clean.replace('/api/storage/', '/')
    }

    // If it's already a valid API route, return it
    if (clean.startsWith('/api/storage/')) {
      if (settings.video_proxy_enabled) return clean
      // If proxy is OFF but it was proxied, try to extract key
      clean = clean.replace('/api/storage/', '')
    }

    // Proxy is ON
    if (settings.video_proxy_enabled) {
      return normalize(`/api/storage/${clean}`)
    }

    // Proxy is OFF, use Public URL if available
    if (settings.r2_public_url) {
      const base = settings.r2_public_url.replace(/\/$/, '')
      return `${base}/${clean.replace(/^\//, '')}`
    }

    // Fallback to local storage if no public URL
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
