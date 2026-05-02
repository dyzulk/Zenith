
export default defineEventHandler(async (event) => {
  const db = useDB(event)
  
  // Fetch genres with anime count
  const genres = await db.genre.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { animes: true }
      }
    }
  })

  return {
    genres: genres.map(g => ({
      ...g,
      anime_count: g._count.animes
    }))
  }
})
