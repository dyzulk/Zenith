import { eq, and } from 'drizzle-orm'
import { apiTokens } from "../../../database/schema"

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const user = useRequireAuth(event)
  const body = await readBody(event)

  if (!body.id || typeof body.id !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Token ID is required' })
  }

  // Find and delete the token
  // Ensure we only delete if it belongs to the current user!
  const result = await db.delete(apiTokens)
    .where(
      and(
        eq(apiTokens.id, body.id),
        eq(apiTokens.userId, user.id)
      )
    )
    .run()

  if (result.meta.changes === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Token not found or unauthorized' })
  }

  return {
    success: true,
    message: 'API Key revoked successfully'
  }
})


