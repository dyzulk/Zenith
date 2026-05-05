import { ref, type Ref } from 'vue'

export function useGestures(
  videoRef: Ref<HTMLVideoElement | null>,
  containerRef: Ref<HTMLDivElement | null>,
  isPlaying: Ref<boolean>,
  showControls: Ref<boolean>,
  playbackRate: Ref<number>,
  is2x: Ref<boolean>,
  togglePlay: () => void
) {
  const skipOverlay = ref<'forward' | 'backward' | null>(null)
  const controlsTimeout = ref<any>(null)
  let longPressTimer: any = null
  let clickTimer: any = null
  let tapCount = 0

  const skip = (seconds: number) => {
    if (!videoRef.value) return
    console.log('[useGestures] skipping:', seconds)
    videoRef.value.currentTime += seconds
    skipOverlay.value = seconds > 0 ? 'forward' : 'backward'
    setTimeout(() => skipOverlay.value = null, 500)
  }

  const handlePointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return 

    longPressTimer = setTimeout(() => {
      if (isPlaying.value) {
        console.log('[useGestures] Long press detected, starting 2x speed')
        is2x.value = true
        if (videoRef.value) videoRef.value.playbackRate = 2.0
      }
    }, 500) 
  }

  const handlePointerUp = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return

    if (longPressTimer) {
      clearTimeout(longPressTimer)
      longPressTimer = null
    }

    if (is2x.value) {
      is2x.value = false
      if (videoRef.value) videoRef.value.playbackRate = playbackRate.value
      return
    }

    tapCount++
    if (tapCount === 1) {
      clickTimer = setTimeout(() => {
        console.log('[useGestures] Single tap detected, toggling controls')
        if (controlsTimeout.value) clearTimeout(controlsTimeout.value)
        showControls.value = !showControls.value
        if (showControls.value && isPlaying.value) {
          controlsTimeout.value = setTimeout(() => {
            showControls.value = false
          }, 3000)
        }
        tapCount = 0
      }, 250)
    } else if (tapCount === 2) {
      clearTimeout(clickTimer)
      tapCount = 0
      console.log('[useGestures] Double tap detected')
      
      const container = containerRef.value
      if (!container) return
      const rect = container.getBoundingClientRect()
      const x = e.clientX
      const relativeX = x - rect.left
      
      if (relativeX < rect.width / 3) {
        console.log('[useGestures] Double tap on left (Rewind)')
        skip(-10)
      } else if (relativeX > (rect.width * 2) / 3) {
        console.log('[useGestures] Double tap on right (Forward)')
        skip(10)
      } else {
        console.log('[useGestures] Double tap in middle (Toggle Play)')
        togglePlay()
      }
    }
  }

  const handlePointerLeave = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      longPressTimer = null
    }
    if (is2x.value) {
      is2x.value = false
      if (videoRef.value) videoRef.value.playbackRate = playbackRate.value
    }
  }

  return {
    skipOverlay,
    handlePointerDown,
    handlePointerUp,
    handlePointerLeave
  }
}
