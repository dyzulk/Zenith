<script setup lang="ts">
import { 
  Play, Pause, Volume2, VolumeX, Settings, Maximize, 
  RotateCcw, RotateCw, Loader2, Check, FastForward,
  Languages
} from 'lucide-vue-next'
import type HlsType from 'hls.js'
declare const Hls: any // Reference global Hls from CDN
import type { VideoSource, Subtitle } from '@zenith/shared'

const props = defineProps<{
  episodeId: string
  sources: VideoSource[]
  initialQuality?: string
  title?: string
  subTitle?: string
}>()

const emit = defineEmits<{
  (e: 'quality-change', quality: string): void
  (e: 'thumbnail-generated', dataUrl: string): void
}>()

// Refs
const videoRef = ref<HTMLVideoElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const volume = ref(1)
const currentTime = ref(0)
const duration = ref(0)
const loading = ref(true)
const showControls = ref(true)
const showQualityMenu = ref(false)
const is2x = ref(false)
const controlsTimeout = ref<any>(null)
const selectedQuality = ref(props.initialQuality || '360p')
const playbackRate = ref(1.0)
const showSpeedMenu = ref(false)
const speedOptions = [0.5, 1.0, 1.5, 2.0, 3.0, 4.0]
const hls = ref<HlsType | null>(null)
const subtitles = ref<Subtitle[]>([])
const selectedSubtitle = ref<string | null>(null) // null = Off
const showSubtitleMenu = ref(false)

// Double Tap Animation States
const skipOverlay = ref<'forward' | 'backward' | null>(null)

// Methods
const changePlaybackRate = (rate: number) => {
  if (!videoRef.value) return
  playbackRate.value = rate
  videoRef.value.playbackRate = rate
  showSpeedMenu.value = false
}

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

const handleVolumeChange = (e: Event) => {
  const val = (e.target as HTMLInputElement).valueAsNumber
  volume.value = val
  if (videoRef.value) videoRef.value.volume = val
  isMuted.value = val === 0
}

const skip = (seconds: number) => {
  if (!videoRef.value) return
  videoRef.value.currentTime += seconds
  skipOverlay.value = seconds > 0 ? 'forward' : 'backward'
  setTimeout(() => skipOverlay.value = null, 500)
}

let thumbnailGenerated = false

const onTimeUpdate = () => {
  if (!videoRef.value) return
  currentTime.value = videoRef.value.currentTime
  
  if (!thumbnailGenerated && currentTime.value > 5 && videoRef.value.videoWidth > 0) {
    thumbnailGenerated = true
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 400
      canvas.height = 225
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height)
        emit('thumbnail-generated', canvas.toDataURL('image/jpeg', 0.6))
      }
    } catch (e) {
      console.warn('Cannot extract thumbnail due to CORS', e)
    }
  }
}

const onLoadedMetadata = () => {
  if (!videoRef.value) return
  duration.value = videoRef.value.duration
  loading.value = false
}

const handleSeek = (e: Event) => {
  const val = (e.target as HTMLInputElement).valueAsNumber
  if (videoRef.value) videoRef.value.currentTime = val
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return '0:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${h > 0 ? h + ':' : ''}${m < 10 && h > 0 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
}

const currentSource = computed(() => {
  return props.sources.find(s => s.quality === selectedQuality.value) || props.sources[0]
})

const initPlayer = () => {
  if (!videoRef.value || !currentSource.value?.url) return

  const url = currentSource.value.url
  const isHls = currentSource.value.format === 'hls' || url.includes('.m3u8')

  // Cleanup existing HLS
  if (hls.value) {
    hls.value.destroy()
    hls.value = null
  }

  if (isHls && Hls.isSupported()) {
    hls.value = new Hls({
      capLevelToPlayerSize: true,
      autoStartLoad: true
    })
    hls.value.loadSource(url)
    hls.value.attachMedia(videoRef.value)
  } else {
    // Native support (MP4 or HLS in Safari)
    videoRef.value.src = url
  }
}

const fetchSubtitles = async () => {
  try {
    const data: any = await $fetch(`/api/studio/episode/${props.episodeId}/subtitles`)
    subtitles.value = data.subtitles || []
  } catch (e) {
    console.error('Failed to fetch subtitles')
  }
}

