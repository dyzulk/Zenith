export default defineEventHandler(async (event) => {
  const db = useDB(event)
  
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    const [animeCount, episodeCount, userCount] = await Promise.all([
      db.prepare('SELECT COUNT(*) as count FROM anime').first('count'),
      db.prepare('SELECT COUNT(*) as count FROM episodes').first('count'),
      db.prepare('SELECT COUNT(*) as count FROM profiles').first('count')
    ])

    return {
      animeCount,
      episodeCount,
      userCount
    }
  } catch (e: any) {
    return {
      animeCount: 0,
      episodeCount: 0,
      userCount: 0
    }
  }
})
