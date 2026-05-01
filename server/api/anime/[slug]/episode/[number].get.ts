export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')
  const number = Number(getRouterParam(event, 'number'))

  try {
    // 1. Get Anime
    const anime = await db.prepare(
      'SELECT * FROM anime WHERE slug = ?'
    ).bind(slug).first()

    if (!anime) throw createError({ statusCode: 404, statusMessage: 'Anime not found' })

    // 2. Get All Episodes for the sidebar
    const { results: episodes } = await db.prepare(
      'SELECT * FROM episodes WHERE anime_id = ? ORDER BY episode_number ASC'
    ).bind(anime.id).all()

    // 3. Get Current Episode
    const episode = episodes.find((e: any) => e.episode_number === number)
    if (!episode) throw createError({ statusCode: 404, statusMessage: 'Episode not found' })

    // 4. Get Video Sources for the player
    const { results: sources } = await db.prepare(
      'SELECT * FROM video_sources WHERE episode_id = ? ORDER BY quality DESC'
    ).bind(episode.id).all()

    return {
      anime,
      episode,
      episodes,
      sources: sources.map((s: any) => ({
        ...s,
        url: s.url || `/api/r2/${s.r2_key}`
      }))
    }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})
