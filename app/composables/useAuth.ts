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

  const logout = async () => {
    cookie.value = null
    user.value = null
    await navigateTo('/')
  }

  return {
    user,
    fetchUser,
    logout,
    isLoggedIn: computed(() => !!user.value)
  }
}
