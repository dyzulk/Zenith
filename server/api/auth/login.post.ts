import { eq } from 'drizzle-orm'
import { useD1 } from '../../utils/d1'
import { profiles, sessions } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const body = await readBody(event)
  
  const { username, password } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Username and password are required' })
  }

  try {
    // 1. Get user
    const user = await db.query.profiles.findFirst({
      where: eq(profiles.username, username)
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
    const sessionId = generateToken('gox_web')

    // 4. Store Session in Database
    await db.insert(sessions).values({
      id: sessionId,
      userId: user.id,
      userAgent: getHeader(event, 'user-agent') || 'Unknown Browser'
    })

    // 5. Set Session Cookie
    setCookie(event, 'gox_auth', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

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

