export interface VideoSource {
  url: string
  quality: string
  format: 'mp4' | 'hls'
}

export interface Subtitle {
  id: string
  label: string
  language: string
  fileKey?: string
  url?: string
}
