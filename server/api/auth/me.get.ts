export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const userId = getCookie(event, 'zenith_auth')

  if (!userId) {
    return { user: null }
  }

  try {
    const user = await db.profile.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        displayName: true,
        roleId: true,
        avatarUrl: true,
        role: {
          include: {
            permissions: {
              select: { permissionId: true }
            }
          }
        }
      }
    })

    if (!user) {
      return { user: null }
    }

    return { 
      user: {
        id: user.id,
        username: user.username,
        display_name: user.displayName,
        role: user.roleId,
        avatar_url: user.avatarUrl,
        permissions: user.role?.permissions?.map(p => p.permissionId) || []
      }
    }
  } catch (e) {
    return { user: null }
  }
})
