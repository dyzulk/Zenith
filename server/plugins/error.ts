import { defineNitroPlugin } from 'nitro/runtime'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', async (error, { event }) => {
    // Only format JSON errors for API routes
    if (!event || !event.path.startsWith('/api/')) return

    const statusCode = (error as any).statusCode || 500
    const statusMessage = (error as any).statusMessage || 'Internal Server Error'
    
    // Check if it's a validation error thrown by useValidatedRequest
    const errorData = (error as any).data
    const isValidationError = statusCode === 422 && errorData && errorData.errors

    const response = {
      message: isValidationError ? 'Validation Failed' : statusMessage,
      ...(isValidationError ? { errors: errorData.errors } : {}),
      // Hide stack trace in production
      ...(process.env.NODE_ENV === 'development' && !isValidationError ? { stack: error.stack } : {})
    }

    // Since Nitro intercepts the error, we overwrite the response manually
    event.node.res.setHeader('Content-Type', 'application/json')
    event.node.res.statusCode = statusCode
    event.node.res.end(JSON.stringify(response))
  })
})
