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
    const comment = await db.comment.create({
      data: {
        id: commentId,
        episodeId,
        userId: user.id,
        body: body.body,
        isSpoiler: !!body.is_spoiler,
        createdAt: new Date()
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
      }
    })
    
    // Trigger Pusher Event for real-time update
    const pusher = usePusher(event)
    if (pusher) {
      await pusher.trigger(`episode-${episodeId}`, 'comment_received', {
        id: comment.id,
        body: comment.body,
        is_spoiler: comment.isSpoiler,
        created_at: comment.createdAt,
        user: {
          id: comment.user.id,
          username: comment.user.username,
          avatar_url: comment.user.avatarUrl,
          role: comment.user.role
        }
      })
    }

    return {
      success: true,
      comment: {
        id: comment.id,
        body: comment.body,
        is_spoiler: comment.isSpoiler,
        created_at: comment.createdAt,
        user: {
          id: comment.user.id,
          username: comment.user.username,
          avatar_url: comment.user.avatarUrl,
          role: comment.user.role
        }
      }
    }
  } catch (e: any) {
    throw createError({ statusCode: 500, statusMessage: e.message })
  }
})
