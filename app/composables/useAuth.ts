export const useAuth = () => {
  const user = useState<any>('auth_user', () => null)
  const cookie = useCookie('zenith_user_id')

  const fetchUser = async () => {
    if (!cookie.value) {
      user.value = null
      return
    }
    try {
      user.value = await $fetch('/api/auth/me')
    } catch {
      user.value = null
    }
  }

  const login = async (email: string) => {
    try {
      const { user: userData } = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email }
      })
      user.value = userData
      return userData
    } catch (e: any) {
      throw e
    }
  }

  const signInWithOAuth = async (provider: string) => {
    // Placeholder for social login
    console.log(`Social login with ${provider} not implemented yet`)
  }

  const logout = async () => {
    cookie.value = null
    user.value = null
    await navigateTo('/')
  }

  return {
    user,
    fetchUser,
    login,
    signInWithOAuth,
    logout,
    isLoggedIn: computed(() => !!user.value)
  }
}
