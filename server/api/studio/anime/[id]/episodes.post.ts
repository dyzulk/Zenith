import { episodes } from "../../../../database/schema"

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const animeId = getRouterParam(event, 'id') as string
  const body = await readBody(event)

  // Protect with admin check
  useGate(event).authorize('episode:manage')

  const { number, title, synopsis, thumbnail_key } = body

  if (!number) {
    throw createError({ statusCode: 400, statusMessage: 'Episode number is required' })
  }

  try {
    const id = crypto.randomUUID()
    await db.insert(episodes).values({
      id,
      animeId,
      episodeNumber: parseFloat(number as string),
      title: title || `Episode ${number}`,
      synopsis: synopsis || '',
      thumbnailKey: thumbnail_key || null
    })

    return { success: true, id }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
