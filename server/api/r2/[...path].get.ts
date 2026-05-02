export default defineEventHandler(async (event) => {
  const r2 = useR2(event)
  const path = event.context.params?.path
  
  if (!path) {
    throw createError({ statusCode: 400, statusMessage: 'Missing file path' })
  }

  const object = await r2.get(path)

  if (!object) {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }

  // Set headers
  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  
  return new Response(object.body, {
    headers
  })
})
