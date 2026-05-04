import { eq, and, gt, desc } from 'drizzle-orm'
import { useD1 } from '../../../../utils/d1'
import { comments } from '../../../../database/schema'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const episodeId = event.context.params?.id
  const query = getQuery(event)
  const after = query.after as string

  if (!episodeId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing episode ID' })
  }

  try {
    const whereClause = [
      eq(comments.episodeId, episodeId),
      eq(comments.isDeleted, false)
    ]

    if (after) {
      whereClause.push(gt(comments.createdAt, new Date(after)))
    }

    const commentsData = await db.query.comments.findMany({
      where: and(...whereClause),
      with: {
        user: true
      },
      orderBy: [desc(comments.createdAt)],
      limit: 50
    })

    // Format for frontend
    const formatted = commentsData.map((c: any) => ({
      id: c.id,
      body: c.body,
      is_spoiler: c.isSpoiler,
      created_at: c.createdAt,
      user: {
        id: c.userId,
        username: c.user.username,
        avatar_url: c.user.avatarUrl,
        role: c.user.roleId
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
