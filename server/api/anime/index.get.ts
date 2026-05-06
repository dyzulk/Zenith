import { or, like, asc, desc, eq, and, inArray, sql } from 'drizzle-orm'
import { anime, animeGenres, genres } from "../../database/schema"
import { IMAGES } from '#shared/utils/constants/images'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const query = getQuery(event)
  
  const q = query.q as string
  const selectedGenres = query.genres as string // Comma separated IDs or names
  const year = query.year as string
  const status = query.status as string

  try {
    const whereConditions: any[] = []

    // 1. Search Query
    if (q && q.length >= 2) {
      whereConditions.push(
        or(
          like(anime.title, `%${q}%`),
          like(anime.synopsis, `%${q}%`)
        )
      )
    }

    // 2. Year Filter
    if (year) {
      whereConditions.push(eq(anime.year, parseInt(year)))
    }

    // 3. Status Filter
    if (status) {
      whereConditions.push(eq(anime.statusId, status))
    }

    // 4. Genre Filter (Complex because of junction table)
    let animeIdsByGenre: string[] | null = null
    if (selectedGenres) {
      const genreSlugs = selectedGenres.split(',').filter(Boolean)
      if (genreSlugs.length > 0) {
        const genreMatches = await db.query.genres.findMany({
          where: inArray(genres.slug, genreSlugs)
        })
        const genreIds = genreMatches.map((g: any) => g.id)
        
        if (genreIds.length > 0) {
           const matches = await db.select({ animeId: animeGenres.animeId })
            .from(animeGenres)
            .where(inArray(animeGenres.genreId, genreIds))
            
           animeIdsByGenre = matches.map((m: any) => m.animeId)
        }
      }
    }

    if (animeIdsByGenre !== null) {
      if (animeIdsByGenre.length === 0) {
        return [] // No matches for genres
      }
      whereConditions.push(inArray(anime.id, animeIdsByGenre))
    }

    // Execute Query
    const results = await db.query.anime.findMany({
      where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
      orderBy: [desc(anime.createdAt), asc(anime.title)],
      limit: 50
    })

    const disk = useStoragePublicUrl(event)
    return await Promise.all(results.map(async (item: any) => ({
      ...item,
      image: item.posterKey ? (item.posterKey.startsWith('http') || item.posterKey.startsWith('/demo') ? item.posterKey : await disk.getPublicUrl(item.posterKey)) : IMAGES.DEMO.POTRAIT,
      banner: item.bannerKey ? (item.bannerKey.startsWith('http') || item.bannerKey.startsWith('/demo') ? item.bannerKey : await disk.getPublicUrl(item.bannerKey)) : IMAGES.DEMO.LANDSCAPE,
      episodes: item.totalEpisodes || 0
    })))

  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Error fetching anime list'
    })
  }
})
