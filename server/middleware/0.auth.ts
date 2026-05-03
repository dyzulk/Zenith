export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  const cookieToken = getCookie(event, 'zenith_auth')
  
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
      const db = useDB(event)
      let userId: string | null = null

      // Check ApiToken table if Bearer, else check Session table
      if (isBearer) {
        const apiToken = await db.apiToken.findUnique({ where: { id: token } })
        if (apiToken) {
          userId = apiToken.userId
          // Optional: Update lastUsed asynchronously without blocking
          db.apiToken.update({ where: { id: token }, data: { lastUsed: new Date() } }).catch(() => {})
        }
      } else {
        const session = await db.session.findUnique({ where: { id: token } })
        if (session) {
          userId = session.userId
          // Optional: Update lastUsed asynchronously without blocking
          db.session.update({ where: { id: token }, data: { lastUsed: new Date() } }).catch(() => {})
        }
      }

      if (userId) {
        const user = await db.profile.findUnique({
          where: { id: userId },
          include: {
            role: {
              include: {
                permissions: {
                  select: { permissionId: true }
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
