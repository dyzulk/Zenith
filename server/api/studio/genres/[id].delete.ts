import { useDB } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const id = getRouterParam(event, 'id')

  try {
    await db.prepare('DELETE FROM genres WHERE id = ?').bind(id).run()
    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Failed to delete genre'
    })
  }
})
