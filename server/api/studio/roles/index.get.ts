import { useD1 } from '../../../utils/d1'
import { roles as rolesTable, permissions as permissionsTable } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const gate = useGate(event)
  gate.authorize('roles:manage')

  const roles = await db.query.roles.findMany({
    with: {
      permissions: {
        columns: { permissionId: true }
      }
    }
  })

  const allPermissions = await db.query.permissions.findMany()

  return {
    roles: roles.map(r => ({
      ...r,
      permissions: r.permissions.map(p => p.permissionId)
    })),
    availablePermissions: allPermissions
  }
})

