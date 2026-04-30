export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const login = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    })
    if (error) throw error
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    navigateTo('/')
  }

  const signInWithOAuth = async (provider: 'google' | 'facebook') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + '/auth/callback'
      }
    })
    if (error) throw error
  }

  return {
    user,
    login,
    signInWithOAuth,
    logout
  }
}
