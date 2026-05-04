import { useD1 } from '../../../../utils/d1'
import { comments } from '../../../../database/schema'

export default defineEventHandler(async (event) => {
  const user = useRequireAuth(event)
  const db = useD1(event)
  const episodeId = event.context.params?.id
  const body = await readBody(event)

  if (!episodeId || !body.body) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const commentId = crypto.randomUUID()

  try {
    const newComment = {
      id: commentId,
      episodeId,
      userId: user.id,
      body: body.body,
      isSpoiler: !!body.is_spoiler,
      createdAt: new Date()
    }

    await db.insert(comments).values(newComment)
    
    const formattedComment = {
      id: newComment.id,
      body: newComment.body,
      is_spoiler: newComment.isSpoiler,
      created_at: newComment.createdAt,
      user: {
        id: user.id,
        username: user.username,
        avatar_url: user.avatarUrl,
        role: user.roleId
      }
    }

    // Trigger Broadcast Event for real-time update
    const broadcast = useBroadcast(event)
    await broadcast.channel(`episode-${episodeId}`).emit('comment_received', formattedComment)

    return {
      success: true,
      comment: formattedComment
    }
  } catch (e: any) {
    throw createError({ statusCode: 500, statusMessage: e.message })
  }
})
