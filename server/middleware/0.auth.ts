export default defineEventHandler(async (event) => {
  const userId = getCookie(event, 'zenith_auth')
  
  if (userId) {
    const db = useDB(event)
    const user = await db.profile.findUnique({
      where: { id: userId }
    })
    
    if (user) {
      event.context.user = user
    }
  }
})
