export default defineEventHandler(async (event) => {
  const user = useRequireAuth(event)

  const db = await useDB(event)
  const body = await readBody(event)
  const { anime_id, status, action } = body // action: 'add', 'remove', 'update'

  if (!anime_id) {
    throw createError({ statusCode: 400, statusMessage: 'Anime ID is required' })
  }

  try {
    if (action === 'remove') {
      await db.bookmark.delete({
        where: {
          userId_animeId: {
            userId: user.id,
            animeId: anime_id
          }
        }
      })
      return { success: true, action: 'removed' }
    }

    // Default action: add/update
    await db.bookmark.upsert({
      where: {
        userId_animeId: {
          userId: user.id,
          animeId: anime_id
        }
      },
      update: {
        statusId: status || 'plan'
      },
      create: {
        userId: user.id,
        animeId: anime_id,
        statusId: status || 'plan'
      }
    })

    return {
      success: true,
      action: 'saved',
      status: status || 'plan'
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Error updating bookmark'
    })
  }
})

