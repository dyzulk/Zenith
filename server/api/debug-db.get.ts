export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const sources = await db.query.videoSources.findMany()
  const settings = await db.query.siteSettings.findMany()
  return { sources, settings }
})
