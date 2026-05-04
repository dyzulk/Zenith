import { desc } from 'drizzle-orm'
import { anime } from "../../database/schema"
import { IMAGES } from '#shared/utils/constants/images'

export default defineEventHandler(async (event) => {
  const db = useD1(event)

  try {
    const results = await db.query.anime.findMany({
      orderBy: [desc(anime.score)],
      limit: 4
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
      statusMessage: e.message
    })
  }
})



