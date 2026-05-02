
export default defineEventHandler(async (event) => {
  const db = useDB(event)
  
  // Fetch genres with anime count
  const genres = await db.prepare(`
    SELECT g.*, 
    (SELECT COUNT(*) FROM anime_genres WHERE genre_id = g.id) as anime_count
    FROM genres g
    ORDER BY g.name ASC
  `).all()

  return {
    genres: genres.results
  }
})
