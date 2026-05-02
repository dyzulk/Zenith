export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const episodeId = getRouterParam(event, 'id')
  const body = await readBody(event) // Expecting { sources: [{ quality, url, type }] }
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const { sources } = body

  try {
    // 1. Delete existing sources for this episode to replace them
    await db.videoSource.deleteMany({
      where: { episodeId }
    })

    // 2. Insert new sources
    if (sources && sources.length > 0) {
      await db.videoSource.createMany({
        data: sources.filter((s: any) => s.url).map((source: any) => ({
          id: crypto.randomUUID(),
          episodeId,
          quality: source.quality,
          r2Key: source.url,
          format: source.type || 'mp4'
        }))
      })
    }

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
