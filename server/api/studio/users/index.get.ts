export default defineEventHandler(async (event) => {
  const db = useDB(event)

  try {
    const profiles = await db.profile.findMany({
      include: {
        role: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return profiles.map(p => ({
      id: p.id,
      name: p.displayName || p.username,
      username: p.username,
      email: `${p.username}@zenithstream.com`, // Email is not in schema, using dummy based on username
      avatar: {
        src: p.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.username}`,
        alt: p.username
      },
      status: 'subscribed', // Dummy status for UI
      location: 'Indonesia' // Dummy location for UI
    }))
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
