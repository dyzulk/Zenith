/**
 * API Service Wrapper around $fetch
 * Provides global interceptors for Authorization and 401 handling
 */
export const useApi = () => {
  const nuxtApp = useNuxtApp()
  const authCookie = useCookie('gox_auth')

  return $fetch.create({
    baseURL: '/api',
    
    onRequest({ options }) {
      // Automatically attach token/cookie headers if needed.
      // Nuxt usually handles cookies on the client side, but this ensures CSR/SSR consistency
      options.headers = options.headers || {}
      if (authCookie.value) {
        // You might use Bearer tokens later, but for now we just rely on cookies.
        // We can inject CSRF tokens or custom auth headers here if the app scales.
        (options.headers as any)['X-Requested-With'] = 'XMLHttpRequest'
      }
    },

    onResponseError({ response }) {
      // Global 401 Unauthorized handler
      if (response.status === 401) {
        const toast = useToast()
        toast.add({
          title: 'Sesi Berakhir',
          description: 'Sesi login Anda telah kedaluwarsa. Silakan login kembali.',
          color: 'red',
          icon: 'i-heroicons-exclamation-circle'
        })
        
        // Clear auth state and redirect
        const user = useState('auth_user')
        user.value = null
        authCookie.value = null
        
        // Only redirect if we are not already on the login page
        if (useRoute().path !== '/auth/login') {
          navigateTo('/auth/login')
        }
      }

      // Global 403 Forbidden handler
      if (response.status === 403) {
        const toast = useToast()
        toast.add({
          title: 'Akses Ditolak',
          description: 'Anda tidak memiliki izin untuk melakukan tindakan ini.',
          color: 'red',
          icon: 'i-heroicons-shield-exclamation'
        })
      }
    }
  })
}
