export default defineEventHandler(async (event) => {
  const commentSystem = await getSiteSetting(event, 'comment_system', 'polling')
  const videoProxyEnabled = await getSiteSetting(event, 'video_proxy_enabled', 'false')
  const r2PublicUrl = await getSiteSetting(event, 'r2_public_url', '')
  
  return {
    settings: {
      comment_system: commentSystem,
      video_proxy_enabled: videoProxyEnabled === 'true',
      r2_public_url: r2PublicUrl
    }
  }
})

