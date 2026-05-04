import { eq, and } from 'drizzle-orm'
import { episodes, anime } from "../../../database/schema"

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const ep = getRouterParam(event, 'ep')

  if (!slug || !ep) {
    throw createError({ statusCode: 400, statusMessage: 'Missing parameters' })
  }

  // Set aggressive cache headers
  setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=31536000')

  try {
    const db = useD1(event)
    
    // Find the episode by anime slug and episode number
    const episodeData = await db.query.episodes.findFirst({
      where: and(
        eq(episodes.episodeNumber, Number(ep))
      ),
      with: {
        anime: {
          columns: { slug: true }
        }
      }
    })

    // Filter by anime slug (findFirst with relational filter in Drizzle is a bit different, 
    // we can also use a join if needed, but since we have the anime relation, 
    // we check it manually or use a more precise query)
    
    // Better way with JOIN:
    const result = await db.select({ thumbnailKey: episodes.thumbnailKey })
      .from(episodes)
      .innerJoin(anime, eq(episodes.animeId, anime.id))
      .where(
        and(
          eq(episodes.episodeNumber, Number(ep)),
          eq(anime.slug, slug)
        )
      )
      .get()

    if (result && result.thumbnailKey) {
      return sendRedirect(event, `/api/storage/${result.thumbnailKey}`, 302)
    } else {
      setHeader(event, 'Content-Type', 'image/svg+xml')
      return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225"><rect width="100%" height="100%" fill="#18181b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14px" fill="#ffffff40">Thumbnail Pending</text></svg>`
    }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})
