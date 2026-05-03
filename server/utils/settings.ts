import type { H3Event } from 'h3'

/**
 * Get all site settings as a key-value object
 */
export const getSiteSettings = async (event: H3Event): Promise<Record<string, string>> => {
  const db = useDB(event)
  const settings = await db.siteSetting.findMany()
  
  const settingsObj: Record<string, string> = {}
  settings.forEach((s) => {
    settingsObj[s.key] = s.value
  })
  
  return settingsObj
}

/**
 * Get a single site setting by key
 */
export const getSiteSetting = async (event: H3Event, key: string, defaultValue = ''): Promise<string> => {
  const db = useDB(event)
  const setting = await db.siteSetting.findUnique({
    where: { key }
  })
  
  return setting?.value ?? defaultValue
}

/**
 * Bulk upsert site settings
 */
export const setSiteSettingsBulk = async (event: H3Event, settings: { key: string, value: string }[]): Promise<void> => {
  const db = useDB(event)
  
  const operations = settings.map(s => 
    db.siteSetting.upsert({
      where: { key: s.key },
      update: { value: String(s.value) },
      create: { key: s.key, value: String(s.value) }
    })
  )

  await db.$transaction(operations)
}

/**
 * Set a single site setting
 */
export const setSiteSetting = async (event: H3Event, key: string, value: string): Promise<void> => {
  const db = useDB(event)
  await db.siteSetting.upsert({
    where: { key },
    update: { value: String(value) },
    create: { key, value: String(value) }
  })
}
