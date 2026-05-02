export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const animeId = getRouterParam(event, 'id')
  const body = await readBody(event)

  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const { number, title, synopsis, thumbnail_key } = body

  if (!number) {
    throw createError({ statusCode: 400, statusMessage: 'Episode number is required' })
  }

  try {
    const id = crypto.randomUUID()
    await db.episode.create({
      data: {
        id,
        animeId,
        episodeNumber: parseFloat(number as string),
        title: title || `Episode ${number}`,
        synopsis: synopsis || '',
        thumbnailKey: thumbnail_key || null
      }
    })

    return { success: true, id }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
