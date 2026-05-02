export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const episodeId = getRouterParam(event, 'id')
  const body = await readBody(event) // Expecting { sources: [{ quality, url, type }] }
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const { sources } = body

  try {
    // 1. Delete existing sources for this episode to replace them (Simpler than complex upsert)
    await db.prepare('DELETE FROM video_sources WHERE episode_id = ?').bind(episodeId).run()

    // 2. Insert new sources
    if (sources && sources.length > 0) {
      for (const source of sources) {
        if (!source.url) continue
        
        const id = crypto.randomUUID()
        await db.prepare(
          'INSERT INTO video_sources (id, episode_id, quality, url, type) VALUES (?, ?, ?, ?, ?)'
        ).bind(id, episodeId, source.quality, source.url, source.type || 'mp4').run()
      }
    }

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