const changeSubtitle = (subId: string | null) => {
  selectedSubtitle.value = subId
  showSubtitleMenu.value = false
  
  if (!videoRef.value) return
  
  // Toggle track visibility
  const tracks = videoRef.value.textTracks
  for (let i = 0; i < tracks.length; i++) {
    if (subId === null) {
      tracks[i].mode = 'disabled'
    } else {
      // Find the track by language or ID (vtt track has language/label)
      const sub = subtitles.value.find(s => s.id === subId)
      if (sub && (tracks[i].label === sub.label || tracks[i].language === sub.language)) {
        tracks[i].mode = 'showing'
      } else {
        tracks[i].mode = 'hidden'
      }
    }
  }
}

// Watch history tracking
const { user } = useAuth()
const lastSaveTime = ref(0)
const saveHistory = async () => {
  if (!user.value || !props.episodeId || !videoRef.value) return
  
  const progress = Math.floor(videoRef.value.currentTime)
  const completed = progress > (duration.value * 0.9) // 90% watched = completed

  try {
    await $fetch('/api/user/history', {
      method: 'POST',
      body: {
        episode_id: props.episodeId,
        progress,
        completed
      }
    })
  } catch (e) {
    console.error('Failed to save watch history')
  }
}

// Analytics view tracking
const viewLogged = ref(false)
const logView = async () => {
  if (viewLogged.value || !props.episodeId) return
  
  try {
    await $fetch(`/api/episode/${props.episodeId}/view`, {
      method: 'POST'
    })
    viewLogged.value = true
  } catch (e) {
    console.error('Failed to log view to analytics engine')
  }
}

const sortedSources = computed(() => {
  return [...props.sources].sort((a, b) => {
    const qA = parseInt(a.quality) || 0
    const qB = parseInt(b.quality) || 0
    return qB - qA
  })
})

// Gestures
let longPressTimer: any = null
let clickTimer: any = null
let tapCount = 0

const handlePointerDown = (e: PointerEvent) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return // Only left click

  longPressTimer = setTimeout(() => {
    if (isPlaying.value) {
      is2x.value = true
      if (videoRef.value) videoRef.value.playbackRate = 2.0
    }
  }, 500) // 500ms hold for 2x
}

