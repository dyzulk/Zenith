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

  const disk = useStorageDisk(event)
  const db = await useDB(event)
  const path = `thumbnails/${anime_slug}/ep-${episode_number}.jpg`

  try {
    // 1. Upload to storage (R2/S3)
    await disk.put(path, bytes, { contentType: 'image/jpeg' })

    // 2. Update DB
    await db.episode.update({
      where: { id: episode_id },
      data: { thumbnailKey: path }
    })

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

