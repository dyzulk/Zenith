export default defineEventHandler(async (event) => {
  const gate = useGate(event)
  gate.authorize('settings:update')

  const body = await readBody(event)
  
  const settingsArray = Object.entries(body).map(([key, value]) => ({
    key,
    value: String(value ?? '')
  }))

  await setSiteSettingsBulk(event, settingsArray)

  return { success: true, message: 'SEO settings updated' }
})

