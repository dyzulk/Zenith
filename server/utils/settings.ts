import type { H3Event } from 'h3'
import { eq } from 'drizzle-orm'
import { useD1 } from './d1'
import { siteSettings } from '../database/schema'

/**
 * Get all site settings as a key-value object
 */
export const getSiteSettings = async (event: H3Event): Promise<Record<string, string>> => {
  const db = useD1(event)
  const settings = await db.query.siteSettings.findMany()
  
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
  const db = useD1(event)
  const setting = await db.query.siteSettings.findFirst({
    where: eq(siteSettings.key, key)
  })
  
  return setting?.value ?? defaultValue
}

/**
 * Bulk upsert site settings
 */
export const setSiteSettingsBulk = async (event: H3Event, settings: { key: string, value: string }[]): Promise<void> => {
  const db = useD1(event)
  
  await db.transaction(async (tx) => {
    for (const s of settings) {
      await tx.insert(siteSettings)
        .values({ key: s.key, value: String(s.value) })
        .onConflictDoUpdate({
          target: [siteSettings.key],
          set: { value: String(s.value) }
        })
    }
  })
}

/**
 * Set a single site setting
 */
export const setSiteSetting = async (event: H3Event, key: string, value: string): Promise<void> => {
  const db = useD1(event)
  await db.insert(siteSettings)
    .values({ key, value: String(value) })
    .onConflictDoUpdate({
      target: [siteSettings.key],
      set: { value: String(value) }
    })
}
