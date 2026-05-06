import { asc } from 'drizzle-orm'
import { genres, animeStatuses, animeTypes, seasons } from "../../database/schema"

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  
  try {
    const [genresData, statusesData, typesData, seasonsData] = await Promise.all([
      db.select().from(genres).orderBy(asc(genres.name)),
      db.select().from(animeStatuses).orderBy(asc(animeStatuses.name)),
      db.select().from(animeTypes).orderBy(asc(animeTypes.name)),
      db.select().from(seasons).orderBy(asc(seasons.name))
    ])

    // Format for USelectMenu (using label and value/slug/id)
    return {
      genres: genresData,
      statuses: statusesData.map(s => ({ label: s.name, value: s.id, color: s.color })),
      types: typesData.map(t => ({ label: t.name, value: t.id })),
      seasons: seasonsData.map(s => ({ label: s.name, value: s.id }))
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Error fetching options data'
    })
  }
})
