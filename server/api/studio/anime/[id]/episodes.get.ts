export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const animeId = getRouterParam(event, 'id')
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    // Get episodes with their video sources count
    const { results: episodes } = await db.prepare(`
      SELECT e.*, 
      (SELECT COUNT(*) FROM video_sources vs WHERE vs.episode_id = e.id) as source_count
      FROM episodes e 
      WHERE e.anime_id = ? 
      ORDER BY e.number ASC
    `).bind(animeId).all()

    return { episodes }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
