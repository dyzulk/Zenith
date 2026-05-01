export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const id = getRouterParam(event, 'id')
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    const anime = await db.prepare('SELECT * FROM anime WHERE id = ?').bind(id).first()
    if (!anime) throw createError({ statusCode: 404, statusMessage: 'Anime not found' })

    return { anime }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})
