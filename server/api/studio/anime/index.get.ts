export default defineEventHandler(async (event) => {
  const db = await useDB(event)
  
  // Protect with admin check
  useGate(event).authorize('anime:edit')

  try {
    const anime = await db.anime.findMany({
      orderBy: { createdAt: 'desc' },
      select: { 
        id: true, title: true, slug: true, statusId: true, 
        typeId: true, year: true, seasonId: true, score: true, 
        totalEpisodes: true, createdAt: true 
      }
    })

    return { anime }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})

