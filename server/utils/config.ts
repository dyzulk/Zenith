import type { H3Event } from 'h3'

export const useConfig = (event: H3Event) => {
  const cfEnv = event.context.cloudflare?.env || {}
  const localEnv = process.env

  return {
    // Database
    databaseUrl: cfEnv.DATABASE_URL || localEnv.DATABASE_URL,
    databaseSslCa: cfEnv.DATABASE_SSL_CA || localEnv.DATABASE_SSL_CA,
    databaseSslCaPath: cfEnv.DATABASE_SSL_CA_PATH || localEnv.DATABASE_SSL_CA_PATH,

    // Storage (Standardized)
    r2: cfEnv.R2, // Cloudflare R2 Binding
    filesystemDisk: cfEnv.FILESYSTEM_DISK || localEnv.FILESYSTEM_DISK || 'auto',
    s3Key: cfEnv.S3_KEY || localEnv.S3_KEY,
    s3Secret: cfEnv.S3_SECRET || localEnv.S3_SECRET,
    s3Bucket: cfEnv.S3_BUCKET || localEnv.S3_BUCKET,
    s3Region: cfEnv.S3_REGION || localEnv.S3_REGION || 'auto',
    s3Endpoint: cfEnv.S3_ENDPOINT || localEnv.S3_ENDPOINT,
    s3PublicUrl: cfEnv.S3_PUBLIC_URL || localEnv.S3_PUBLIC_URL,

    // Environment info
    isDev: process.dev || process.env.NODE_ENV === 'development',

    // Broadcasting (Pusher)
    pusherAppId: cfEnv.PUSHER_APP_ID || localEnv.PUSHER_APP_ID,
    pusherKey: cfEnv.PUSHER_KEY || localEnv.PUSHER_KEY,
    pusherSecret: cfEnv.PUSHER_SECRET || localEnv.PUSHER_SECRET,
    pusherCluster: cfEnv.PUSHER_CLUSTER || localEnv.PUSHER_CLUSTER,
  }
}
