import { eq } from 'drizzle-orm'
import { profiles, apiTokens, sessions } from "../database/schema"

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  const cookieToken = getCookie(event, 'gox_auth')
  
  let token = ''
  let isBearer = false

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7)
    isBearer = true
  } else if (cookieToken) {
    token = cookieToken
  }

  if (token) {
    try {
      const db = useD1(event)
      let userId: string | null = null

      // Check ApiToken table if Bearer, else check Session table
      if (isBearer) {
        const tokenData = await db.query.apiTokens.findFirst({
          where: eq(apiTokens.id, token)
        })
        if (tokenData) {
          userId = tokenData.userId
          // Optional: Update lastUsed asynchronously without blocking
          Promise.resolve(
            db.update(apiTokens)
              .set({ lastUsed: new Date() })
              .where(eq(apiTokens.id, token))
          ).catch(() => {})
        }
      } else {
        const sessionData = await db.query.sessions.findFirst({
          where: eq(sessions.id, token)
        })
        if (sessionData) {
          userId = sessionData.userId
          // Optional: Update lastUsed asynchronously without blocking
          Promise.resolve(
            db.update(sessions)
              .set({ lastUsed: new Date() })
              .where(eq(sessions.id, token))
          ).catch(() => {})
        }
      }

      if (userId) {
        const user = await db.query.profiles.findFirst({
          where: eq(profiles.id, userId),
          with: {
            role: {
              with: {
                permissions: {
                  columns: {
                    permissionId: true
                  }
                }
              }
            }
          }
        })
        
        if (user) {
          event.context.user = user
        }
      }
    } catch (e) {
      console.error('[Middleware Auth Error]', e)
    }
  }
})

