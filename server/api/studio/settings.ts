export default defineEventHandler(async (event) => {
  // Authentication check (ensure user is admin/staff)
  const user = event.context.user
  if (!user || (user.role !== 'admin' && user.role !== 'staff')) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const method = event.method

  if (method === 'GET') {
    const db = useDB(event)
    const settings = await db.prepare('SELECT * FROM site_settings').all()
    
    // Format to object
    const settingsObj: Record<string, string> = {}
    settings.results.forEach((s: any) => {
      settingsObj[s.key] = s.value
    })

    return {
      settings: settingsObj
    }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const { key, value } = body

    if (!key) {
      throw createError({ statusCode: 400, statusMessage: 'Missing key' })
    }

    await setSiteSetting(event, key, value)

    return {
      success: true
    }
  }
})
