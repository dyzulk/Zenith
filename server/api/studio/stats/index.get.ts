export default defineEventHandler(async (event) => {
  const db = useDB(event)
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    const [animeCount, episodeCount, userCount, genreCount, bookmarkCount] = await Promise.all([
      db.anime.count(),
      db.episode.count(),
      db.profile.count(),
      db.genre.count(),
      db.bookmark.count()
    ])

    const recentAnime = await db.anime.findMany({
      select: { id: true, title: true, slug: true, posterKey: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    })

    const recentEpisodes = await db.episode.findMany({
      select: { 
        id: true, 
        episodeNumber: true, 
        title: true, 
        createdAt: true,
        anime: { select: { title: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    })

    // Simplification for top anime View counts
    const topAnime = await db.anime.findMany({
      select: {
        id: true,
        title: true,
        episodes: {
          select: { viewCount: true }
        }
      },
      take: 5
    })

    // Calculate totals for top anime
    const topAnimeWithViews = topAnime.map(a => ({
      id: a.id,
      title: a.title,
      total_views: a.episodes.reduce((acc, ep) => acc + ep.viewCount, 0)
    })).sort((a, b) => b.total_views - a.total_views)

    return {
      animeCount,
      episodeCount,
      userCount,
      genreCount,
      bookmarkCount,
      recentAnime: recentAnime.map(a => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        poster_key: a.posterKey,
        created_at: a.createdAt
      })),
      recentEpisodes: recentEpisodes.map(e => ({
        id: e.id,
        episode_number: e.episodeNumber,
        title: e.title,
        created_at: e.createdAt,
        anime_title: e.anime.title
      })),
      topAnime: topAnimeWithViews
    }
  } catch (e: any) {
    return {
      animeCount: 0,
      episodeCount: 0,
      userCount: 0,
      genreCount: 0,
      bookmarkCount: 0,
      recentAnime: [],
      recentEpisodes: [],
      topAnime: []
    }
  }
})
