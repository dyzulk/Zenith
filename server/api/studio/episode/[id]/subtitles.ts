export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const r2 = useR2(event)
  const id = event.context.params?.id // episode_id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing episode ID' })
  }

  const method = event.method

  if (method === 'GET') {
    const subtitles = await db.prepare('SELECT * FROM subtitles WHERE episode_id = ? ORDER BY language ASC').bind(id).all()
    return {
      subtitles: subtitles.results
    }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const { language, label, r2_key } = body

    if (!language || !label || !r2_key) {
      throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
    }

    const subId = crypto.randomUUID()
    await db.prepare(`
      INSERT INTO subtitles (id, episode_id, language, label, r2_key, created_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(subId, id, language, label, r2_key).run()

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

    // Optional: Delete from R2 too? Usually better to keep if shared, but here we delete record
    await db.prepare('DELETE FROM subtitles WHERE id = ? AND episode_id = ?').bind(subtitle_id, id).run()

    return {
      success: true
    }
  }
})
