export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const body = await readBody(event)
  
  const { username, password, displayName } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Username and password are required' })
  }

  try {
    // 1. Check if user exists
    const existing = await db.profile.findUnique({
      where: { username }
    })
    
    if (existing) {
      throw createError({ statusCode: 400, statusMessage: 'Username already taken' })
    }

    // 2. Hash password
    const passwordHash = await hashPassword(password)

    // 3. Create profile
    const id = crypto.randomUUID()
    await db.profile.create({
      data: {
        id,
        username,
        displayName: displayName || username,
        passwordHash,
        role: 'user'
      }
    })

    return {
      success: true,
      message: 'Registration successful'
    }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})
