export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const path = query.path as string

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing object path',
    })
  }

  console.log('[API/Stream/Sign] Signing path:', path, 'Quality:', query.quality)
  
  // Check if proxy is enabled
  const videoProxyEnabled = (await getSiteSetting(event, 'video_proxy_enabled', 'false')) === 'true'
  console.log('[API/Stream/Sign] Video Proxy Enabled:', videoProxyEnabled)
  
  let url = `/api/storage/${path}`
  
  if (!videoProxyEnabled) {
    const storage = useStoragePublicUrl(event)
    url = await storage.getPublicUrl(path)
  }

  console.log('[API/Stream/Sign] Generated URL:', url)

  return {
    url,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    quality: query.quality || '720p'
  }
})

