import { defineEventHandler, createError } from 'h3'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const db = useD1(event)
  
  try {
    // 1. Check Database (D1) Connectivity
    const dbStart = Date.now()
    await db.run(sql`SELECT 1`)
    const dbLatency = Date.now() - dbStart
    
    // 2. Check Cloudflare Context
    const hasCloudflare = !!event.context.cloudflare
    const env = event.context.cloudflare?.env || process.env
    
    // 3. Check R2 Binding
    const hasR2 = !!env.R2
    const hasKV = !!env.KV
    
    // 4. System Info
    const nodeVersion = process.version
    const platform = 'cloudflare-pages' // Targeting migration to CF Pages
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      platform,
      database_provider: 'cloudflare-d1',
      services: {
        database: {
          status: 'connected',
          latency: `${dbLatency}ms`
        },
        r2: {
          status: hasR2 ? 'bound' : 'not_found'
        },
        kv: {
          status: hasKV ? 'bound' : 'not_found'
        },
        edge: {
          active: hasCloudflare
        }
      },
      environment: {
        node: nodeVersion,
        isDev: process.env.NODE_ENV === 'development'
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Service Unavailable',
      data: {
        message: error.message,
        code: error.code
      }
    })
  }
})


