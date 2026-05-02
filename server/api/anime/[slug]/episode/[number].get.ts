export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')
  const number = Number(getRouterParam(event, 'number'))

  try {
    // Get Anime with Current Episode and Sidebar Episodes
    const anime = await db.anime.findUnique({
      where: { slug },
      include: {
        episodes: {
          orderBy: { episodeNumber: 'asc' },
          include: {
            videoSources: {
              orderBy: { quality: 'desc' }
            }
          }
        }
      }
    })

    if (!anime) throw createError({ statusCode: 404, statusMessage: 'Anime not found' })

    const episode = anime.episodes.find((e: any) => e.episodeNumber === number)
    if (!episode) throw createError({ statusCode: 404, statusMessage: 'Episode not found' })

    return {
      anime,
      episode,
      episodes: anime.episodes,
      sources: episode.videoSources.map((s: any) => ({
        ...s,
        url: s.url || `/api/r2/${s.r2Key}`
      }))
    }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})
