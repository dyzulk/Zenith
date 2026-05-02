import type { H3Event } from 'h3'
import { AwsClient } from 'aws4fetch'
import { useConfig } from './config'

export const useStorageDisk = (event: H3Event) => {
  const config = useConfig(event)
  
  if (!config.r2AccountId || !config.r2BucketName || !config.r2AccessKeyId || !config.r2SecretAccessKey) {
    throw createError({ statusCode: 500, statusMessage: 'Storage configuration is missing' })
  }

  const s3Client = new AwsClient({
    accessKeyId: config.r2AccessKeyId,
    secretAccessKey: config.r2SecretAccessKey,
    region: 'auto',
    service: 's3',
  })

  const getBaseUrl = () => `https://${config.r2BucketName}.${config.r2AccountId}.r2.cloudflarestorage.com`

  return {
    /**
     * Get file buffer from storage
     */
    async get(key: string): Promise<{ buffer: ArrayBuffer, contentType: string } | null> {
      // Use R2 binding in production for zero egress overhead
      if (config.r2 && !config.isDev) {
        const object = await config.r2.get(key)
        if (!object) return null
        return { 
          buffer: await object.arrayBuffer(),
          contentType: object.httpMetadata?.contentType || 'application/octet-stream'
        }
      }
      // Fallback to S3 API for local development
      const response = await s3Client.fetch(`${getBaseUrl()}/${key}`)
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
      if (config.r2 && !config.isDev) {
        await config.r2.put(key, body, {
          httpMetadata: options?.contentType ? { contentType: options.contentType } : undefined
        })
        return
      }
      
      const response = await s3Client.fetch(`${getBaseUrl()}/${key}`, {
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
      if (config.r2 && !config.isDev) {
        await config.r2.delete(key)
        return
      }
      
      const response = await s3Client.fetch(`${getBaseUrl()}/${key}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error(`Failed to delete from S3: ${response.statusText}`)
      }
    },

    /**
     * Generate presigned URL for direct browser uploads
     */
    async getPresignedUploadUrl(key: string, contentType: string = 'application/octet-stream'): Promise<string> {
      const url = new URL(`${getBaseUrl()}/${key}`)
      const signedRequest = await s3Client.sign(url.toString(), {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        aws: { signQuery: true }
      })
      return signedRequest.url
    },

    /**
     * Get public URL for client consumption
     */
    getPublicUrl(key: string): string {
      return `https://${config.r2PublicDomain}/${key}`
    }
  }
}
