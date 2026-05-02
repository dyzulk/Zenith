export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    return { recent: [] }
  }

  const db = useDB(event)

  try {
    // Get last 10 unique anime from watch history
    // We group by anime_id to only show the most recent episode watched for each anime
    const recent = await db.prepare(`
      SELECT 
        a.id, a.title, a.slug, a.poster_key,
        e.id as episode_id, e.episode_number, e.title as episode_title,
        wh.progress, wh.completed, wh.updated_at
      FROM watch_history wh
      JOIN episodes e ON wh.episode_id = e.id
      JOIN anime a ON e.anime_id = a.id
      WHERE wh.user_id = ?
      ORDER BY wh.updated_at DESC
      LIMIT 10
    `).bind(user.id).all()

    return {
      recent: recent.results
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Error fetching recent activity'
    })
  }
})
