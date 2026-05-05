import { ref, watch, type Ref } from 'vue'
import type Hls from 'hls.js'
import type { VideoSource } from '~/types/player'

export function useHls(
  videoRef: Ref<HTMLVideoElement | null>,
  currentSource: Ref<VideoSource | undefined>,
  autoPlay: boolean = false
): {
  hls: Ref<Hls | null>
  initHls: () => Promise<void>
  destroyHls: () => void
} {
  const hls = ref<Hls | null>(null)
  let Hls: any = null

  const initHls = async () => {
    if (typeof window === 'undefined') return
    if (!videoRef.value || !currentSource.value?.url) {
      console.warn('[useHls] initHls called but videoRef or source is missing')
      return
    }

    const url = currentSource.value.url
    console.log('[useHls] initHls called. Source:', url, 'Format:', currentSource.value.format)
    const isHls = currentSource.value.format === 'hls' || url.includes('.m3u8')

    if (hls.value) {
      console.log('[useHls] Destroying existing HLS instance')
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
        console.log('[useHls] HLS is supported, initializing...')
        const hlsInstance = new Hls({
          capLevelToPlayerSize: true,
          autoStartLoad: true
        })
        hlsInstance.loadSource(url)
        hlsInstance.attachMedia(videoRef.value)
        hls.value = hlsInstance
        console.log('[useHls] HLS instance created and attached')
      } else {
        console.warn('[useHls] HLS not supported or Hls.js not loaded, falling back to native')
        videoRef.value.src = url
        videoRef.value.load()
      }
    } else {
      // Direct MP4 or other native format
      console.log('[useHls] Native format detected, loading directly:', url)
      videoRef.value.src = url
      videoRef.value.load()
    }

    if (autoPlay) {
      videoRef.value.play().catch(() => {})
    }
  }

  watch(() => currentSource.value?.url, (newUrl) => {
    console.log('[useHls] Watch: Source URL changed:', newUrl)
    initHls()
  }, { immediate: true })

  const destroyHls = () => {
    if (hls.value) {
      console.log('[useHls] Destroying HLS instance (manual call)')
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
