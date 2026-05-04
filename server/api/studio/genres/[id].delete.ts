import { eq } from 'drizzle-orm'
import { useD1 } from '../../../utils/d1'
import { genres } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const id = getRouterParam(event, 'id')

  try {
    await db.delete(genres).where(eq(genres.id, parseInt(id as string)))
    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Failed to delete genre'
    })
  }
})
