export const useAuth = () => {
  const user = useState<any>('auth_user', () => null)
  const initialized = useState<boolean>('auth_initialized', () => false)

  const fetchUser = async () => {
    if (initialized.value && user.value) return

    try {
      const headers = useRequestHeaders(['cookie'])
      const data: any = await $fetch('/api/auth/me', { headers })
      if (data && data.user) {
        user.value = data.user
      }
    } catch {
      user.value = null
    } finally {
      initialized.value = true
    }
  }

  const login = async (credentials: { username: string; password?: string }) => {
    try {
      const data: any = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      user.value = data.user
      return data.user
    } catch (e: any) {
      throw e
    }
  }

  const register = async (userData: { username: string; password?: string; displayName?: string }) => {
    try {
      const data: any = await $fetch('/api/auth/register', {
        method: 'POST',
        body: userData
      })
      return data
    } catch (e: any) {
      throw e
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      user.value = null
      await navigateTo('/auth/login')
    }
  }

  return {
    user,
    initialized,
    fetchUser,
    login,
    register,
    logout,
    isLoggedIn: computed(() => !!user.value),
    isAdmin: computed(() => user.value?.role === 'admin' || user.value?.role === 'superadmin')
  }
}
