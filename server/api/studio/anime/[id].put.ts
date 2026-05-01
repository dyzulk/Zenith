export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const { 
    title, slug, synopsis, status, type, year, season, 
    poster_key, banner_key, score, genre_ids 
  } = body

  try {
    const statements = []
    
    // Update anime table
    statements.push(db.prepare(
      `UPDATE anime SET 
        title = ?, slug = ?, synopsis = ?, status = ?, 
        type = ?, year = ?, season = ?, poster_key = ?, 
        banner_key = ?, score = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
    ).bind(title, slug, synopsis, status, type, year, season, poster_key, banner_key, score, id))

    // Update genres (delete and re-insert)
    statements.push(db.prepare('DELETE FROM anime_genres WHERE anime_id = ?').bind(id))
    
    if (genre_ids && Array.isArray(genre_ids)) {
      for (const genreId of genre_ids) {
        statements.push(db.prepare('INSERT INTO anime_genres (anime_id, genre_id) VALUES (?, ?)').bind(id, genreId))
      }
    }

    await db.batch(statements)

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
