import { eq } from 'drizzle-orm'
import { videoSources } from "../../../../database/schema"

export default defineEventHandler(async (event) => {
  const user = useRequireAuth(event)
  const db = useD1(event)
  const episodeId = getRouterParam(event, 'id') as string
  const body = await readBody(event) // Expecting { sources: [{ quality, url, type }] }
  
  const { sources } = body

  try {
    await db.transaction(async (tx) => {
      // 1. Delete existing sources for this episode to replace them
      await tx.delete(videoSources).where(eq(videoSources.episodeId, episodeId))

      // 2. Insert new sources
      if (sources && sources.length > 0) {
        const values = sources.filter((s: any) => s.file_key || s.url).map((source: any) => ({
          id: crypto.randomUUID(),
          episodeId,
          qualityId: source.quality,
          fileKey: source.file_key || source.url,
          formatId: source.format || source.type || 'mp4'
        }))
        
        if (values.length > 0) {
          await tx.insert(videoSources).values(values)
        }
      }
    })

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
