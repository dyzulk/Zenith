export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { episode_id, anime_slug, episode_number, dataUrl } = body

  if (!episode_id || !dataUrl || !anime_slug || !episode_number) {
    throw createError({ statusCode: 400, statusMessage: 'Missing parameters' })
  }

  // Convert base64 to Uint8Array (pure JS for edge compatibility)
  const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "")
  const binaryString = atob(base64Data)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  const r2 = useR2(event)
  const db = useDB(event)
  const path = `thumbnails/${anime_slug}/ep-${episode_number}.jpg`

  try {
    // 1. Upload to R2 using binding
    await r2.put(path, bytes, {
      httpMetadata: { contentType: 'image/jpeg' }
    })

    // 2. Update D1
    await db.prepare(
      'UPDATE episodes SET thumbnail_key = ? WHERE id = ?'
    ).bind(path, episode_id).run()

    return {
      success: true,
      thumbnail_key: path,
      url: `/api/r2/${path}`
    }

  } catch (error: any) {
    console.error('Thumbnail Save Error:', error)
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})
