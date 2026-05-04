import { eq, count, asc } from 'drizzle-orm'
import { episodes, videoSources } from "../../../../database/schema"

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const animeId = getRouterParam(event, 'id') as string
  
  // Protect with admin check
  useGate(event).authorize('episode:manage')

  try {
    // Get episodes with their video sources count
    const results = await db.select({
      id: episodes.id,
      animeId: episodes.animeId,
      episodeNumber: episodes.episodeNumber,
      title: episodes.title,
      synopsis: episodes.synopsis,
      durationSeconds: episodes.durationSeconds,
      thumbnailKey: episodes.thumbnailKey,
      airedAt: episodes.airedAt,
      viewCount: episodes.viewCount,
      createdAt: episodes.createdAt,
      source_count: count(videoSources.id)
    })
    .from(episodes)
    .leftJoin(videoSources, eq(episodes.id, videoSources.episodeId))
    .where(eq(episodes.animeId, animeId))
    .groupBy(episodes.id)
    .orderBy(asc(episodes.episodeNumber))

    return { 
      episodes: results.map(e => ({
        ...e,
        number: e.episodeNumber
      })) 
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
