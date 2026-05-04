export default defineEventHandler(async (event) => {
  const user = event.context.user

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
      permissions: user.role?.permissions?.map((p: any) => p.permissionId) || []
    }
  }
})

