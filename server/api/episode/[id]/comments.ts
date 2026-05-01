export default defineEventHandler(async (event) => {
  const episodeId = event.context.params?.id
  if (!episodeId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing episode ID' })
  }

  // Check if real-time is enabled in settings
  const commentSystem = await getSiteSetting(event, 'comment_system', 'polling')
  if (commentSystem !== 'websocket') {
    throw createError({ 
      statusCode: 403, 
      statusMessage: 'Real-time comments are disabled. Polling mode is active.' 
    })
  }

  // Get Cloudflare environment
  const cloudflare = event.context.cloudflare
  if (!cloudflare || !cloudflare.env.COMMENTS) {
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Cloudflare Durable Objects not available or not bound.' 
    })
  }

  const DO = cloudflare.env.COMMENTS
  const doId = DO.idFromName(episodeId)
  const room = DO.get(doId)

  // Forward the request to the Durable Object
  // This will handle the WebSocket upgrade if requested
  return room.fetch(event.node.req)
})
