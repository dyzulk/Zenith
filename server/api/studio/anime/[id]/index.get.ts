export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const id = getRouterParam(event, 'id')
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    const anime = await db.anime.findUnique({
      where: { id },
      include: {
        genres: {
          include: { genre: true }
        }
      }
    })
    
    if (!anime) throw createError({ statusCode: 404, statusMessage: 'Anime not found' })

    const genres = anime.genres.map(ag => ag.genre)
    // Remove the junction table data from the anime object for cleaner response
    const { genres: _, ...animeData } = anime

    return { anime: animeData, genres }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})
