import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const body = await readBody(event)
  
  const { username, password, displayName } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Username and password are required' })
  }

  try {
    // 1. Check if user exists
    const existing = await db.prepare('SELECT id FROM profiles WHERE username = ?').bind(username).first()
    if (existing) {
      throw createError({ statusCode: 400, statusMessage: 'Username already taken' })
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // 3. Create profile
    const id = crypto.randomUUID()
    await db.prepare(
      'INSERT INTO profiles (id, username, display_name, password_hash, role) VALUES (?, ?, ?, ?, ?)'
    ).bind(id, username, displayName || username, passwordHash, 'user').run()

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
