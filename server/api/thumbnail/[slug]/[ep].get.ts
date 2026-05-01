import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Nitro HMR trigger
  const slug = getRouterParam(event, 'slug')
  const ep = getRouterParam(event, 'ep')

  if (!slug || !ep) {
    throw createError({ statusCode: 400, statusMessage: 'Missing parameters' })
  }

  // Set aggressive cache headers
  setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=31536000')

  try {
    const supabase = await serverSupabaseClient(event)
    
    // First find the anime
    const { data: anime } = await supabase
      .from('anime')
      .select('id')
      .eq('slug', slug)
      .single()

    if (!anime) {
      throw createError({ statusCode: 404, statusMessage: 'Anime not found' })
    }

    // Then find the episode thumbnail
    const { data: episode } = await supabase
      .from('episodes')
      .select('thumbnail_url')
      .eq('anime_id', anime.id)
      .eq('episode_number', ep)
      .single()

    if (episode && episode.thumbnail_url) {
      return sendRedirect(event, episode.thumbnail_url, 302)
    } else {
      // Fallback to a transparent or placeholder image if not found yet
      // A simple 1x1 transparent PNG or redirect to a default placeholder
      setHeader(event, 'Content-Type', 'image/svg+xml')
      return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225"><rect width="100%" height="100%" fill="#18181b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14px" fill="#ffffff40">Thumbnail Pending</text></svg>`
    }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})
