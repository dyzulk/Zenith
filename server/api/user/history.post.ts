export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const db = useDB(event)
  const body = await readBody(event)
  const { episode_id, progress, completed } = body

  if (!episode_id) {
    throw createError({ statusCode: 400, statusMessage: 'Episode ID is required' })
  }

  try {
    // Upsert watch history
    await db.prepare(`
      INSERT INTO watch_history (user_id, episode_id, progress, completed, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(user_id, episode_id) DO UPDATE SET
        progress = excluded.progress,
        completed = excluded.completed,
        updated_at = CURRENT_TIMESTAMP
    `).bind(user.id, episode_id, progress || 0, completed ? 1 : 0).run()

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
