export const getSiteSetting = async (event: any, key: string, defaultValue: string = ''): Promise<string> => {
  const db = useDB(event)
  try {
    const result = await db.siteSetting.findUnique({
      where: { key }
    })
    return result?.value || defaultValue
  } catch (e) {
    return defaultValue
  }
}

export const setSiteSetting = async (event: any, key: string, value: string) => {
  const db = useDB(event)
  await db.siteSetting.upsert({
    where: { key },
    update: { value, updatedAt: new Date() },
    create: { key, value }
  })
}
