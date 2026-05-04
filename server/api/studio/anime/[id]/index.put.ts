import { eq } from 'drizzle-orm'
import { anime, animeGenres } from "../../../../database/schema"

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const id = getRouterParam(event, 'id') as string
  const body = await readBody(event)
  
  // Protect with admin check
  useGate(event).authorize('anime:edit')

  const { 
    title, slug, synopsis, status, type, year, season, 
    poster_key, banner_key, score, genre_ids 
  } = body

  try {
    await db.transaction(async (tx) => {
      // 1. Update Anime Basic Info
      await tx.update(anime)
        .set({
          title,
          slug,
          synopsis,
          statusId: status,
          typeId: type,
          year: year ? parseInt(year) : null,
          seasonId: season,
          posterKey: poster_key,
          bannerKey: banner_key,
          score: score ? parseFloat(score) : 0,
          updatedAt: new Date()
        })
        .where(eq(anime.id, id))

      // 2. Update Genres (Many-to-Many)
      // Delete old relations
      await tx.delete(animeGenres).where(eq(animeGenres.animeId, id))
      
      // Add new relations
      if (genre_ids && genre_ids.length > 0) {
        const relations = genre_ids.map((genreId: number) => ({
          animeId: id,
          genreId
        }))
        await tx.insert(animeGenres).values(relations)
      }
    })

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
