export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const query = getQuery(event)
  const q = query.q as string

  if (!q || q.length < 2) {
    return {
      results: []
    }
  }

  try {
    // Basic search using LIKE for title and synopsis
    // We search across multiple fields for better results
    const results = await db.prepare(`
      SELECT id, title, slug, poster_key, synopsis, status, type, year
      FROM anime 
      WHERE title LIKE ? 
         OR synopsis LIKE ?
      ORDER BY 
        CASE 
          WHEN title LIKE ? THEN 1 
          ELSE 2 
        END,
        year DESC
      LIMIT 20
    `).bind(`%${q}%`, `%${q}%`, `${q}%`).all()

    return {
      query: q,
      results: results.results
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Error performing search'
    })
  }
})
