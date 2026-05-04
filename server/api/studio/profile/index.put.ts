import { eq } from 'drizzle-orm'
import { useD1 } from '../../../utils/d1'
import { profiles } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const user = useRequireAuth(event)
  const db = useD1(event)
  const body = await readBody(event)
  
  const { name, username, avatar } = body

  try {
    await db.update(profiles)
      .set({
        displayName: name,
        username,
        avatarUrl: avatar,
        updatedAt: new Date()
      })
      .where(eq(profiles.id, user.id))

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})

