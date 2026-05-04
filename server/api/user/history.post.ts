import { watchHistory } from "../../database/schema"

export default defineEventHandler(async (event) => {
  const user = useRequireAuth(event)

  const db = useD1(event)
  const body = await readBody(event)
  const { episode_id, progress, completed } = body

  if (!episode_id) {
    throw createError({ statusCode: 400, statusMessage: 'Episode ID is required' })
  }

  try {
    // Upsert watch history using Drizzle onConflictDoUpdate
    await db.insert(watchHistory)
      .values({
        userId: user.id,
        episodeId: episode_id,
        progress: progress || 0,
        completed: !!completed
      })
      .onConflictDoUpdate({
        target: [watchHistory.userId, watchHistory.episodeId],
        set: {
          progress: progress || 0,
          completed: !!completed,
          updatedAt: new Date()
        }
      })

    return {
      success: true
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Error saving history'
    })
  }
})


