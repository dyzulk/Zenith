import { eq } from 'drizzle-orm'
import { sessions } from "../../database/schema"

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'gox_auth')
  const db = useD1(event)
  
  if (sessionId) {
    try {
      await db.delete(sessions).where(eq(sessions.id, sessionId))
    } catch (e) {
      // Session already deleted or doesn't exist
    }
  }

  deleteCookie(event, 'gox_auth')
  return {
    success: true,
    message: 'Logged out successfully'
  }
})


