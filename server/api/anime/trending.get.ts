export default defineEventHandler(async (event) => {
  const db = useDB(event)

  try {
    const results = await db.anime.findMany({
      orderBy: { score: 'desc' },
      take: 4
    })

    return results.map((item: any) => ({
      ...item,
      image: item.posterKey ? (item.posterKey.startsWith('http') || item.posterKey.startsWith('/demo') ? item.posterKey : `/api/r2/${item.posterKey}`) : '/demo/demo-potrait.jfif',
      episodes: item.totalEpisodes || 0
    }))
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
