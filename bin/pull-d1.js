#!/usr/bin/env node
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const config = {
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  databaseId: process.env.CLOUDFLARE_DATABASE_ID,
  token: process.env.CLOUDFLARE_D1_TOKEN,
  localDb: 'server/database/local.db',
  tempSql: 'scratch/dump.sql'
}

async function pull() {
  console.log('--- GoxStream D1 Pull CLI ---')
  
  if (!config.token || !config.databaseId || !config.accountId) {
    console.error('Error: Missing Cloudflare credentials in .env')
    process.exit(1)
  }

  try {
    // 1. Get database name
    console.log('1. Identifying remote database...')
    const listOutput = execSync('npx wrangler d1 list', {
      env: { 
        ...process.env, 
        CLOUDFLARE_API_TOKEN: config.token,
        CLOUDFLARE_ACCOUNT_ID: config.accountId 
      }
    }).toString()
    
    // Simple parser to find the name for the ID
    const lines = listOutput.split('\n')
    let dbName = ''
    for (const line of lines) {
      if (line.includes(config.databaseId)) {
        // Find the name in the row (usually looks like: id | name | ...)
        const parts = line.split(/[│|]/).map(p => p.trim())
        // In wrangler output, name is often the second or third column
        dbName = parts.find(p => p && p !== config.databaseId && !p.includes('-') && !p.includes(':'))
        break
      }
    }

    if (!dbName) {
      // Fallback: try to grep name if simple parser fails
      console.warn('Warning: Could not auto-detect DB name, using "goxstream" as fallback.')
      dbName = 'goxstream'
    }

    console.log(`Target Database: ${dbName} (${config.databaseId})`)

    // 2. Export remote D1 to SQL
    console.log('2. Exporting remote database (this may take a minute)...')
    execSync(`npx wrangler d1 export ${dbName} --remote --output=${config.tempSql}`, {
      env: { 
        ...process.env, 
        CLOUDFLARE_API_TOKEN: config.token,
        CLOUDFLARE_ACCOUNT_ID: config.accountId 
      },
      stdio: 'inherit'
    })

    // 3. Create/Reset local SQLite
    console.log(`3. Creating local database at ${config.localDb}...`)
    
    // Ensure directory exists
    const dbDir = path.dirname(config.localDb)
    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true })
    
    // Delete existing local db to ensure clean sync
    if (fs.existsSync(config.localDb)) {
      fs.unlinkSync(config.localDb)
    }

    // 4. Import SQL to local SQLite
    console.log('4. Importing data to local SQLite...')
    
    // We use sqlite3 CLI as it is confirmed to be available
    execSync(`sqlite3 ${config.localDb} < ${config.tempSql}`, { stdio: 'inherit' })

    console.log('\nSUCCESS: Database successfully pulled to local.db!')
    console.log('Now update your .env to use the local database.')
    
  } catch (error) {
    console.error('\nFAILED:', error.message)
    process.exit(1)
  }
}

pull()
