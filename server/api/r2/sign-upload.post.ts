import { defineEventHandler, readBody, createError } from 'h3'
import { AwsClient } from 'aws4fetch'

export default defineEventHandler(async (event) => {
  const env = event.context.cloudflare?.env
  const body = await readBody(event)
  const { path, contentType } = body

  if (!path) {
    throw createError({ statusCode: 400, statusMessage: 'Path is required' })
  }

  const r2 = new AwsClient({
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    region: 'auto',
    service: 's3',
  })

  try {
    const url = new URL(`https://${env.R2_BUCKET_NAME}.${env.ACCOUNT_ID}.r2.cloudflarestorage.com/${path}`)
    
    // Sign the request
    const signedRequest = await r2.sign(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': contentType || 'application/octet-stream'
      }
    })

    return { 
      url: signedRequest.url,
      headers: Object.fromEntries(signedRequest.headers.entries())
    }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to generate signed URL' })
  }
})
