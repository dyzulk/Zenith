import { ref } from 'vue'

export function usePlayerState() {
  const videoRef = ref<HTMLVideoElement | null>(null)
  const containerRef = ref<HTMLDivElement | null>(null)
  const isPlaying = ref(false)
  const isMuted = ref(false)
  const volume = ref(1)
  const currentTime = ref(0)
  const duration = ref(0)
  const loading = ref(true)
  const isEnded = ref(false)
  const bufferedPercent = ref(0)
  const showControls = ref(true)
  const playbackRate = ref(1.0)
  const is2x = ref(false)
  const isTheaterMode = ref(false)

  const togglePlay = () => {
    if (!videoRef.value) return
    console.log('[usePlayerState] togglePlay. Current paused state:', videoRef.value.paused)
    if (videoRef.value.paused) {
      if (isEnded.value) {
        videoRef.value.currentTime = 0
        isEnded.value = false
      }
      videoRef.value.play()
    }
    else videoRef.value.pause()
  }

  const skip = (seconds: number) => {
    if (!videoRef.value) return
    videoRef.value.currentTime += seconds
  }

  const toggleMute = () => {
    if (!videoRef.value) return
    isMuted.value = !isMuted.value
    videoRef.value.muted = isMuted.value
    console.log('[usePlayerState] toggleMute. Muted:', isMuted.value)
  }

  const handleVolumeChange = (val: number) => {
    console.log('[usePlayerState] handleVolumeChange:', val)
    volume.value = val
    if (videoRef.value) videoRef.value.volume = val
    isMuted.value = val === 0
  }

  const toggleFullscreen = () => {
    if (!containerRef.value) return
    console.log('[usePlayerState] toggleFullscreen. Current element:', document.fullscreenElement)
    if (!document.fullscreenElement) {
      containerRef.value.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return {
    videoRef,
    containerRef,
    isPlaying,
    isMuted,
    volume,
    currentTime,
    duration,
    loading,
    isEnded,
    bufferedPercent,
    showControls,
    playbackRate,
    is2x,
    isTheaterMode,
    togglePlay,
    skip,
    toggleMute,
    handleVolumeChange,
    toggleFullscreen
  }
}
