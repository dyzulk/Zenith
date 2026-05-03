import { generateToken } from '../../../utils/crypto'

export default defineEventHandler(async (event) => {
  const db = await useDB(event)
  const user = useRequireAuth(event)
  const body = await readBody(event)

  if (!body.name || typeof body.name !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Token name is required' })
  }

  // Generate new secure token
  const tokenString = generateToken('zn_api')

  // Save to ApiToken table
  const newToken = await db.apiToken.create({
    data: {
      id: tokenString,
      userId: user.id,
      name: body.name.trim()
    }
  })

  return {
    success: true,
    message: 'API Key created successfully',
    // ONLY return the raw token once during creation!
    token: tokenString,
    keyData: {
      name: newToken.name,
      createdAt: newToken.createdAt
    }
  }
})

