export default defineEventHandler(async (event) => {
  const gate = useGate(event)
  gate.authorize(['admin', 'staff'])

  const body = await readBody(event)
  const { settings } = body // Expected: [{ key: string, value: string }]

  if (!Array.isArray(settings)) {
    throw createError({ statusCode: 400, statusMessage: 'Settings must be an array' })
  }

  const db = useDB(event)

  try {
    // Perform bulk upsert
    const operations = settings.map(s => 
      db.siteSetting.upsert({
        where: { key: s.key },
        update: { value: String(s.value) },
        create: { key: s.key, value: String(s.value) }
      })
    )

    await db.$transaction(operations)

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
