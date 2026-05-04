import { desc } from 'drizzle-orm'
import { useD1 } from '../../../utils/d1'
import { anime } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  
  // Protect with admin check
  useGate(event).authorize('anime:edit')

  try {
    const animeData = await db.query.anime.findMany({
      orderBy: [desc(anime.createdAt)],
      columns: { 
        id: true, title: true, slug: true, statusId: true, 
        typeId: true, year: true, seasonId: true, score: true, 
        totalEpisodes: true, createdAt: true 
      }
    })

    return { anime: animeData }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})

