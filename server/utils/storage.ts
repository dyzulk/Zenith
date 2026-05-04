import type { H3Event } from 'h3'
import { AwsClient } from 'aws4fetch'
import { useConfig } from './config'

/**
 * Lightweight helper — only needs S3_PUBLIC_URL.
 * Use this in read-only endpoints that just need to resolve public URLs.
 */
export const useStoragePublicUrl = (event: H3Event) => {
  const config = useConfig(event)
  return {
    async getPublicUrl(key: string): Promise<string> {
      const dbSetting = await getSiteSetting(event, 'r2_public_url', '')
      const publicBase = (dbSetting || config.s3PublicUrl || '').replace(/\/$/, '')
      return `${publicBase}/${key}`
    }
  }
}

export const useStorageDisk = (event: H3Event) => {
  const config = useConfig(event)

  const requireS3 = () => {
    if (useR2Binding()) return // R2 binding doesn't need S3 credentials
    if (!config.s3Bucket || !config.s3Key || !config.s3Secret) {
      throw createError({ statusCode: 500, statusMessage: 'Storage configuration is missing' })
    }
  }

  const s3Client = () => {
    requireS3()
    return new AwsClient({
      accessKeyId: config.s3Key!,
      secretAccessKey: config.s3Secret!,
      region: config.s3Region,
      service: 's3',
    })
  }

  /**
   * Determine the base URL for S3 API requests.
   * Format: https://bucket.endpoint
   * Fallback for AWS: https://bucket.s3.region.amazonaws.com
   */
  const getBaseUrl = () => {
    if (config.s3Endpoint) {
      const endpoint = config.s3Endpoint.startsWith('http') ? config.s3Endpoint : `https://${config.s3Endpoint}`
      // Check if it's a domain-style endpoint where we should prefix the bucket
      return `https://${config.s3Bucket}.${endpoint.replace(/^https?:\/\//, '')}`
    }
    // Default AWS S3 format
    return `https://${config.s3Bucket}.s3.${config.s3Region}.amazonaws.com`
  }

  /**
   * Determine if we should use the native Cloudflare R2 binding.
   */
  const useR2Binding = () => {
    if (config.filesystemDisk === 'r2-binding') return !!config.r2
    if (config.filesystemDisk === 's3') return false
    // 'auto' mode: Use binding if it exists AND no custom endpoint is provided
    return !!config.r2 && !config.isDev && !config.s3Endpoint
  }

  return {
    /**
     * Get file buffer from storage
     */
    async get(key: string): Promise<{ buffer: ArrayBuffer, contentType: string } | null> {
      if (useR2Binding()) {
        const object = await (config.r2 as any).get(key)
        if (!object) return null
        return { 
          buffer: await object.arrayBuffer(),
          contentType: object.httpMetadata?.contentType || 'application/octet-stream'
        }
      }
      
      const response = await s3Client().fetch(`${getBaseUrl()}/${key}`)
      if (!response.ok) return null
      return {
        buffer: await response.arrayBuffer(),
        contentType: response.headers.get('Content-Type') || 'application/octet-stream'
      }
    },

    /**
     * Put file into storage
     */
    async put(key: string, body: any, options?: { contentType?: string }): Promise<void> {
      if (useR2Binding()) {
        await (config.r2 as any).put(key, body, {
          httpMetadata: options?.contentType ? { contentType: options.contentType } : undefined
        })
        return
      }
      
      const response = await s3Client().fetch(`${getBaseUrl()}/${key}`, {
        method: 'PUT',
        body,
        headers: options?.contentType ? { 'Content-Type': options.contentType } : undefined
      })
      
      if (!response.ok) {
        throw new Error(`Failed to upload to S3: ${response.statusText}`)
      }
    },

    /**
     * Delete file from storage
     */
    async delete(key: string): Promise<void> {
      if (useR2Binding()) {
        await (config.r2 as any).delete(key)
        return
      }
      
      const response = await s3Client().fetch(`${getBaseUrl()}/${key}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error(`Failed to delete from S3: ${response.statusText}`)
      }
    },

    /**
     * Generate presigned URL for direct browser uploads
     */
    async getPresignedUploadUrl(key: string, contentType: string = 'application/octet-stream'): Promise<string> {
      const url = new URL(`${getBaseUrl()}/${key}`)
      const signedRequest = await s3Client().sign(url.toString(), {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        aws: { signQuery: true }
      })
      return signedRequest.url
    },

    /**
     * Get public URL for client consumption
     */
    async getPublicUrl(key: string): Promise<string> {
      const dbSetting = await getSiteSetting(event, 'r2_public_url', '')
      const publicBase = (dbSetting || config.s3PublicUrl || '').replace(/\/$/, '')
      return `${publicBase}/${key}`
    }
  }
}
