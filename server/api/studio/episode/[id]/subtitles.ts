export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const r2 = useR2(event)
  const id = event.context.params?.id // episode_id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing episode ID' })
  }

  const method = event.method

  if (method === 'GET') {
    const subtitles = await db.subtitle.findMany({
      where: { episodeId: id },
      orderBy: { language: 'asc' }
    })
    return {
      subtitles
    }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const { language, label, r2_key } = body

    if (!language || !label || !r2_key) {
      throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
    }

    const subId = crypto.randomUUID()
    await db.subtitle.create({
      data: {
        id: subId,
        episodeId: id,
        language,
        label,
        r2Key: r2_key
      }
    })

    return {
      success: true,
      subtitle: { id: subId, language, label, r2_key }
    }
  }

  if (method === 'DELETE') {
    const body = await readBody(event)
    const { subtitle_id } = body

    if (!subtitle_id) {
      throw createError({ statusCode: 400, statusMessage: 'Missing subtitle ID' })
    }

    await db.subtitle.delete({
      where: { 
        id: subtitle_id,
        episodeId: id
      }
    })

    return {
      success: true
    }
  }
})
