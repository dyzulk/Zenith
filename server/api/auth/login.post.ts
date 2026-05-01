export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body

  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'Email is required' })
  }

  const db = useDB(event)
  const user = await db.prepare(
    'SELECT * FROM profiles WHERE email = ?'
  ).bind(email).first()

  if (!user) {
    // For demo/dev purposes, let's create a user if not found
    // In production, you would send a magic link
    await db.prepare(
      'INSERT INTO profiles (id, email, username, role) VALUES (?, ?, ?, ?)'
    ).bind(crypto.randomUUID(), email, email.split('@')[0], 'user').run()
    
    const newUser = await db.prepare('SELECT * FROM profiles WHERE email = ?').bind(email).first()
    setCookie(event, 'zenith_user_id', newUser.id, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })
    return { success: true, user: newUser }
  }

  setCookie(event, 'zenith_user_id', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })

  return { success: true, user }
})
