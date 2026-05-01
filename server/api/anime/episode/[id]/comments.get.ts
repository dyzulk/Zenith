export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const episodeId = event.context.params?.id
  const query = getQuery(event)
  const after = query.after as string

  if (!episodeId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing episode ID' })
  }

  try {
    let sql = `
      SELECT c.*, p.username, p.avatar_url, p.role
      FROM comments c
      LEFT JOIN profiles p ON c.user_id = p.id
      WHERE c.episode_id = ? AND c.is_deleted = 0
    `
    const params: any[] = [episodeId]

    if (after) {
      sql += ` AND c.created_at > ?`
      params.push(after)
    }

    sql += ` ORDER BY c.created_at DESC LIMIT 50`

    const comments = await db.prepare(sql).bind(...params).all()

    // Format for frontend
    const formatted = comments.results.map((c: any) => ({
      id: c.id,
      body: c.body,
      is_spoiler: c.is_spoiler === 1,
      created_at: c.created_at,
      user: {
        id: c.user_id,
        username: c.username,
        avatar_url: c.avatar_url,
        role: c.role
      }
    }))

    return {
      comments: formatted
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Error fetching comments'
    })
  }
})
