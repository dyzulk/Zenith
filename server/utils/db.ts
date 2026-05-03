import type { H3Event } from 'h3'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
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

  // Robust URL parsing
  const dbUrl = new URL(config.databaseUrl)
  const host = dbUrl.hostname
  const sslMode = dbUrl.searchParams.get('sslmode') === 'require' || dbUrl.searchParams.get('sslmode') === 'verify-full'
  
  // Create a clean connection string for the Pool
  const cleanUrl = new URL(config.databaseUrl)
  cleanUrl.search = ''
  const connectionString = cleanUrl.toString()

  // 3. Provider-Aware SSL Configuration
  let ssl: any = false
  const isCloudflare = !!event.context.cloudflare
  const isAiven = host.includes('aivencloud.com')
  const isPrisma = host.includes('prisma-postgres.com') || host.includes('prisma.io')
  const isSupabase = host.includes('supabase.co')
  const isNeon = host.includes('neon.tech')

  // Determine if we should use CA certificate
  let ca = (globalThis as any).__ZENITH_CA_CERT__ || normalizeCA(config.databaseSslCa)
  
  // ONLY attempt to read from file if on server (Node.js) and it's Aiven
  if (!ca && config.databaseSslCaPath && process.server && isAiven) {
    try {
      // Dynamic import to avoid breaking Edge runtimes
      const fs = await import('node:fs')
      ca = fs.readFileSync(config.databaseSslCaPath, 'utf8')
    } catch (e) {
      console.warn(`[DB] Failed to read CA from path: ${config.databaseSslCaPath}`)
    }
  }

  if (isAiven && ca) {
    console.log(`[DB] Using Aiven CA certificate for ${host}`)
    ssl = { ca, rejectUnauthorized: true, servername: host }
  } else if (isPrisma || isSupabase || isNeon || sslMode) {
    console.log(`[DB] Using standard SSL mode for ${host} (${isPrisma ? 'Prisma' : isSupabase ? 'Supabase' : 'Neon'})`)
    // Standard serverless SSL: allow self-signed or verified by platform
    ssl = { rejectUnauthorized: false, servername: host }
  }

  // 4. Initialize Pool with environment-specific limits
  const pool = new Pool({ 
    connectionString,
    ssl: ssl ? { ...ssl, rejectUnauthorized: isCloudflare ? false : ssl.rejectUnauthorized } : ssl,
    max: 1, 
    idleTimeoutMillis: isCloudflare ? 5000 : 30000, 
    connectionTimeoutMillis: isCloudflare ? 10000 : 5000 
  })
  
  pool.on('error', (err) => {
    console.error('[DB] Unexpected error on idle client', err)
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
