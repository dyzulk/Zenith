export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const episodeId = getRouterParam(event, 'id')
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    const sources = await db.videoSource.findMany({
      where: { episodeId }
    })

    return { sources }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
