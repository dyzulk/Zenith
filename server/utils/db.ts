import type { H3Event } from 'h3'

export const useDB = (event: H3Event) => {
  const env = event.context.cloudflare?.env
  if (!env || !env.DB) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: D1 Database binding not found.'
    })
  }
  return env.DB
}

export const useR2 = (event: H3Event) => {
  const env = event.context.cloudflare?.env
  if (!env || !env.R2) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: R2 Bucket binding not found.'
    })
  }
  return env.R2
}
