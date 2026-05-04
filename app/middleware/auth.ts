import type { Profile } from '@goxstream/shared'

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

  // 2. Permission Check
  if (to.meta.requiredPermission) {
    const { can } = useAppPermissions()
    
    // If user lacks permission, kick them to dashboard or home
    if (!can(to.meta.requiredPermission as string)) {
      return navigateTo('/studio') 
    }
  } else {
    // Fallback: If no specific permission is required, at least ensure they are staff
    // Usually 'user' role should not access studio at all.
    if (user.value.role === 'user') {
      return navigateTo('/')
    }
  }
})
