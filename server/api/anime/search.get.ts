import { or, like, asc, desc } from 'drizzle-orm'
import { anime } from "../../database/schema"
import { IMAGES } from '#shared/utils/constants/images'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const query = getQuery(event)
  const q = query.q as string

  if (!q || q.length < 2) {
    return {
      results: []
    }
  }

  try {
    // Basic search using LIKE for title and synopsis
    const results = await db.query.anime.findMany({
      where: or(
        like(anime.title, `%${q}%`),
        like(anime.synopsis, `%${q}%`)
      ),
      columns: {
        id: true,
        title: true,
        slug: true,
        posterKey: true,
        synopsis: true,
        statusId: true,
        typeId: true,
        year: true
      },
      orderBy: [
        asc(anime.title),
        desc(anime.year)
      ],
      limit: 20
    })

    const disk = useStoragePublicUrl(event)
    return {
      query: q,
      results: results.map(item => ({
        ...item,
        image: item.posterKey ? (item.posterKey.startsWith('http') || item.posterKey.startsWith('/demo') ? item.posterKey : disk.getPublicUrl(item.posterKey)) : IMAGES.DEMO.POTRAIT
      }))
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Error performing search'
    })
  }
})


