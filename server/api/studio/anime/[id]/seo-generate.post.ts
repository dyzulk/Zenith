import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const env = event.context.cloudflare?.env
  if (!env?.AI) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Cloudflare AI binding not found.'
    })
  }

  const body = await readBody(event)
  const { title, type, genres } = body

  if (!title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title is required to generate SEO.'
    })
  }

  const prompt = `You are an expert anime SEO copywriter. Write a highly engaging, click-worthy synopsis and meta description for an anime with the following details:
Title: ${title}
Type: ${type || 'Unknown'}
Genres: ${genres?.join(', ') || 'Unknown'}

Requirements:
- Keep it under 250 words.
- Write in English.
- Make it sound exciting and appealing to anime fans.
- Do NOT include quotes, "Here is the synopsis", or any introductory text. Just return the pure synopsis paragraph.`

  try {
    const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      prompt
    })

    // Llama-3 response format
    const generatedText = response.response?.trim() || ''

    return {
      success: true,
      synopsis: generatedText
    }
  } catch (error: any) {
    console.error('AI Generation Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate SEO with AI: ' + error.message
    })
  }
})
