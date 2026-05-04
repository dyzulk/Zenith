import type { H3Event } from 'h3'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema'

/**
 * Access Cloudflare D1 Database via Drizzle ORM
 */
export const useD1 = (event: H3Event) => {
  const { cloudflare } = event.context

  if (cloudflare?.env?.DB) {
    return drizzle(cloudflare.env.DB, { schema })
  }

  // If DB binding is missing (e.g. during dev without miniflare setup), 
  // you might want a fallback, but Nitro usually handles this.
  throw createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error: D1 Database binding (DB) not found.'
  })
}
