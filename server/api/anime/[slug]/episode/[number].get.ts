export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')
  const number = Number(getRouterParam(event, 'number'))

  try {
    // 1. Get Anime
    const anime = await db.anime.findUnique({
      where: { slug }
    })

    if (!anime) throw createError({ statusCode: 404, statusMessage: 'Anime not found' })

    // 2. Get Current Episode with Sources
    const episode = await db.episode.findUnique({
      where: {
        animeId_episodeNumber: {
          animeId: anime.id,
          episodeNumber: number
        }
      },
      include: {
        videoSources: {
          orderBy: { qualityId: 'desc' }
        }
      }
    })

    if (!episode) throw createError({ statusCode: 404, statusMessage: 'Episode not found' })

    // 3. Get All Episodes for Sidebar
    const episodes = await db.episode.findMany({
      where: { animeId: anime.id },
      orderBy: { episodeNumber: 'asc' }
    })

    // 4. Format images and sources
    const formatImage = (key: string | null, type: 'poster' | 'banner') => {
      if (!key) return type === 'poster' ? '/demo/demo-potrait.jfif' : '/demo/demo-landscape.png'
      if (key.startsWith('http')) return key
      return `/api/r2/${key}`
    }

    return {
      anime: {
        ...anime,
        poster_url: formatImage(anime.posterKey, 'poster'),
        banner_url: formatImage(anime.bannerKey, 'banner')
      },
      episode: {
        ...episode,
        thumbnail_url: formatImage(episode.thumbnailKey, 'banner')
      },
      episodes: episodes.map(ep => ({
        ...ep,
        thumbnail_url: formatImage(ep.thumbnailKey, 'banner')
      })),
      sources: episode.videoSources.map((s: any) => ({
        ...s,
        quality: s.qualityId, // Map for frontend
        url: s.url || `/api/r2/${s.r2Key}`
      }))
    }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})
