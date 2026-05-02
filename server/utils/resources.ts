import { useConfig } from './config'
import type { H3Event } from 'h3'

export const useResource = (event: H3Event) => {
  const config = useConfig(event)
  
  const getImageUrl = (key: string | null) => {
    if (!key) return null
    return key.startsWith('http') ? key : `https://${config.r2PublicDomain}/${key}`
  }

  return {
    /**
     * Transforms an anime database record into a clean API resource
     */
    anime: (anime: any) => ({
      id: anime.id,
      slug: anime.slug,
      title: anime.title,
      synopsis: anime.synopsis,
      status: anime.status,
      type: anime.type,
      rating: anime.rating,
      score: anime.score,
      year: anime.year,
      season: anime.season,
      poster: getImageUrl(anime.posterKey),
      banner: getImageUrl(anime.bannerKey),
      totalEpisodes: anime.totalEpisodes,
      createdAt: anime.createdAt,
      updatedAt: anime.updatedAt,
      // Optional relations
      ...(anime.genres ? { genres: anime.genres.map((g: any) => g.name) } : {}),
      ...(anime.episodes ? { episodes: anime.episodes.map((e: any) => ({
        id: e.id,
        number: e.number,
        title: e.title,
        thumbnail: getImageUrl(e.thumbnailKey),
        videoUrl: getImageUrl(e.videoKey),
        ...(e.subtitles ? { subtitles: e.subtitles } : {})
      })) } : {})
    }),

    /**
     * Transforms a user profile record into a clean API resource
     */
    user: (user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: getImageUrl(user.avatarKey),
      createdAt: user.createdAt
    }),

    /**
     * Helper to transform arrays of items
     */
    collection: function<T>(items: any[], formatter: (item: any) => T): T[] {
      return items.map(formatter)
    }
  }
}
