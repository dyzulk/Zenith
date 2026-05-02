export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const episodeId = event.context.params?.id
  const query = getQuery(event)
  const after = query.after as string

  if (!episodeId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing episode ID' })
  }

  try {
    const comments = await db.comment.findMany({
      where: {
        episodeId,
        isDeleted: false,
        ...(after ? { createdAt: { gt: new Date(after) } } : {})
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
            role: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    })

    // Format for frontend
    const formatted = comments.map((c: any) => ({
      id: c.id,
      body: c.body,
      is_spoiler: c.isSpoiler,
      created_at: c.createdAt,
      user: {
        id: c.userId,
        username: c.user.username,
        avatar_url: c.user.avatarUrl,
        role: c.user.role
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
