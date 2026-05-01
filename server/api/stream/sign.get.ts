import { AwsClient } from 'aws4fetch'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const path = query.path as string
  const config = useRuntimeConfig()

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing object path',
    })
  }

  // 1. Verify Authorization Header (Optional for now, but kept for parity)
  // In Pages, you might want to use the session from Supabase
  const authHeader = getHeader(event, 'Authorization')
  
  // 2. Setup AWS Client for R2
  // We use process.env here as Nitro on Cloudflare exposes them
  const r2Client = new AwsClient({
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    service: 's3',
    region: 'auto',
  })

  const endpoint = process.env.R2_ENDPOINT || ''
  const publicDomain = process.env.R2_PUBLIC_DOMAIN || ''

  try {
    const signedRequest = await r2Client.sign(
      new Request(`${endpoint}/${path}`, { method: 'GET' }),
      { aws: { signQuery: true }, expiresIn: 3600 }
    )

    // Construct public URL
    const publicUrl = new URL(signedRequest.url)
    const customDomain = process.env.R2_PUBLIC_DOMAIN || 'cdn.zenith.dyzulk.net.eu.org'
    publicUrl.host = customDomain
    publicUrl.protocol = 'https:'

    return {
      url: publicUrl.toString(),
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      quality: query.quality || '720p'
    }
  } catch (error: any) {
    console.error('Signing Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
