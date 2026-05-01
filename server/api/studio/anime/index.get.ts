export default defineEventHandler(async (event) => {
  const db = useDB(event)
  
  // Protect with admin check (you can also use a helper here)
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    const { results: anime } = await db.prepare(
      'SELECT id, title, slug, status, type, year, season, score, total_episodes, created_at FROM anime ORDER BY created_at DESC'
    ).all()

    return { anime }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
