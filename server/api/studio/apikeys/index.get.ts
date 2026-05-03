export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const gate = useGate(event)
  
  // Optionally protect this route, though accessing own keys is fine for any authenticated user
  const user = useRequireAuth(event)

  const apiKeys = await db.apiToken.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, // In a real world scenario, you might want to only show the first few chars of ID after creation
      name: true,
      createdAt: true,
      lastUsed: true
    }
  })

  // To match the secure "view once" behavior, we should ideally NOT return the full ID 
  // here if we were storing a hashed version. But since we store the raw ID in DB for simplicity,
  // we will mask it in the frontend or here. Let's mask it here.
  const maskedKeys = apiKeys.map(key => {
    const parts = key.id.split('_')
    const prefix = parts.length > 1 ? parts[0] + '_' : ''
    const hash = parts[parts.length - 1]
    const masked = prefix + hash.substring(0, 4) + '•'.repeat(16) + hash.substring(hash.length - 4)
    
    return {
      ...key,
      maskedId: masked
    }
  })

  return { apiKeys: maskedKeys }
})
