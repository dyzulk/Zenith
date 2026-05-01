export default defineEventHandler(async (event) => {
  const db = useDB(event)
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    const [animeCount, episodeCount, userCount, genreCount] = await Promise.all([
      db.prepare('SELECT COUNT(*) as count FROM anime').first('count'),
      db.prepare('SELECT COUNT(*) as count FROM episodes').first('count'),
      db.prepare('SELECT COUNT(*) as count FROM profiles').first('count'),
      db.prepare('SELECT COUNT(*) as count FROM genres').first('count')
    ])

    const recentAnime = await db.prepare(`
      SELECT id, title, slug, poster_key, created_at 
      FROM anime 
      ORDER BY created_at DESC 
      LIMIT 5
    `).all()

    const recentEpisodes = await db.prepare(`
      SELECT e.id, e.episode_number, e.title, a.title as anime_title, e.created_at
      FROM episodes e
      JOIN anime a ON e.anime_id = a.id
      ORDER BY e.created_at DESC
      LIMIT 5
    `).all()

    return {
      animeCount,
      episodeCount,
      userCount,
      genreCount,
      recentAnime: recentAnime.results,
      recentEpisodes: recentEpisodes.results
    }
  } catch (e: any) {
    return {
      animeCount: 0,
      episodeCount: 0,
      userCount: 0,
      genreCount: 0,
      recentAnime: [],
      recentEpisodes: []
    }
  }
})
