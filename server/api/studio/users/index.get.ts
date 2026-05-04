import { desc } from 'drizzle-orm'
import { useD1 } from '../../../utils/d1'
import { profiles as profilesTable } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const gate = useGate(event)
  gate.authorize('users:view')

  try {
    const users = await db.query.profiles.findMany({
      with: {
        role: true
      },
      orderBy: [desc(profilesTable.createdAt)]
    })

    return users.map(p => ({
      id: p.id,
      name: p.displayName || p.username,
      username: p.username,
      email: `${p.username}@GoxStream.com`, // Email is not in schema, using dummy based on username
      avatar: {
        src: p.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.username}`,
        alt: p.username
      },
      status: 'subscribed', // Dummy status for UI
      location: 'Indonesia' // Dummy location for UI
    }))
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})

