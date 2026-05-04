import { eq } from 'drizzle-orm'
import { useD1 } from '../../../utils/d1'
import { rolePermissions } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const gate = useGate(event)
  gate.authorize('roles:manage')

  const body = await readBody(event)
  const { roleId, permissions } = body // permissions: string[]

  if (!roleId || !Array.isArray(permissions)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body' })
  }

  try {
    // Transaction: Delete existing permissions for role, then add new ones
    await db.transaction(async (tx) => {
      await tx.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId))
      
      if (permissions.length > 0) {
        await tx.insert(rolePermissions).values(
          permissions.map(pId => ({
            roleId,
            permissionId: pId
          }))
        )
      }
    })

    return { success: true }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})

