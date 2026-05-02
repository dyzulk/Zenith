import { PrismaClient } from '../server/lib/prisma-client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import fs from 'node:fs'
import dotenv from 'dotenv'

dotenv.config()

async function checkUser() {
  const databaseUrl = process.env.DATABASE_URL?.split('?')[0]
  const caPath = process.env.DATABASE_SSL_CA_PATH
  
  let ssl: any = false
  if (caPath && fs.existsSync(caPath)) {
    ssl = { ca: fs.readFileSync(caPath, 'utf8'), rejectUnauthorized: true }
  } else {
    ssl = { rejectUnauthorized: false }
  }

  const pool = new Pool({ connectionString: databaseUrl, ssl })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  try {
    const user = await prisma.profile.findUnique({
      where: { username: 'superadmin' }
    })
    
    if (user) {
      console.log('User found:', user.username)
      console.log('Role:', user.role)
      console.log('Password Hash exists:', !!user.passwordHash)
    } else {
      console.log('User NOT found: superadmin')
    }
  } catch (error: any) {
    console.error('Error:', error.message)
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

checkUser()
