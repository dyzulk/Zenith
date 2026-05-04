import { eq, desc } from 'drizzle-orm'
import { useD1 } from '../../utils/d1'
import { watchHistory } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    return { recent: [] }
  }

  const db = useD1(event)

  try {
    // Get last 10 records from watch history
    const recentData = await db.query.watchHistory.findMany({
      where: eq(watchHistory.userId, user.id),
      orderBy: [desc(watchHistory.updatedAt)],
      limit: 10,
      with: {
        episode: {
          with: {
            anime: true
          }
        }
      }
    })

    return {
      recent: recentData.map(wh => ({
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

