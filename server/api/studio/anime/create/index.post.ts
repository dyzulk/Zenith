import { anime } from "../../../../database/schema"

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const body = await readBody(event)
  
  // Protect with admin check
  useGate(event).authorize('anime:create')

  const { title, slug, synopsis, status, type, year, season } = body

  if (!title || !slug) {
    throw createError({ statusCode: 400, statusMessage: 'Title and slug are required' })
  }

  try {
    const id = crypto.randomUUID()
    await db.insert(anime).values({
      id,
      slug,
      title,
      synopsis,
      statusId: status,
      typeId: type,
      year: year ? parseInt(year) : null,
      seasonId: season
    })

    return { 
      success: true, 
      id 
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})


