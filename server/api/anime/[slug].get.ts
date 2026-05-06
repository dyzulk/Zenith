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
      Promise.all(rawEpisodes.map(async (ep: any) => {
        let thumb = IMAGES.DEMO.LANDSCAPE
        if (ep.thumbnailKey) {
          thumb = (ep.thumbnailKey.startsWith('http') || ep.thumbnailKey.startsWith('/demo')) 
            ? ep.thumbnailKey 
            : await disk.getPublicUrl(ep.thumbnailKey)
        }
        return {
          id: ep.id,
          episodeNumber: ep.episodeNumber, // Konsisten dengan Sidebar
          title: ep.title || `Episode ${ep.episodeNumber}`,
          thumbnail_url: thumb // Konsisten dengan Sidebar
        }
      }))
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
