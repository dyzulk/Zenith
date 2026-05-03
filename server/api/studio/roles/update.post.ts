export default defineEventHandler(async (event) => {
  const db = useDB(event)
  const gate = useGate(event)
  gate.authorize('roles:manage')

  const body = await readBody(event)
  const { roleId, permissions } = body // permissions: string[]

  if (!roleId || !Array.isArray(permissions)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body' })
  }

  // Transaction: Delete existing permissions for role, then add new ones
  await db.$transaction([
    db.rolePermission.deleteMany({
      where: { roleId }
    }),
    db.rolePermission.createMany({
      data: permissions.map(pId => ({
        roleId,
        permissionId: pId
      }))
    })
  ])

  return { success: true }
})
