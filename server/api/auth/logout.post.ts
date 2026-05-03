export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'zenith_auth')
  const db = useDB(event)
  
  if (sessionId) {
    try {
      await db.session.delete({ where: { id: sessionId } })
    } catch (e) {
      // Session already deleted or doesn't exist
    }
  }

  deleteCookie(event, 'zenith_auth')
  return {
    success: true,
    message: 'Logged out successfully'
  }
})
