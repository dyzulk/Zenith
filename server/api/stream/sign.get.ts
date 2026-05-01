export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const path = query.path as string

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing object path',
    })
  }

  // With CF ecosystem, we just return the proxy URL
  return {
    url: `/api/r2/${path}`,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    quality: query.quality || '720p'
  }
})
