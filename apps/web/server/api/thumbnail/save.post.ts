import { AwsClient } from 'aws4fetch'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { episode_id, anime_slug, episode_number, dataUrl } = body

  if (!episode_id || !dataUrl || !anime_slug || !episode_number) {
    throw createError({ statusCode: 400, statusMessage: 'Missing parameters' })
  }

  // Convert base64 to Uint8Array (pure JS for edge compatibility)
  const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "")
  const binaryString = atob(base64Data)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  // Setup R2 Client
  const r2Client = new AwsClient({
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    service: 's3',
    region: 'auto',
  })

  const bucket = process.env.R2_BUCKET_NAME || 'anistream-media'
  const endpoint = process.env.R2_ENDPOINT || ''
  const publicDomain = process.env.R2_PUBLIC_DOMAIN || 'cdn.zenith.dyzulk.net.eu.org'
  const path = `thumbnails/${anime_slug}/ep-${episode_number}.jpg`

  try {
    // Upload to R2 directly with UNSIGNED-PAYLOAD to bypass payload hash signature mismatch
    const uploadRes = await r2Client.fetch(`${endpoint}/${bucket}/${path}`, {
      method: 'PUT',
      body: bytes,
      headers: {
        'Content-Type': 'image/jpeg',
        'x-amz-content-sha256': 'UNSIGNED-PAYLOAD'
      }
    })

    if (!uploadRes.ok) {
      throw new Error(`R2 Upload failed: ${await uploadRes.text()}`)
    }

    // 2. Update Supabase
    const thumbnailUrl = `https://${publicDomain}/${path}`
    const supabase = await serverSupabaseClient(event)
    
    const { error } = await supabase
      .from('episodes')
      .update({ thumbnail_url: thumbnailUrl })
      .eq('id', episode_id)

    if (error) {
      throw error
    }

    return {
      success: true,
      thumbnail_url: thumbnailUrl
    }

  } catch (error: any) {
    console.error('Thumbnail Save Error:', error)
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})
