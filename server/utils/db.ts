import type { H3Event } from 'h3'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import fs from 'node:fs'
import { useConfig } from './config'
import { createError } from 'h3'
import { normalizeCA } from './ssl'

// Global instances to persist across serverless invocations
let globalPrisma: PrismaClient | null = null
let globalPool: Pool | null = null

export const useDB = (event: H3Event) => {
  // 1. Return existing instance if already created during this request
  if (event.context.prisma) return event.context.prisma
  
  // 2. Return global instance if already initialized in this worker instance
  if (globalPrisma) {
    event.context.prisma = globalPrisma
    return globalPrisma
  }

  const config = useConfig(event)
  
  if (!config.databaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: DATABASE_URL not found in environment.'
    })
  }

  // 3. Determine SSL configuration
  // Prioritize CA from Nitro Assets (loaded by plugin)
  let ca = (globalThis as any).__ZENITH_CA_CERT__ || normalizeCA(config.databaseSslCa)
  const caPath = config.databaseSslCaPath
  
  if (!ca && caPath && config.isDev) {
    try {
      ca = fs.readFileSync(caPath, 'utf8')
    } catch (e) {
      console.warn(`[DB] Failed to read CA from path: ${caPath}`)
    }
  }

  // Robust URL parsing: Keep the original URL but separate params for Pool config
  // This avoids issues with passwords containing '?' or '#'
  const dbUrl = new URL(config.databaseUrl)
  const host = dbUrl.hostname
  const sslMode = dbUrl.searchParams.get('sslmode') === 'require' || dbUrl.searchParams.get('sslmode') === 'verify-full'
  
  // Create a connection string WITHOUT search params for the Pool
  const cleanUrl = new URL(config.databaseUrl)
  cleanUrl.search = ''
  const connectionString = cleanUrl.toString()

  let ssl: any = false
  if (ca) {
    console.log(`[DB] Using CA certificate for ${host}`)
    ssl = { ca, rejectUnauthorized: true, servername: host }
  } else if (sslMode || host.includes('aivencloud.com')) {
    console.log(`[DB] SSL Mode required for ${host}`)
    ssl = { rejectUnauthorized: false, servername: host }
  }

  // 4. Initialize Pool with aggressive Serverless limits
  const pool = new Pool({ 
    connectionString,
    ssl,
    max: 1, // Minimize concurrent sockets per Cloudflare worker invocation
    idleTimeoutMillis: 10000, // Keep connection alive for 10s of idleness
    connectionTimeoutMillis: 5000 // Fail fast if connection cannot be established
  })
  
  pool.on('error', (err) => {
    console.error('[DB] Unexpected error on idle client', err)
    // Clear global instances on fatal pool error to force re-initialization
    globalPrisma = null
    globalPool = null
  })
  
  // 5. Initialize Prisma
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })
  
  // 6. Save to global and event context
  globalPrisma = prisma
  globalPool = pool
  event.context.prisma = prisma

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
