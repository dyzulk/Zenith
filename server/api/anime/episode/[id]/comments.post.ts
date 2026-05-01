export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const db = useDB(event)
  const episodeId = event.context.params?.id
  const body = await readBody(event)

  if (!episodeId || !body.body) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const commentId = crypto.randomUUID()
  const createdAt = new Date().toISOString()

  try {
    await db.prepare(`
      INSERT INTO comments (id, episode_id, user_id, body, is_spoiler, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      commentId,
      episodeId,
      user.id,
      body.body,
      body.is_spoiler ? 1 : 0,
      createdAt
    ).run()

    return {
      success: true,
      comment: {
        id: commentId,
        body: body.body,
        is_spoiler: !!body.is_spoiler,
        created_at: createdAt,
        user: {
          id: user.id,
          username: user.username,
          avatar_url: user.avatar_url,
          role: user.role
        }
      }
    }
  } catch (e: any) {
    throw createError({ statusCode: 500, statusMessage: e.message })
  }
})