const handlePointerUp = (e: PointerEvent) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return

  // Clear long press timer
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }

  // If we were in 2x speed, restore normal speed and DON'T count as tap
  if (is2x.value) {
    is2x.value = false
    if (videoRef.value) videoRef.value.playbackRate = playbackRate.value
    return
  }

  // Handle taps
  tapCount++
  if (tapCount === 1) {
    clickTimer = setTimeout(() => {
      // Single Tap
      if (controlsTimeout.value) clearTimeout(controlsTimeout.value)
      showControls.value = !showControls.value
      if (showControls.value && isPlaying.value) {
        controlsTimeout.value = setTimeout(() => {
          showControls.value = false
        }, 3000)
      }
      tapCount = 0
    }, 250) // Wait 250ms to see if second tap happens
  } else if (tapCount === 2) {
    // Double Tap
    clearTimeout(clickTimer)
    tapCount = 0
    
    const container = containerRef.value
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = e.clientX
    const relativeX = x - rect.left
    
    if (relativeX < rect.width / 3) skip(-10)
    else if (relativeX > (rect.width * 2) / 3) skip(10)
    else togglePlay()
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

const toggleFullscreen = () => {
  if (!containerRef.value) return
  if (!document.fullscreenElement) {
    containerRef.value.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const changeQuality = (q: string) => {
  selectedQuality.value = q
  showQualityMenu.value = false
  emit('quality-change', q)
}

const toggleQualityMenu = () => {
  showQualityMenu.value = !showQualityMenu.value
  if (showQualityMenu.value) showSpeedMenu.value = false
}

const toggleSpeedMenu = () => {
  showSpeedMenu.value = !showSpeedMenu.value
  if (showSpeedMenu.value) {
    showQualityMenu.value = false
    showSubtitleMenu.value = false
  }
}

const toggleSubtitleMenu = () => {
  showSubtitleMenu.value = !showSubtitleMenu.value
  if (showSubtitleMenu.value) {
    showQualityMenu.value = false
    showSpeedMenu.value = false
  }
}

// Sync with parent
watch(() => props.initialQuality, (newVal) => {
  if (newVal) selectedQuality.value = newVal
})

// Watch for source changes
watch(() => currentSource.value?.url, () => {
  loading.value = true
  thumbnailGenerated = false
  initPlayer()
  fetchSubtitles()
}, { immediate: true })

// Pulse history every 30 seconds
const historyInterval = ref<any>(null)
onMounted(() => {
  if (videoRef.value) {
    videoRef.value.volume = volume.value
    initPlayer()
  }
  
  historyInterval.value = setInterval(() => {
    if (isPlaying.value) {
      saveHistory()
      
      // Log view after 30 seconds of active playback
      if (!viewLogged.value && videoRef.value && videoRef.value.currentTime > 30) {
        logView()
      }
    }
  }, 30000)
})

onUnmounted(() => {
  if (hls.value) hls.value.destroy()
  if (historyInterval.value) clearInterval(historyInterval.value)
})
</script>

<template>
  <div 
    ref="containerRef"
    class="relative w-full h-full bg-black group select-none overflow-hidden cursor-none"
    :class="{ 'cursor-default': showControls }"
    @mousemove="showControls = true"
    @mouseleave="showControls = false"
    @touchstart="showControls = true"
  >
    <video
      ref="videoRef"
      class="w-full h-full object-contain touch-none"
      playsinline
      crossorigin="anonymous"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @waiting="loading = true"
      @playing="loading = false"
      @pointerdown="handlePointerDown"
      @pointerup="handlePointerUp"
      @pointerleave="handlePointerLeave"
    >
      <track 
        v-for="sub in subtitles" 
        :key="sub.id"
        kind="subtitles"
        :label="sub.label"
        :srclang="sub.language"
        :src="`/api/r2/${sub.r2_key}`"
        :default="false"
      />
    </video>

    <!-- 2x Speed Overlay -->
    <div v-if="is2x" class="absolute top-10 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 z-50">
      <FastForward class="w-4 h-4 text-primary animate-pulse" />
      <span class="text-xs font-black uppercase tracking-tighter italic">2X Speed</span>
    </div>

    <!-- Double Tap Skip Overlays -->
    <div v-if="skipOverlay" class="absolute inset-0 z-40 flex pointer-events-none">
      <div class="flex-1 flex items-center justify-center bg-white/5 transition-opacity duration-300" :class="skipOverlay === 'backward' ? 'opacity-100' : 'opacity-0'">
        <div class="flex flex-col items-center gap-2">
          <RotateCcw class="w-12 h-12 text-white animate-bounce" />
          <span class="font-black text-xl">-10s</span>
        </div>
      </div>
      <div class="flex-1 flex items-center justify-center bg-white/5 transition-opacity duration-300" :class="skipOverlay === 'forward' ? 'opacity-100' : 'opacity-0'">
        <div class="flex flex-col items-center gap-2">
          <RotateCw class="w-12 h-12 text-white animate-bounce" />
          <span class="font-black text-xl">+10s</span>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl">
      <Loader2 class="w-16 h-16 text-primary animate-spin" />
      <p class="mt-4 font-black text-xs uppercase tracking-[0.3em] opacity-50">Transmitting Data...</p>
    </div>

    <!-- Custom Controls UI -->
    <div 
      class="absolute inset-0 z-30 flex flex-col justify-end bg-gradient-to-t from-black/90 via-transparent to-black/40 transition-opacity duration-500 p-6"
      :class="showControls ? 'opacity-100' : 'opacity-0'"
    >
      <!-- Top Title -->
      <div class="absolute top-8 left-8">
        <h2 class="text-2xl font-black tracking-tighter">{{ title }}</h2>
        <p class="text-xs font-bold text-white/40 uppercase tracking-widest">{{ subTitle }}</p>
      </div>

      <!-- Center Play/Pause Large -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button @click="togglePlay" class="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/5 hover:bg-primary transition-all active:scale-90">
          <component :is="isPlaying ? Pause : Play" class="w-10 h-10 fill-white text-white" />
        </button>
      </div>

      <!-- Bottom Controls Area -->
      <div class="w-full space-y-6">
        
        <!-- Progress Bar -->
        <div class="relative group/progress cursor-pointer">
          <input 
            type="range"
            :min="0"
            :max="duration"
            :value="currentTime"
            class="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer z-10"
            @input="handleSeek"
          />
          <div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              class="h-full bg-primary relative transition-[width] duration-150"
              :style="{ width: `${(currentTime / duration) * 100}%` }"
            >
              <div class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xl opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-8">
            <!-- Play/Pause Mini -->
            <button @click="togglePlay" class="hover:text-primary transition-colors">
              <component :is="isPlaying ? Pause : Play" class="w-6 h-6 fill-current" />
            </button>

            <!-- Volume -->
            <div class="flex items-center gap-3 group/volume">
              <button @click="toggleMute" class="hover:text-primary transition-colors">
                <component :is="isMuted ? VolumeX : Volume2" class="w-6 h-6" />
              </button>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.1"
                :value="isMuted ? 0 : volume"
                class="w-0 group-hover/volume:w-24 transition-all overflow-hidden h-1 accent-white"
                @input="handleVolumeChange"
              />
            </div>

            <!-- Time Display -->
            <div class="text-xs font-black tracking-tighter font-mono">
              <span class="text-white">{{ formatTime(currentTime) }}</span>
              <span class="text-white/20 mx-2">/</span>
              <span class="text-white/40">{{ formatTime(duration) }}</span>
            </div>
          </div>

          <div class="flex items-center gap-6">
            <!-- Subtitle Selector -->
            <div class="relative" v-if="subtitles.length">
              <button @click="toggleSubtitleMenu" class="flex items-center gap-2 hover:text-primary transition-colors">
                <Languages class="w-5 h-5" :class="{ 'text-primary': selectedSubtitle }" />
                <span class="text-[10px] font-black uppercase tracking-tighter">Sub</span>
              </button>

              <transition 
                enter-active-class="transition duration-200"
                enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
              >
                <div v-if="showSubtitleMenu" class="absolute bottom-full right-0 mb-4 w-40 bg-zinc-900/90 backdrop-blur-2xl border border-white/5 rounded-2xl p-1 shadow-2xl">
                  <button 
                    @click="changeSubtitle(null)"
                    class="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                    :class="selectedSubtitle === null ? 'bg-primary text-white' : 'hover:bg-white/5 text-white/50 hover:text-white'"
                  >
                    <span class="text-xs font-black uppercase">Off</span>
                    <Check v-if="selectedSubtitle === null" class="w-3 h-3" />
                  </button>
                  <button 
                    v-for="sub in subtitles" 
                    :key="sub.id"
                    @click="changeSubtitle(sub.id)"
                    class="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                    :class="selectedSubtitle === sub.id ? 'bg-primary text-white' : 'hover:bg-white/5 text-white/50 hover:text-white'"
                  >
                    <span class="text-xs font-black uppercase">{{ sub.label }}</span>
                    <Check v-if="selectedSubtitle === sub.id" class="w-3 h-3" />
                  </button>
                </div>
              </transition>
            </div>
            <!-- Speed Selector -->
            <div class="relative">
              <button @click="toggleSpeedMenu" class="flex items-center gap-2 hover:text-primary transition-colors">
                <span class="text-[10px] font-black uppercase tracking-tighter">{{ playbackRate }}X</span>
              </button>

              <transition 
                enter-active-class="transition duration-200"
                enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
              >
                <div v-if="showSpeedMenu" class="absolute bottom-full right-0 mb-4 w-32 bg-zinc-900/90 backdrop-blur-2xl border border-white/5 rounded-2xl p-1 shadow-2xl">
                  <button 
                    v-for="rate in speedOptions" 
                    :key="rate"
                    @click="changePlaybackRate(rate)"
                    class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all"
                    :class="playbackRate === rate ? 'bg-primary text-white' : 'hover:bg-white/5 text-white/50 hover:text-white'"
                  >
                    <span class="text-xs font-black">{{ rate }}x</span>
                    <Check v-if="playbackRate === rate" class="w-3 h-3" />
                  </button>
                </div>
              </transition>
            </div>

            <!-- Quality Selector -->
            <div class="relative">
              <button @click="toggleQualityMenu" class="flex items-center gap-2 hover:text-primary transition-colors">
                <Settings class="w-5 h-5" :class="{ 'rotate-90': showQualityMenu }" />
                <span class="text-[10px] font-black uppercase tracking-tighter">{{ selectedQuality }}</span>
              </button>

              <transition 
                enter-active-class="transition duration-200"
                enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
              >
                <div v-if="showQualityMenu" class="absolute bottom-full right-0 mb-4 w-40 bg-zinc-900/90 backdrop-blur-2xl border border-white/5 rounded-2xl p-1 shadow-2xl">
                  <button 
                    v-for="source in sortedSources" 
                    :key="source.quality"
                    @click="changeQuality(source.quality)"
                    class="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                    :class="selectedQuality === source.quality ? 'bg-primary text-white' : 'hover:bg-white/5 text-white/50 hover:text-white'"
                  >
                    <span class="text-xs font-black uppercase">{{ source.quality }}</span>
                    <Check v-if="selectedQuality === source.quality" class="w-3 h-3" />
                  </button>
                </div>
              </transition>
            </div>

            <!-- Fullscreen -->
            <button @click="toggleFullscreen" class="hover:text-primary transition-colors">
              <Maximize class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor-none { cursor: none; }

input[type="range"] {
  appearance: none;
  background: transparent;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 4s linear infinite;
}
</style>
