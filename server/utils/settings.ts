export const getSiteSetting = async (event: any, key: string, defaultValue: string = ''): Promise<string> => {
  const db = useDB(event)
  try {
    const result: any = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind(key).first()
    return result?.value || defaultValue
  } catch (e) {
    return defaultValue
  }
}

export const setSiteSetting = async (event: any, key: string, value: string) => {
  const db = useDB(event)
  await db.prepare(`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `).bind(key, value).run()
}
