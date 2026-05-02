import { defineEventHandler, createError } from 'h3'
import { z } from 'zod'
import { useDB } from '../../../../utils/db'
import { useStorageDisk } from '../../../../utils/storage'
import { useValidatedFormData, useValidatedBody } from '../../../../utils/request'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const episodeId = event.context.params?.id
  const db = useDB(event)
  const disk = useStorageDisk(event)

  if (!episodeId) throw createError({ statusCode: 400, statusMessage: 'Episode ID is required' })

  if (method === 'GET') {
    const subtitles = await db.subtitle.findMany({
      where: { episodeId: episodeId },
      orderBy: { language: 'asc' }
    })
    return {
      subtitles
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
    const r2Key = `episodes/${episodeId}/subtitles/${id}.${extension}`

    // Upload to R2 via Storage handler
    await disk.put(r2Key, data.file.data, { contentType: 'text/vtt' })

    // Save to DB
    const subtitle = await db.subtitle.create({
      data: {
        id,
        episodeId,
        language,
        label,
        r2Key
      }
    })

    return subtitle
  }

  if (method === 'DELETE') {
    const schema = z.object({ id: z.string().min(1, 'Subtitle ID is required') })
    const { id } = await useValidatedBody(event, schema)

    const subtitle = await db.subtitle.findUnique({ where: { id } })
    if (subtitle) {
      // Delete from R2 via Storage handler
      await disk.delete(subtitle.r2Key)
      await db.subtitle.delete({ where: { id } })
    }

    return { success: true }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
})
