export default defineEventHandler(async (event) => {
  const gate = useGate(event)
  gate.authorize('settings:update')

  const body = await readBody(event)
  
  // Transform object to array for service
  const settingsArray = Object.entries(body).map(([key, value]) => ({
    key,
    value: String(value ?? '')
  }))

  await setSiteSettingsBulk(event, settingsArray)

  return { success: true, message: 'Core settings updated' }
})
