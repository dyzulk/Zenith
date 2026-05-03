export default defineEventHandler(async (event) => {
  // Authentication check (ensure user is admin/staff/superadmin)
  const gate = useGate(event)
  if (event.method === 'GET') {
    gate.authorize('settings:view')
  } else {
    gate.authorize('settings:update')
  }

  const method = event.method

  if (method === 'GET') {
    const settingsObj = await getSiteSettings(event)
    return {
      settings: settingsObj
    }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})
