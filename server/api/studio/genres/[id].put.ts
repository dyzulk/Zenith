
export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  const { name, slug } = body

  try {
    await db.prepare('UPDATE genres SET name = ?, slug = ? WHERE id = ?')
      .bind(name, slug, id)
      .run()

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Failed to update genre'
    })
  }
})
