import { defineEventHandler, createError } from 'h3'
import { z } from 'zod'
import { eq, asc } from 'drizzle-orm'
import { subtitles as subtitlesTable } from "../../../../database/schema"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const episodeId = event.context.params?.id
  const db = useD1(event)
  const disk = useStorageDisk(event)

  if (!episodeId) throw createError({ statusCode: 400, statusMessage: 'Episode ID is required' })

  if (method === 'GET') {
    const subtitles = await db.query.subtitles.findMany({
      where: eq(subtitlesTable.episodeId, episodeId),
      orderBy: [asc(subtitlesTable.language)]
    })
    return {
      subtitles: subtitles.map(s => ({
        ...s,
        url: disk.getPublicUrl(s.fileKey)
      }))
    }
  }

  if (method === 'POST') {
    const schema = z.object({
      language: z.string().min(1, 'Language is required'),
      label: z.string().min(1, 'Label is required'),
      file: z.any().refine((f) => f && f.filename, 'Subtitle file is required')
    })

    const data = await useValidatedFormData(event, schema)

    const language = data.language
    const label = data.label
    const extension = data.file.filename?.split('.').pop() || 'vtt'
    
    // Generate unique ID for subtitle
    const id = crypto.randomUUID()
    const fileKey = `episodes/${episodeId}/subtitles/${id}.${extension}`

    // Upload to Storage via handler
    await disk.put(fileKey, data.file.data, { contentType: 'text/vtt' })

    // Save to DB
    const values = {
      id,
      episodeId,
      language,
      label,
      fileKey
    }
    
    await db.insert(subtitlesTable).values(values)

    return values
  }

  if (method === 'DELETE') {
    const schema = z.object({ id: z.string().min(1, 'Subtitle ID is required') })
    const { id } = await useValidatedBody(event, schema)

    const subtitle = await db.query.subtitles.findFirst({
      where: eq(subtitlesTable.id, id)
    })
    
    if (subtitle) {
      // Delete from Storage via handler
      await disk.delete(subtitle.fileKey)
      await db.delete(subtitlesTable).where(eq(subtitlesTable.id, id))
    }

    return { success: true }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
})
