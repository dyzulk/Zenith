export default defineEventHandler(async (event) => {
  const episodeId = event.context.params?.id
  if (!episodeId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing episode ID' })
  }

  // Get Cloudflare environment
  const cloudflare = event.context.cloudflare
  if (!cloudflare || !cloudflare.env.COMMENTS) {
    // Fallback or error if not on Cloudflare (local dev might need wrangler)
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Cloudflare Durable Objects not available. Ensure you are running with wrangler.' 
    })
  }

  const DO = cloudflare.env.COMMENTS
  const doId = DO.idFromName(episodeId)
  const room = DO.get(doId)

  // Forward the request to the Durable Object
  // This will handle the WebSocket upgrade if requested
  return room.fetch(event.node.req)
})
