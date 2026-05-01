export default defineEventHandler(async (event) => {
  const userId = getCookie(event, 'zenith_auth')
  
  if (userId) {
    const db = useDB(event)
    const user = await db.prepare(
      'SELECT * FROM profiles WHERE id = ?'
    ).bind(userId).first()
    
    if (user) {
      event.context.user = user
    }
  }
})
