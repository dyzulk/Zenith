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
          orderBy: (episodes, { asc }) => [asc(episodes.episodeNumber)]
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
    
    // Defensive check for relations
    const rawEpisodes = animeData.episodes || []
    const rawGenres = animeData.genres || []

    const [image, banner, episodes] = await Promise.all([
      animeData.posterKey ? (animeData.posterKey.startsWith('http') || animeData.posterKey.startsWith('/demo') ? animeData.posterKey : await disk.getPublicUrl(animeData.posterKey)) : IMAGES.DEMO.POTRAIT,
      animeData.bannerKey ? (animeData.bannerKey.startsWith('http') || animeData.bannerKey.startsWith('/demo') ? animeData.bannerKey : await disk.getPublicUrl(animeData.bannerKey)) : IMAGES.DEMO.LANDSCAPE,
      Promise.all(rawEpisodes.map(async (ep: any) => ({
        id: ep.id,
        number: ep.episodeNumber,
        title: ep.title || `Episode ${ep.episodeNumber}`,
        thumbnail: ep.thumbnailKey ? await disk.getPublicUrl(ep.thumbnailKey) : 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&q=80'
      })))
    ])

    return {
      ...animeData,
      image,
      banner,
      genres: rawGenres.map((g: any) => g.genre?.name || 'Unknown'),
      episodes
    }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})
