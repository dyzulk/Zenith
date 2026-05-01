
export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const body = await readBody(event)
  
  const { name, slug } = body

  if (!name || !slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and Slug are required'
    })
  }

  try {
    await db.prepare('INSERT INTO genres (name, slug) VALUES (?, ?)')
      .bind(name, slug)
      .run()

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Failed to create genre'
    })
  }
})
