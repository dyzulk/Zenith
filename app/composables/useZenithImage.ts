export const useZenithImage = () => {
  const getPoster = (anime: any) => {
    if (anime.poster_key) return `/api/r2/${anime.poster_key}`
    return anime.poster_url || anime.image || '/img/placeholder-poster.jpg'
  }

  const getBanner = (anime: any) => {
    if (anime.banner_key) return `/api/r2/${anime.banner_key}`
    return anime.banner_url || anime.banner || '/img/placeholder-banner.jpg'
  }

  const getThumbnail = (episode: any) => {
    if (episode.thumbnail_key) return `/api/r2/${episode.thumbnail_key}`
    return episode.thumbnail_url || episode.thumbnail || '/img/placeholder-ep.jpg'
  }

  const getAvatar = (user: any) => {
    if (!user) return '/img/default-avatar.png'
    if (user.avatar_key) return `/api/r2/${user.avatar_key}`
    return user.avatar_url || '/img/default-avatar.png'
  }

  return {
    getPoster,
    getBanner,
    getThumbnail,
    getAvatar
  }
}
