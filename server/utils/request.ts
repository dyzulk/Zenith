import { readBody, readMultipartFormData, createError } from 'h3'
import type { H3Event } from 'h3'
import { z } from 'zod'

/**
 * Validates JSON body against a Zod schema
 */
export const useValidatedBody = async <T extends z.ZodTypeAny>(event: H3Event, schema: T): Promise<z.infer<T>> => {
  const body = await readBody(event)
  const result = schema.safeParse(body)
  
  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation Failed',
      data: { errors: result.error.flatten().fieldErrors }
    })
  }
  
  return result.data
}

/**
 * Parses and validates Multipart FormData against a Zod schema
 */
export const useValidatedFormData = async <T extends z.ZodTypeAny>(event: H3Event, schema: T): Promise<z.infer<T>> => {
  const formData = await readMultipartFormData(event)
  if (!formData) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid form data' })
  }

  // Convert array of MultiPartData into a flat object
  const data: Record<string, any> = {}
  
  for (const field of formData) {
    const name = field.name
    if (!name) continue

    // If it's a file, pass the whole field (buffer, filename, type)
    if (field.filename) {
      data[name] = field
    } else {
      // Otherwise it's a string field
      data[name] = field.data.toString('utf-8')
    }
  }

  const result = schema.safeParse(data)
  
  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation Failed',
      data: { errors: result.error.flatten().fieldErrors }
    })
  }

  return result.data
}
