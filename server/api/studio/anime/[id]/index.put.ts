export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const { 
    title, slug, synopsis, status, type, year, season, 
    poster_key, banner_key, score, genre_ids 
  } = body

  try {
    await db.anime.update({
      where: { id },
      data: {
        title,
        slug,
        synopsis,
        status,
        type,
        year,
        season,
        posterKey: poster_key,
        bannerKey: banner_key,
        score,
        genres: {
          deleteMany: {},
          create: (genre_ids || []).map((genreId: number) => ({
            genreId
          }))
        }
      }
    })

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
