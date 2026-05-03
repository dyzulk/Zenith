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
    const platform = process.env.PAAS || (process.env.VERCEL ? 'vercel' : process.env.NETLIFY ? 'netlify' : process.env.CF_PAGES ? 'cloudflare-pages' : process.env.RENDER ? 'render' : 'local')
    
    // 5. Database Provider Detection
    const dbUrl = new URL(process.env.DATABASE_URL || '')
    const dbHost = dbUrl.hostname
    const dbProvider = dbHost.includes('prisma-postgres.com') ? 'prisma-postgres' : dbHost.includes('aivencloud.com') ? 'aiven' : dbHost.includes('supabase.co') ? 'supabase' : dbHost.includes('neon.tech') ? 'neon' : 'unknown'

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      platform,
      database_provider: dbProvider,
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
        platform: process.platform,
        isDev: process.env.NODE_ENV === 'development'
      }
    }
  } catch (error: any) {
    // Determine platform for error response
    const platform = process.env.PAAS || (process.env.VERCEL ? 'vercel' : process.env.NETLIFY ? 'netlify' : process.env.CF_PAGES ? 'cloudflare-pages' : 'unknown')
    
    throw createError({
      statusCode: 503,
      statusMessage: 'Service Unavailable',
      data: {
        platform,
        message: error.message,
        code: error.code,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    })
  }
})
