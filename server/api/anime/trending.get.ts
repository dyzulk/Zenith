export default defineEventHandler(async (event) => {
  const db = useDB(event)

  try {
    const { results } = await db.prepare(
      'SELECT * FROM anime ORDER BY score DESC LIMIT 4'
    ).all()

    return results.map((item: any) => ({
      ...item,
      image: item.poster_key ? `/api/r2/${item.poster_key}` : 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800&q=80',
      episodes: item.total_episodes || 0
    }))
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
