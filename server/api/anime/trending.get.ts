export default defineEventHandler(async (event) => {
  const db = useDB(event)

  try {
    const results = await db.anime.findMany({
      orderBy: { score: 'desc' },
      take: 4
    })

    return results.map((item: any) => ({
      ...item,
      image: item.posterKey ? `/api/r2/${item.posterKey}` : 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800&q=80',
      episodes: item.totalEpisodes || 0
    }))
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
