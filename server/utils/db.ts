import type { H3Event } from 'h3'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import fs from 'node:fs'
import { useConfig } from './config'
import { createError } from 'h3'
import { normalizeCA } from './ssl'

export const useDB = (event: H3Event) => {
  // 1. Return existing instance if already created during this request
  if (event.context.prisma) return event.context.prisma

  const config = useConfig(event)
  
  if (!config.databaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: DATABASE_URL not found in environment.'
    })
  }

  // 2. Determine SSL configuration
  let ca = normalizeCA(config.databaseSslCa)
  const caPath = config.databaseSslCaPath
  
  if (!ca && caPath && config.isDev) {
    try {
      ca = fs.readFileSync(caPath, 'utf8')
    } catch (e) {
      console.warn(`[DB] Failed to read CA from path: ${caPath}`)
    }
  }

  const sslMode = config.databaseUrl.includes('sslmode=require') || config.databaseUrl.includes('sslmode=verify-full')
  const cleanDatabaseUrl = config.databaseUrl.split('?')[0]
  const dbUrlObj = new URL(cleanDatabaseUrl)
  const host = dbUrlObj.hostname

  let ssl: any = false
  if (ca) {
    ssl = { ca, rejectUnauthorized: true, servername: host }
  } else if (sslMode) {
    ssl = { rejectUnauthorized: false, servername: host }
  }

  // 3. Initialize Pool with aggressive Serverless limits
  const pool = new Pool({ 
    connectionString: cleanDatabaseUrl,
    ssl,
    max: 1, // Minimize concurrent sockets per Cloudflare worker invocation
    idleTimeoutMillis: 0 // Don't keep sockets alive unnecessarily
  })
  
  pool.on('error', (err) => {
    console.error('[DB] Unexpected error on idle client', err)
  })
  
  // 4. Initialize Prisma
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })
  
  // 5. Save to event context for the duration of this request
  event.context.prisma = prisma

  // 6. Gracefully terminate connection when request is finished
  event.node.res.on('finish', () => {
    prisma.$disconnect().catch(console.error)
  })
  
  return prisma
}

export const useR2 = (event: H3Event) => {
  const config = useConfig(event)

  if (config.r2) return config.r2

  // Fallback for local development (pnpm run dev)
  if (config.isDev) {
    return {
      get: async (key: string) => {
        const url = `https://${config.r2PublicDomain}/${key}`
        return {
          arrayBuffer: () => fetch(url).then(r => r.arrayBuffer()),
          httpMetadata: { contentType: 'application/octet-stream' }
        }
      },
      put: async (key: string, body: any) => {
        console.warn(`[R2 Local Mock] PUT ${key} - R2 binding not available in pnpm run dev.`)
        return { key }
      },
      delete: async (key: string) => {
        console.warn(`[R2 Local Mock] DELETE ${key}`)
      }
    } as any
  }

  throw createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error: R2 Bucket binding not found.'
  })
}
