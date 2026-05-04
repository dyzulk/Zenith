import { eq, desc } from 'drizzle-orm'
import { apiTokens } from "../../../database/schema"

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const user = useRequireAuth(event)

  const keys = await db.query.apiTokens.findMany({
    where: eq(apiTokens.userId, user.id),
    orderBy: [desc(apiTokens.createdAt)],
    columns: {
      id: true,
      name: true,
      createdAt: true,
      lastUsed: true
    }
  })

  // To match the secure "view once" behavior, we mask the IDs
  const maskedKeys = keys.map(key => {
    const parts = key.id.split('_')
    const prefix = parts.length > 1 ? parts[0] + '_' : ''
    const hash = parts[parts.length - 1]
    const masked = prefix + hash.substring(0, 4) + '•'.repeat(16) + hash.substring(hash.length - 4)
    
    return {
      ...key,
      maskedId: masked
    }
  })

  return { apiKeys: maskedKeys }
})


