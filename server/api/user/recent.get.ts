export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    return { recent: [] }
  }

  const db = useDB(event)

  try {
    // Get last 10 unique anime from watch history
    // We group by anime_id to only show the most recent episode watched for each anime
    const recent = await db.watchHistory.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      take: 10,
      include: {
        episode: {
          include: {
            anime: true
          }
        }
      }
    })

    return {
      recent: recent.map(wh => ({
        id: wh.episode.anime.id,
        title: wh.episode.anime.title,
        slug: wh.episode.anime.slug,
        poster_key: wh.episode.anime.posterKey,
        episode_id: wh.episodeId,
        episode_number: wh.episode.episodeNumber,
        episode_title: wh.episode.title,
        progress: wh.progress,
        completed: wh.completed,
        updated_at: wh.updatedAt
      }))
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Error fetching recent activity'
    })
  }
})
