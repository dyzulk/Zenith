import type { H3Event } from 'h3'

export const useConfig = (event: H3Event) => {
  const cfEnv = event.context.cloudflare?.env || {}
  const localEnv = process.env

  return {
    // Database
    databaseUrl: cfEnv.DATABASE_URL || localEnv.DATABASE_URL,
    databaseSslCa: cfEnv.DATABASE_SSL_CA || localEnv.DATABASE_SSL_CA,
    databaseSslCaPath: cfEnv.DATABASE_SSL_CA_PATH || localEnv.DATABASE_SSL_CA_PATH,

    // Storage
    r2: cfEnv.R2,
    r2PublicDomain: cfEnv.R2_PUBLIC_DOMAIN || localEnv.R2_PUBLIC_DOMAIN || 'localhost',
    r2AccountId: cfEnv.ACCOUNT_ID || localEnv.ACCOUNT_ID,
    r2AccessKeyId: cfEnv.R2_ACCESS_KEY_ID || localEnv.R2_ACCESS_KEY_ID,
    r2SecretAccessKey: cfEnv.R2_SECRET_ACCESS_KEY || localEnv.R2_SECRET_ACCESS_KEY,
    r2BucketName: cfEnv.R2_BUCKET_NAME || localEnv.R2_BUCKET_NAME,

    // Environment info
    isDev: process.dev || process.env.NODE_ENV === 'development',

    // Broadcasting (Pusher)
    pusherAppId: cfEnv.PUSHER_APP_ID || localEnv.PUSHER_APP_ID,
    pusherKey: cfEnv.PUSHER_KEY || localEnv.PUSHER_KEY,
    pusherSecret: cfEnv.PUSHER_SECRET || localEnv.PUSHER_SECRET,
    pusherCluster: cfEnv.PUSHER_CLUSTER || localEnv.PUSHER_CLUSTER,
  }
}
