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
  // Always require auth first
  const user = useRequireAuth(event)

  return {
    /**
     * Throw 403 Forbidden if user is not in the allowed roles
     */
    authorize: (allowedRoles: string | string[]) => {
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
      
      // Superadmin always passes
      if (user.roleId === 'superadmin') return true

      if (!roles.includes(user.roleId)) {
        throw createError({ 
          statusCode: 403, 
          statusMessage: 'Forbidden - You do not have permission to perform this action' 
        })
      }
      
      return true
    },
    
    /**
     * Return boolean to safely check permissions without throwing errors
     */
    allows: (allowedRoles: string | string[]) => {
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
      if (user.roleId === 'superadmin') return true
      return roles.includes(user.roleId)
    }
  }
}
