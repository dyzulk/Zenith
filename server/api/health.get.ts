import { defineEventHandler, createError } from 'h3'
import { useDB } from '../utils/db'

export default defineEventHandler(async (event) => {
  const prisma = useDB(event)
  
  try {
    // 1. Check Database Connectivity
    const dbStart = Date.now()
    await prisma.$queryRaw`SELECT 1`
    const dbLatency = Date.now() - dbStart
    
    // 2. Check Cloudflare Context
    const hasCloudflare = !!event.context.cloudflare
    const env = event.context.cloudflare?.env || process.env
    
    // 3. Check R2 Binding
    const hasR2 = !!env.R2
    
    // 4. System Info
    const nodeVersion = process.version
    const platform = process.platform
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: 'connected',
          latency: `${dbLatency}ms`
        },
        r2: {
          status: hasR2 ? 'bound' : 'not_found'
        },
        edge: {
          active: hasCloudflare
        }
      },
      environment: {
        node: nodeVersion,
        platform: platform,
        isDev: process.env.NODE_ENV === 'development'
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Service Unavailable',
      data: {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    })
  }
})
