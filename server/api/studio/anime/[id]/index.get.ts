import { eq } from 'drizzle-orm'
import { useD1 } from '../../../../utils/d1'
import { anime } from '../../../../database/schema'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const id = getRouterParam(event, 'id')
  
  // Protect with admin check
  useGate(event).authorize('anime:edit')

  try {
    const animeData = await db.query.anime.findFirst({
      where: eq(anime.id, id as string),
      with: {
        genres: {
          with: {
            genre: true
          }
        }
      }
    })
    
    if (!animeData) throw createError({ statusCode: 404, statusMessage: 'Anime not found' })

    const genres = animeData.genres.map(ag => ag.genre)
    // Remove the junction table data from the anime object for cleaner response
    const { genres: _, ...cleanAnime } = animeData

    return { anime: cleanAnime, genres }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})
