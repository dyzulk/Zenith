export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')

  try {
    // Get Anime with Episodes
    const anime = await db.anime.findUnique({
      where: { slug },
      include: {
        episodes: {
          orderBy: { episodeNumber: 'asc' }
        }
      }
    })
 
    if (!anime) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Anime not found'
      })
    }
 
    // Format for UI
    return {
      ...anime,
      image: anime.posterKey ? (anime.posterKey.startsWith('http') ? anime.posterKey : `/api/r2/${anime.posterKey}`) : '/demo/demo-potrait.jfif',
      banner: anime.bannerKey ? (anime.bannerKey.startsWith('http') ? anime.bannerKey : `/api/r2/${anime.bannerKey}`) : '/demo/demo-landscape.png',
      genres: ['Action', 'Adventure', 'Fantasy'], // Static for now
      episodes: anime.episodes.map((ep: any) => ({
        number: ep.episodeNumber,
        title: ep.title || `Episode ${ep.episodeNumber}`,
        thumbnail: ep.thumbnailKey ? `/api/r2/${ep.thumbnailKey}` : 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&q=80'
      }))
    }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})
