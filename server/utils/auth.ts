import { createError } from 'h3'
import type { H3Event } from 'h3'

/**
 * Ensures a user is authenticated, otherwise throws 401 Unauthorized
 * Similar to Laravel's Auth::user() or auth middleware
 */
export const useRequireAuth = (event: H3Event) => {
  const user = event.context.user
  
  if (!user) {
    throw createError({ 
      statusCode: 401, 
      statusMessage: 'Unauthorized - Please login to continue' 
    })
  }
  
  return user
}

/**
 * Role-based Authorization Gate
 * Similar to Laravel's Gate::allows() or Gate::authorize()
 */
export const useGate = (event: H3Event) => {
  const user = useRequireAuth(event)
  
  // Flatten permissions for easier checking
  const userPermissions = user.role?.permissions?.map((p: any) => p.permissionId) || []
  const isSuperadmin = user.roleId === 'superadmin'

  return {
    /**
     * Throw 403 Forbidden if user doesn't have the required permission(s)
     */
    authorize: (required: string | string[]) => {
      const requirements = Array.isArray(required) ? required : [required]
      
      // Superadmin bypass
      if (isSuperadmin) return true

      const hasPermission = requirements.some(req => userPermissions.includes(req))

      if (!hasPermission) {
        throw createError({ 
          statusCode: 403, 
          statusMessage: 'Forbidden - Missing required permission: ' + requirements.join(', ')
        })
      }
      
      return true
    },
    
    /**
     * Return boolean to safely check permissions
     */
    allows: (required: string | string[]) => {
      const requirements = Array.isArray(required) ? required : [required]
      if (isSuperadmin) return true
      return requirements.some(req => userPermissions.includes(req))
    }
  }
}
