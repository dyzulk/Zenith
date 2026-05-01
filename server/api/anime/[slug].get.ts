export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')

  try {
    // Get Anime
    const anime = await db.prepare(
      'SELECT * FROM anime WHERE slug = ?'
    ).bind(slug).first()

    if (!anime) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Anime not found'
      })
    }

    // Get Episodes
    const { results: episodes } = await db.prepare(
      'SELECT * FROM episodes WHERE anime_id = ? ORDER BY episode_number ASC'
    ).bind(anime.id).all()

    // Format for UI
    return {
      ...anime,
      image: anime.poster_key ? `/api/r2/${anime.poster_key}` : 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800&q=80',
      banner: anime.banner_key ? `/api/r2/${anime.banner_key}` : 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=1600&q=80',
      genres: ['Action', 'Adventure', 'Fantasy'], // Static for now or fetch from anime_genres
      episodes: episodes.map((ep: any) => ({
        number: ep.episode_number,
        title: ep.title || `Episode ${ep.episode_number}`,
        thumbnail: ep.thumbnail_key ? `/api/r2/${ep.thumbnail_key}` : 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&q=80'
      }))
    }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})
