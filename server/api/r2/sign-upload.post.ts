import { defineEventHandler, readBody, createError } from 'h3'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default defineEventHandler(async (event) => {
  const env = event.context.cloudflare?.env
  const body = await readBody(event)
  const { path, contentType } = body

  if (!path) {
    throw createError({ statusCode: 400, statusMessage: 'Path is required' })
  }

  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
  })

  const command = new PutObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: path,
    ContentType: contentType || 'application/octet-stream'
  })

  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    return { url }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to generate signed URL' })
  }
})
