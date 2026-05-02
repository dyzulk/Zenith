export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const body = await readBody(event)
  
  // Get current user from cookie/session
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const { name, username, avatar, bio } = body

  try {
    await db.profile.update({
      where: { id: userId },
      data: {
        displayName: name,
        username,
        avatarUrl: avatar,
        // Bio isn't in the schema yet, but we'll ignore it or add it if needed
      }
    })

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
