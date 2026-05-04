import type { H3Event } from 'h3'

/**
 * Access Cloudflare KV Namespace binding
 */
export const useKV = (event: H3Event) => {
  const { cloudflare } = event.context
  
  if (cloudflare?.env?.KV) {
    return cloudflare.env.KV
  }

  // Fallback for local development or if binding is missing
  return {
    get: async () => null,
    put: async () => {},
    delete: async () => {},
    list: async () => ({ keys: [] })
  } as any
}
