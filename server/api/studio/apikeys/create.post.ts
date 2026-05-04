import { useD1 } from '../../../utils/d1'
import { apiTokens } from '../../../database/schema'
import { generateToken } from '../../../utils/crypto'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const user = useRequireAuth(event)
  const body = await readBody(event)

  if (!body.name || typeof body.name !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Token name is required' })
  }

  // Generate new secure token
  const tokenString = generateToken('gox_api')

  // Save to ApiToken table
  await db.insert(apiTokens).values({
    id: tokenString,
    userId: user.id,
    name: body.name.trim()
  })

  return {
    success: true,
    message: 'API Key created successfully',
    // ONLY return the raw token once during creation!
    token: tokenString,
    keyData: {
      name: body.name.trim(),
      createdAt: new Date()
    }
  }
})

