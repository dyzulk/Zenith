
export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  const { name, slug } = body

  try {
    await db.genre.update({
      where: { id: parseInt(id as string) },
      data: { name, slug }
    })

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Failed to update genre'
    })
  }
})
