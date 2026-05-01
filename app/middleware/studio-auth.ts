import type { Profile } from '@zenith/shared'

export default defineNuxtRouteMiddleware(async (to) => {
  const { user, fetchUser } = useAuth()

  // Ensure user is loaded
  if (!user.value) {
    await fetchUser()
  }

  // 1. Check if user is logged in
  if (!user.value) {
    return navigateTo('/')
  }

  // 2. RBAC Check
  const allowedRoles = ['superadmin', 'admin', 'editor']
  
  if (!allowedRoles.includes(user.value.role)) {
    return navigateTo('/')
  }
})
