import type { H3Event } from 'h3'
import { PrismaClient } from '../lib/prisma-client/edge'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import fs from 'node:fs'

let prisma: PrismaClient

export const useDB = (event: H3Event) => {
  if (prisma) return prisma

  let databaseUrl = event.context.cloudflare?.env?.DATABASE_URL || process.env.DATABASE_URL
  
  if (!databaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: DATABASE_URL not found in environment.'
    })
  }

  // Determine SSL configuration
  let ca = event.context.cloudflare?.env?.DATABASE_SSL_CA || process.env.DATABASE_SSL_CA
  const caPath = event.context.cloudflare?.env?.DATABASE_SSL_CA_PATH || process.env.DATABASE_SSL_CA_PATH
  
  // Local development: allow reading from file path if CA content is not provided
  if (!ca && caPath && process.dev) {
    try {
      ca = fs.readFileSync(caPath, 'utf8')
    } catch (e) {
      console.warn(`[DB] Failed to read CA from path: ${caPath}`)
    }
  }

  const sslMode = databaseUrl.includes('sslmode=require') || databaseUrl.includes('sslmode=verify-full')
  
  let ssl: any = false
  if (ca) {
    ssl = { ca, rejectUnauthorized: true }
  } else if (sslMode) {
    ssl = { rejectUnauthorized: false }
  }

  // Initialize Pool
  // We strip query parameters from the connection string to avoid conflicts with the manual ssl object
  const cleanDatabaseUrl = databaseUrl.split('?')[0]
  const pool = new Pool({ 
    connectionString: cleanDatabaseUrl,
    ssl
  })
  
  pool.on('error', (err) => {
    console.error('[DB] Unexpected error on idle client', err)
  })
  
  const adapter = new PrismaPg(pool)
  prisma = new PrismaClient({ adapter })
  
  return prisma
}

export const useR2 = (event: H3Event) => {
  const env = event.context.cloudflare?.env
  if (env?.R2) return env.R2

  // Fallback for local development (pnpm run dev)
  // We can return a mock or a bridge that uses S3 API if needed
  // For now, let's return a simple bridge that warns if not in Cloudflare
  if (process.env.NODE_ENV === 'development') {
    return {
      get: async (key: string) => {
        // Simple proxy to public R2 domain if available
        const domain = process.env.R2_PUBLIC_DOMAIN || 'localhost'
        const url = `https://${domain}/${key}`
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
