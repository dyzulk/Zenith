export default defineEventHandler(async (event) => {
  const user = useRequireAuth(event)

  const db = useDB(event)
  const body = await readBody(event)
  const { episode_id, progress, completed } = body

  if (!episode_id) {
    throw createError({ statusCode: 400, statusMessage: 'Episode ID is required' })
  }

  try {
    // Upsert watch history
    await db.watchHistory.upsert({
      where: {
        userId_episodeId: {
          userId: user.id,
          episodeId: episode_id
        }
      },
      update: {
        progress: progress || 0,
        completed: !!completed,
        updatedAt: new Date()
      },
      create: {
        userId: user.id,
        episodeId: episode_id,
        progress: progress || 0,
        completed: !!completed
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
