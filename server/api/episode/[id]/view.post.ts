import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const env = event.context.cloudflare?.env
  const episodeId = event.context.params?.id

  if (!env?.VIEWS) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Cloudflare Analytics Engine binding not found.'
    })
  }

  if (!episodeId) {
    throw createError({ statusCode: 400, statusMessage: 'Episode ID is required.' })
  }

  try {
    // Write data point to Cloudflare Analytics Engine
    // blobs: [episode_id, user_agent or anonymous]
    env.VIEWS.writeDataPoint({
      blobs: [
        episodeId,
        event.node.req.headers['user-agent'] || 'anonymous'
      ],
      doubles: [1], // represents 1 view
      indexes: [episodeId] // useful for fast querying by episode
    })

    return { success: true }
  } catch (err: any) {
    console.error('Failed to log view:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to record view'
    })
  }
})
