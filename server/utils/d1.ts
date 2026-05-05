import type { H3Event } from 'h3'
import { drizzle as drizzleD1 } from 'drizzle-orm/d1'
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from '../database/schema'
import path from 'path'
import fs from 'fs'

let _db: any = null

/**
 * Access Database via Drizzle ORM
 * In production, it uses Cloudflare D1.
 * In development, it uses local SQLite (local.db).
 */
export const useD1 = (event: H3Event) => {
  const { cloudflare } = event.context

  // 1. Production / Wrangler Dev
  if (cloudflare?.env?.DB) {
    return drizzleD1(cloudflare.env.DB, { schema })
  }

  // 2. Local Dev (Better-SQLite3)
  if (process.dev) {
    if (_db) return _db

    const dbPath = path.join(process.cwd(), process.env.DATABASE_URL || 'server/database/local.db')
    
    // Ensure the directory exists
    const dbDir = path.dirname(dbPath)
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }

    // Create a local SQLite instance
    const sqlite = new Database(dbPath)
    _db = drizzleSqlite(sqlite, { schema })
    
    console.log(`[Drizzle] Using local SQLite database at: ${dbPath}`)
    
    return _db
  }

  // Fallback for other environments if needed
  throw createError({
    statusCode: 500,
    statusMessage: 'Database connection failed. Please ensure you are in development or production environment.'
  })
}
