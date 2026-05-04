import { count, desc, sql } from 'drizzle-orm'
import { useD1 } from '../../../utils/d1'
import { anime, episodes, profiles, genres, bookmarks } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  
  useGate(event).authorize('stats:view')

  try {
    const [animeCountRes, episodeCountRes, userCountRes, genreCountRes, bookmarkCountRes] = await Promise.all([
      db.select({ value: count() }).from(anime),
      db.select({ value: count() }).from(episodes),
      db.select({ value: count() }).from(profiles),
      db.select({ value: count() }).from(genres),
      db.select({ value: count() }).from(bookmarks)
    ])

    const animeCount = animeCountRes[0].value
    const episodeCount = episodeCountRes[0].value
    const userCount = userCountRes[0].value
    const genreCount = genreCountRes[0].value
    const bookmarkCount = bookmarkCountRes[0].value

    const recentAnimeData = await db.query.anime.findMany({
      columns: { id: true, title: true, slug: true, posterKey: true, createdAt: true },
      orderBy: [desc(anime.createdAt)],
      limit: 5
    })

    const recentEpisodesData = await db.query.episodes.findMany({
      columns: { 
        id: true, 
        episodeNumber: true, 
        title: true, 
        createdAt: true
      },
      with: {
        anime: {
          columns: { title: true }
        }
      },
      orderBy: [desc(episodes.createdAt)],
      limit: 5
    })

    // Simplification for top anime View counts
    const topAnimeData = await db.query.anime.findMany({
      columns: {
        id: true,
        title: true
      },
      with: {
        episodes: {
          columns: { viewCount: true }
        }
      },
      limit: 10 // Get more to sort by views later
    })

    // Calculate totals for top anime
    const topAnimeWithViews = topAnimeData.map(a => ({
      id: a.id,
      title: a.title,
      total_views: a.episodes.reduce((acc, ep) => acc + ep.viewCount, 0)
    })).sort((a, b) => b.total_views - a.total_views).slice(0, 5)

    return {
      animeCount,
      episodeCount,
      userCount,
      genreCount,
      bookmarkCount,
      recentAnime: recentAnimeData.map(a => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        poster_key: a.posterKey,
        created_at: a.createdAt
      })),
      recentEpisodes: recentEpisodesData.map(e => ({
        id: e.id,
        episode_number: e.episodeNumber,
        title: e.title,
        created_at: e.createdAt,
        anime_title: e.anime.title
      })),
      topAnime: topAnimeWithViews
    }
  } catch (e: any) {
    console.error('[Stats Error]', e)
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

