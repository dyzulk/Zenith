export default defineEventHandler(async (event) => {
  const db = await useDB(event)
  const body = await readBody(event)
  const config = useRuntimeConfig(event)
  
  const { username, password } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Username and password are required' })
  }

  try {
    // 1. Get user
    const user = await db.profile.findUnique({
      where: { username }
    })
    
    if (!user || !user.passwordHash) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid username or password' })
    }

    // 2. Verify password
    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid username or password' })
    }

    // 3. Generate Secure Session Token
    const sessionId = generateToken('zn_web')

    // 4. Store Session in Database
    await db.session.create({
      data: {
        id: sessionId,
        userId: user.id,
        userAgent: getHeader(event, 'user-agent') || 'Unknown Browser'
      }
    })

    // 5. Set Session Cookie
    setCookie(event, 'zenith_auth', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    // Remove password hash from response and map to snake_case
    if (!user) {
      return { user: null }
    }

    return { 
      user: {
        id: user.id,
        username: user.username,
        display_name: user.displayName,
        role: user.roleId,
        avatar_url: user.avatarUrl
      }
    }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message
    })
  }
})

