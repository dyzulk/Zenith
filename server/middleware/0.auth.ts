export default defineEventHandler(async (event) => {
  const userId = getCookie(event, 'zenith_auth')
  
  if (userId) {
    try {
      const db = useDB(event)
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
    } catch (e) {
      console.error('[Middleware Auth Error]', e)
    }
  }
})
