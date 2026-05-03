export default defineEventHandler(async (event) => {
  const db = await useDB(event)
  const user = useRequireAuth(event)
  const body = await readBody(event)

  if (!body.id || typeof body.id !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Token ID is required' })
  }

  // Find and delete the token
  // Ensure we only delete if it belongs to the current user!
  const deleted = await db.apiToken.deleteMany({
    where: { 
      id: body.id,
      userId: user.id 
    }
  })

  if (deleted.count === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Token not found or unauthorized' })
  }

  return {
    success: true,
    message: 'API Key revoked successfully'
  }
})

