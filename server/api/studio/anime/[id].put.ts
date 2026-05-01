export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const { title, slug, synopsis, status, type, year, season, poster_key, banner_key, score } = body

  try {
    await db.prepare(
      `UPDATE anime SET 
        title = ?, 
        slug = ?, 
        synopsis = ?, 
        status = ?, 
        type = ?, 
        year = ?, 
        season = ?, 
        poster_key = ?, 
        banner_key = ?, 
        score = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
    ).bind(title, slug, synopsis, status, type, year, season, poster_key, banner_key, score, id).run()

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
