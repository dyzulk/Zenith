import { useD1 } from '../../../utils/d1'
import { genres } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const body = await readBody(event)
  
  const { name, slug } = body

  if (!name || !slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and Slug are required'
    })
  }

  try {
    await db.insert(genres).values({ name, slug })

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Failed to create genre'
    })
  }
})

