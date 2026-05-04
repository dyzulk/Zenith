export const usePublicSettings = () => {
  const { data: publicSettings } = useFetch<any>('/api/settings/public', {
    key: 'public-settings',
    default: () => ({
      settings: {
        comment_system: 'polling',
        video_proxy_enabled: true,
        r2_public_url: ''
      }
    })
  })

  const settings = computed(() => publicSettings.value?.settings || {})

  return {
    settings
  }
}
