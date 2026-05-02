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
    // Basic search using contains for title and synopsis
    const results = await db.anime.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { synopsis: { contains: q, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        title: true,
        slug: true,
        posterKey: true,
        synopsis: true,
        status: true,
        type: true,
        year: true
      },
      orderBy: [
        { title: 'asc' },
        { year: 'desc' }
      ],
      take: 20
    })

    return {
      query: q,
      results
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Error performing search'
    })
  }
})
