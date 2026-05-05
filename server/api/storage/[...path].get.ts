import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const disk = useStorageDisk(event)
  const path = event.context.params?.path
  console.log('[API/Storage/Proxy] Accessing path:', path)
  
  if (!path) {
    throw createError({ statusCode: 400, statusMessage: 'Missing file path' })
  }

  const file = await disk.get(path)

  if (!file) {
    console.warn('[API/Storage/Proxy] File not found:', path)
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }

  console.log('[API/Storage/Proxy] File found, Content-Type:', file.contentType, 'Size:', file.buffer?.byteLength)

  // Set headers
  const headers = new Headers()
  headers.set('Content-Type', file.contentType)
  
  return new Response(file.buffer, {
    headers
  })
})
