import { eq, and, asc } from 'drizzle-orm'
import { anime, episodes as episodesTable } from "../../../../database/schema"
import { IMAGES } from '#shared/utils/constants/images'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const slug = getRouterParam(event, 'slug')
  const number = Number(getRouterParam(event, 'number'))

  try {
    // 1. Get Anime
    const animeData = await db.query.anime.findFirst({
      where: eq(anime.slug, slug as string)
    })

    if (!animeData) throw createError({ statusCode: 404, statusMessage: 'Anime not found' })

    // 2. Get Current Episode with Sources
    const episode = await db.query.episodes.findFirst({
      where: and(
        eq(episodesTable.animeId, animeData.id),
        eq(episodesTable.episodeNumber, number)
      ),
      with: {
        videoSources: true
      }
    })

    if (!episode) throw createError({ statusCode: 404, statusMessage: 'Episode not found' })

    // 3. Get All Episodes for Sidebar
    const allEpisodes = await db.query.episodes.findMany({
      where: eq(episodesTable.animeId, animeData.id),
      orderBy: [asc(episodesTable.episodeNumber)]
    })

    // 4. Format images and sources
    const disk = useStoragePublicUrl(event)
    const formatImage = (key: string | null, type: 'poster' | 'banner') => {
      if (!key) return type === 'poster' ? IMAGES.DEMO.POTRAIT : IMAGES.DEMO.LANDSCAPE
      if (key.startsWith('/demo') || key.startsWith('http')) return key
      return disk.getPublicUrl(key)
    }

    return {
      anime: {
        ...animeData,
        poster_url: formatImage(animeData.posterKey, 'poster'),
        banner_url: formatImage(animeData.bannerKey, 'banner')
      },
      episode: {
        ...episode,
        thumbnail_url: formatImage(episode.thumbnailKey, 'banner')
      },
      episodes: allEpisodes.map(ep => ({
        ...ep,
        thumbnail_url: formatImage(ep.thumbnailKey, 'banner')
      })),
      sources: episode.videoSources.map((s: any) => ({
        ...s,
        quality: s.qualityId, // Map for frontend
        url: s.url || disk.getPublicUrl(s.fileKey)
      })).sort((a: any, b: any) => b.quality.localeCompare(a.quality))
    }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})
