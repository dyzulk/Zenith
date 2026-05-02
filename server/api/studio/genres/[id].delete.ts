
export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const id = getRouterParam(event, 'id')

  try {
    await db.genre.delete({
      where: { id: parseInt(id as string) }
    })
    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Failed to delete genre'
    })
  }
})
