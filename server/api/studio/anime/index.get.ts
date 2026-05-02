export default defineEventHandler(async (event) => {
  const db = useDB(event)
  
  // Protect with admin check (you can also use a helper here)
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    const anime = await db.anime.findMany({
      orderBy: { createdAt: 'desc' },
      select: { 
        id: true, title: true, slug: true, status: true, 
        type: true, year: true, season: true, score: true, 
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
