import { eq } from 'drizzle-orm'
import { useD1 } from '../../../../utils/d1'
import { videoSources } from '../../../../database/schema'

export default defineEventHandler(async (event) => {
  const user = useRequireAuth(event)
  const db = useD1(event)
  const episodeId = getRouterParam(event, 'id') as string

  try {
    const sources = await db.query.videoSources.findMany({
      where: eq(videoSources.episodeId, episodeId)
    })

    return { sources }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
