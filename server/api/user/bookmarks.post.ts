export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const db = useDB(event)
  const body = await readBody(event)
  const { anime_id, status, action } = body // action: 'add', 'remove', 'update'

  if (!anime_id) {
    throw createError({ statusCode: 400, statusMessage: 'Anime ID is required' })
  }

  try {
    if (action === 'remove') {
      await db.prepare('DELETE FROM bookmarks WHERE user_id = ? AND anime_id = ?')
        .bind(user.id, anime_id)
        .run()
      return { success: true, action: 'removed' }
    }

    // Default action: add/update
    await db.prepare(`
      INSERT INTO bookmarks (user_id, anime_id, status, added_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(user_id, anime_id) DO UPDATE SET
        status = excluded.status
    `).bind(user.id, anime_id, status || 'plan').run()

    return {
      success: true,
      action: 'saved',
      status: status || 'plan'
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Error updating bookmark'
    })
  }
})
