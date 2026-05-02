import Pusher from 'pusher'

export const usePusher = (event: any) => {
  const env = event.context.cloudflare?.env || process.env

  const appId = env.PUSHER_APP_ID
  const key = env.PUSHER_KEY
  const secret = env.PUSHER_SECRET
  const cluster = env.PUSHER_CLUSTER

  if (!appId || !key || !secret || !cluster) {
    console.error('[Pusher] Missing credentials')
    return null
  }

  return new Pusher({
    appId,
    key,
    secret,
    cluster,
    useTLS: true,
  })
}
