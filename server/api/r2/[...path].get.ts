import { defineEventHandler, createError } from 'h3'
import { useStorageDisk } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  const disk = useStorageDisk(event)
  const path = event.context.params?.path
  
  if (!path) {
    throw createError({ statusCode: 400, statusMessage: 'Missing file path' })
  }

  const file = await disk.get(path)

  if (!file) {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }

  // Set headers
  const headers = new Headers()
  headers.set('Content-Type', file.contentType)
  
  return new Response(file.buffer, {
    headers
  })
})
