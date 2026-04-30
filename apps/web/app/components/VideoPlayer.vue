<script setup lang="ts">
import { 
  Play, Pause, Volume2, VolumeX, Settings, Maximize, 
  RotateCcw, RotateCw, Loader2, Check, FastForward 
} from 'lucide-vue-next'
import type { VideoSource } from '@zenith/shared'

const props = defineProps<{
  sources: VideoSource[]
  initialQuality?: string
  title?: string
  subTitle?: string
}>()

const emit = defineEmits<{
  (e: 'quality-change', quality: string): void
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
const lastTap = ref(0)
const controlsTimeout = ref<any>(null)
const selectedQuality = ref(props.initialQuality || '1080p')

// Double Tap Animation States
const skipOverlay = ref<'forward' | 'backward' | null>(null)

// Methods
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

const onTimeUpdate = () => {
  if (!videoRef.value) return
  currentTime.value = videoRef.value.currentTime
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
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${h > 0 ? h + ':' : ''}${m < 10 && h > 0 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
}

// Gestures
const handleVideoClick = (e: MouseEvent | TouchEvent) => {
  const now = Date.now()
  const delay = 300
  const container = containerRef.value
  if (!container) return

  const rect = container.getBoundingClientRect()
  const x = ('touches' in e) ? e.touches[0].clientX : e.clientX
  const relativeX = x - rect.left
  const isLeftSide = relativeX < rect.width / 3
  const isRightSide = relativeX > (rect.width * 2) / 3

  if (now - lastTap.value < delay) {
    // Double Tap
    if (isLeftSide) skip(-10)
    else if (isRightSide) skip(10)
    else togglePlay()
  } else {
    // Single Tap
    if (controlsTimeout.value) clearTimeout(controlsTimeout.value)
    showControls.value = true
    controlsTimeout.value = setTimeout(() => {
      if (isPlaying.value) showControls.value = false
    }, 3000)
  }
  lastTap.value = now
}

const handleLongPressStart = () => {
  if (!videoRef.value) return
  is2x.value = true
  videoRef.value.playbackRate = 2.0
}

const handleLongPressEnd = () => {
  if (!videoRef.value) return
  is2x.value = false
  videoRef.value.playbackRate = 1.0
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

// Watch for source changes
watch(() => props.sources, () => {
  loading.value = true
}, { deep: true })

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.volume = volume.value
  }
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
    <!-- Video Element -->
    <video
      ref="videoRef"
      class="w-full h-full object-contain"
      playsinline
      :src="sources.find(s => s.quality === selectedQuality)?.url || sources[0]?.url"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @waiting="loading = true"
      @playing="loading = false"
      @click="handleVideoClick"
      @mousedown="handleLongPressStart"
      @mouseup="handleLongPressEnd"
      @mouseleave="handleLongPressEnd"
      @touchstart.prevent="handleVideoClick"
      @touchend="handleLongPressEnd"
    ></video>

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
            <!-- Quality Selector -->
            <div class="relative">
              <button @click="showQualityMenu = !showQualityMenu" class="flex items-center gap-2 hover:text-primary transition-colors">
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
                    v-for="source in sources" 
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
