import { eq, asc } from 'drizzle-orm'
import { anime } from "../../database/schema"
import { IMAGES } from '#shared/utils/constants/images'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const slug = getRouterParam(event, 'slug')

  try {
    // Get Anime with Episodes and Genres
    const animeData = await db.query.anime.findFirst({
      where: eq(anime.slug, slug as string),
      with: {
        episodes: {
          orderBy: [asc(anime.episodes.episodeNumber)]
        },
        genres: {
          with: {
            genre: true
          }
        }
      }
    })
 
    if (!animeData) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Anime not found'
      })
    }
 
    // Format for UI
    const disk = useStoragePublicUrl(event)
    return {
      ...animeData,
      image: animeData.posterKey ? (animeData.posterKey.startsWith('http') || animeData.posterKey.startsWith('/demo') ? animeData.posterKey : disk.getPublicUrl(animeData.posterKey)) : IMAGES.DEMO.POTRAIT,
      banner: animeData.bannerKey ? (animeData.bannerKey.startsWith('http') || animeData.bannerKey.startsWith('/demo') ? animeData.bannerKey : disk.getPublicUrl(animeData.bannerKey)) : IMAGES.DEMO.LANDSCAPE,
      genres: animeData.genres.map(g => g.genre.name),
      episodes: animeData.episodes.map((ep: any) => ({
        id: ep.id,
        number: ep.episodeNumber,
        title: ep.title || `Episode ${ep.episodeNumber}`,
        thumbnail: ep.thumbnailKey ? disk.getPublicUrl(ep.thumbnailKey) : 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&q=80'
      }))
    }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})
