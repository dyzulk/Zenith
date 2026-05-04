import { eq, count, asc } from 'drizzle-orm'
import { genres, animeGenres } from "../../../database/schema"

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  
  // Fetch genres with anime count
  const results = await db.select({
    id: genres.id,
    name: genres.name,
    slug: genres.slug,
    anime_count: count(animeGenres.animeId)
  })
  .from(genres)
  .leftJoin(animeGenres, eq(genres.id, animeGenres.genreId))
  .groupBy(genres.id)
  .orderBy(asc(genres.name))

  return {
    genres: results
  }
})


