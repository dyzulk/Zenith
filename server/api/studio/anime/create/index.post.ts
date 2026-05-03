export default defineEventHandler(async (event) => {
  const db = await useDB(event)
  const body = await readBody(event)
  
  // Protect with admin check
  const userId = getCookie(event, 'zenith_auth')
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const { title, slug, synopsis, status, type, year, season } = body

  if (!title || !slug) {
    throw createError({ statusCode: 400, statusMessage: 'Title and slug are required' })
  }

  try {
    const id = crypto.randomUUID()
    await db.anime.create({
      data: {
        id,
        slug,
        title,
        synopsis,
        status,
        type,
        year,
        season
      }
    })

    return { 
      success: true, 
      id 
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})

