import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { path, contentType } = body

  if (!path) {
    throw createError({ statusCode: 400, statusMessage: 'Path is required' })
  }

  const disk = useStorageDisk(event)

  try {
    const url = await disk.getPresignedUploadUrl(path, contentType || 'application/octet-stream')
    return { url }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to generate signed URL' })
  }
})

