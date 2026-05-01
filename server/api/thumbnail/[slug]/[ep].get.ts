export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const ep = getRouterParam(event, 'ep')

  if (!slug || !ep) {
    throw createError({ statusCode: 400, statusMessage: 'Missing parameters' })
  }

  // Set aggressive cache headers
  setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=31536000')

  try {
    const db = useDB(event)
    
    // First find the anime
    const anime = await db.prepare(
      'SELECT id FROM anime WHERE slug = ?'
    ).bind(slug).first()

    if (!anime) {
      throw createError({ statusCode: 404, statusMessage: 'Anime not found' })
    }

    // Then find the episode thumbnail
    const episode = await db.prepare(
      'SELECT thumbnail_key FROM episodes WHERE anime_id = ? AND episode_number = ?'
    ).bind(anime.id, Number(ep)).first()

    if (episode && episode.thumbnail_key) {
      return sendRedirect(event, `/api/r2/${episode.thumbnail_key}`, 302)
    } else {
      setHeader(event, 'Content-Type', 'image/svg+xml')
      return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225"><rect width="100%" height="100%" fill="#18181b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14px" fill="#ffffff40">Thumbnail Pending</text></svg>`
    }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})
