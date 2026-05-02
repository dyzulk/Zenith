export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const userId = getCookie(event, 'zenith_auth')

  if (!userId) {
    return { user: null }
  }

  try {
    const user = await db.prepare('SELECT id, username, display_name, role, avatar_url FROM profiles WHERE id = ?')
      .bind(userId)
      .first()

    return { user }
  } catch (e) {
    return { user: null }
  }
})
