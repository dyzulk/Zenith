import { eq, and } from 'drizzle-orm'
import { useD1 } from '../../utils/d1'
import { bookmarks } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const user = useRequireAuth(event)

  const db = useD1(event)
  const body = await readBody(event)
  const { anime_id, status, action } = body // action: 'add', 'remove', 'update'

  if (!anime_id) {
    throw createError({ statusCode: 400, statusMessage: 'Anime ID is required' })
  }

  try {
    if (action === 'remove') {
      await db.delete(bookmarks).where(
        and(
          eq(bookmarks.userId, user.id),
          eq(bookmarks.animeId, anime_id)
        )
      )
      return { success: true, action: 'removed' }
    }

    // Default action: add/update using onConflictDoUpdate
    await db.insert(bookmarks)
      .values({
        userId: user.id,
        animeId: anime_id,
        statusId: status || 'plan'
      })
      .onConflictDoUpdate({
        target: [bookmarks.userId, bookmarks.animeId],
        set: {
          statusId: status || 'plan',
          updatedAt: new Date()
        }
      })

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

