export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const episodeId = getRouterParam(event, 'id')
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    const { results: sources } = await db.prepare(
      'SELECT * FROM video_sources WHERE episode_id = ?'
    ).bind(episodeId).all()

    return { sources }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
