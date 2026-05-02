export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const id = getRouterParam(event, 'id')
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    const anime = await db.prepare('SELECT * FROM anime WHERE id = ?').bind(id).first()
    if (!anime) throw createError({ statusCode: 404, statusMessage: 'Anime not found' })

    // Fetch associated genres
    const { results: genres } = await db.prepare(`
      SELECT g.id, g.name, g.slug 
      FROM genres g
      JOIN anime_genres ag ON g.id = ag.genre_id
      WHERE ag.anime_id = ?
    `).bind(id).all()

    return { anime, genres }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})
