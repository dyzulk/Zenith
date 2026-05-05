import { ref, watch, type Ref } from 'vue'
import type HlsType from 'hls.js'
import type { VideoSource } from '../types'

export function useHls(
  videoRef: Ref<HTMLVideoElement | null>,
  currentSource: Ref<VideoSource | undefined>,
  autoPlay: boolean = false
): {
  hls: Ref<HlsType | null>
  initHls: () => Promise<void>
  destroyHls: () => void
} {
  const hls = ref<HlsType | null>(null)
  let Hls: any = null

  const initHls = async () => {
    if (typeof window === 'undefined') return
    if (!videoRef.value || !currentSource.value?.url) return

    // Force loading state when source changes
    // @ts-ignore - access shared state if possible, or handle via events
    // For now we rely on the video events in the main component
    
    const url = currentSource.value.url
    const isHls = currentSource.value.format === 'hls' || url.includes('.m3u8')

    if (hls.value) {
      hls.value.destroy()
      hls.value = null
    }

    if (isHls) {
      if (!Hls) {
        try {
          const m = await import('hls.js')
          Hls = m.default
        } catch (e) {
          // @ts-ignore
          if (window.Hls) Hls = window.Hls
        }
      }

      if (Hls && Hls.isSupported()) {
        const hlsInstance = new Hls({
          capLevelToPlayerSize: true,
          autoStartLoad: true
        })
        hlsInstance.loadSource(url)
        hlsInstance.attachMedia(videoRef.value)
        hls.value = hlsInstance
      } else {
        videoRef.value.src = url
        videoRef.value.load()
      }
    } else {
      // Direct MP4 or other native format
      videoRef.value.src = url
      videoRef.value.load()
    }

    if (autoPlay) {
      videoRef.value.play().catch(() => {})
    }
  }

  watch(() => currentSource.value?.url, () => {
    initHls()
  })

  const destroyHls = () => {
    if (hls.value) {
      hls.value.destroy()
      hls.value = null
    }
  }

  return {
    hls,
    initHls,
    destroyHls
  }
}
