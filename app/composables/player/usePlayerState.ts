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
  const showControls = ref(true)
  const playbackRate = ref(1.0)
  const is2x = ref(false)

  const togglePlay = () => {
    if (!videoRef.value) return
    if (videoRef.value.paused) videoRef.value.play()
    else videoRef.value.pause()
  }

  const toggleMute = () => {
    if (!videoRef.value) return
    isMuted.value = !isMuted.value
    videoRef.value.muted = isMuted.value
  }

  const handleVolumeChange = (val: number) => {
    volume.value = val
    if (videoRef.value) videoRef.value.volume = val
    isMuted.value = val === 0
  }

  const toggleFullscreen = () => {
    if (!containerRef.value) return
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
    showControls,
    playbackRate,
    is2x,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    toggleFullscreen
  }
}
