export default defineEventHandler(async (event) => {
  const db = await useDB(event)
  const gate = useGate(event)
  gate.authorize('roles:manage')

  const roles = await db.role.findMany({
    include: {
      permissions: {
        select: { permissionId: true }
      }
    }
  })

  const allPermissions = await db.permission.findMany()

  return {
    roles: roles.map(r => ({
      ...r,
      permissions: r.permissions.map(p => p.permissionId)
    })),
    availablePermissions: allPermissions
  }
})

