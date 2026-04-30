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

  return {
    user,
    login,
    logout
  }
}
