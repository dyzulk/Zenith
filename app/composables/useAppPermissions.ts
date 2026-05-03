export const useAppPermissions = () => {
  const { user } = useAuth()
  
  const can = (permissionKey: string): boolean => {
    // If not logged in, deny
    if (!user.value) return false
    
    // Superadmin bypass
    if (user.value.role === 'superadmin') return true
    
    // Check if permission string exists in the user's permissions array
    if (Array.isArray(user.value.permissions)) {
      return user.value.permissions.includes(permissionKey)
    }

    return false
  }

  return { can }
}
