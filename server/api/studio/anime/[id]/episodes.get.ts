export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const animeId = getRouterParam(event, 'id')
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    // Get episodes with their video sources count
    const episodes = await db.episode.findMany({
      where: { animeId },
      orderBy: { episodeNumber: 'asc' },
      include: {
        _count: {
          select: { videoSources: true }
        }
      }
    })

    return { 
      episodes: episodes.map(e => ({
        ...e,
        number: e.episodeNumber,
        source_count: e._count.videoSources
      })) 
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
