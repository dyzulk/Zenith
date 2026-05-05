<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { 
  Play, Pause, Volume2, VolumeX, Settings, Maximize, 
  Loader2, FastForward, Languages
} from 'lucide-vue-next'

import type { VideoSource, Subtitle } from './types'
import { usePlayerState } from './composables/usePlayerState'
import { useHls } from './composables/useHls'
import { useGestures } from './composables/useGestures'

import ProgressBar from './components/ProgressBar.vue'
import MenuOverlay from './components/MenuOverlay.vue'
import SkipOverlay from './components/SkipOverlay.vue'

const props = withDefaults(defineProps<{
  sources: VideoSource[]
  subtitles?: Subtitle[]
  initialQuality?: string
  title?: string
  subTitle?: string
  subtitleUrlPrefix?: string
  autoPlay?: boolean
}>(), {
  subtitles: () => [],
  initialQuality: '360p',
  subtitleUrlPrefix: '/api/storage/',
  autoPlay: false
})

const emit = defineEmits<{
  (e: 'quality-change', quality: string): void
  (e: 'thumbnail-generated', dataUrl: string): void
  (e: 'progress-update', data: { currentTime: number, duration: number, percent: number }): void
  (e: 'view-logged'): void
  (e: 'play'): void
  (e: 'pause'): void
}>()

// 1. Core State
const {
  videoRef, containerRef, isPlaying, isMuted, volume, 
  currentTime, duration, loading, showControls, 
  playbackRate, is2x, togglePlay, toggleMute, 
  handleVolumeChange, toggleFullscreen
} = usePlayerState()

// 2. Local UI Logic (Must be defined before computed/composables that use them)
const showQualityMenu = ref(false)
const showSpeedMenu = ref(false)
const speedOptions = [0.5, 1.0, 1.5, 2.0, 3.0, 4.0]
const selectedSubtitle = ref<string | null>(null)
const showSubtitleMenu = ref(false)

// 3. Logic: HLS & Source
const sourcesLowToHigh = computed(() => {
  return [...props.sources].sort((a, b) => (parseInt(a.quality) || 0) - (parseInt(b.quality) || 0))
})

const selectedQuality = ref(props.initialQuality || (sourcesLowToHigh.value[0]?.quality || '360p'))

const currentSource = computed(() => {
  return props.sources.find(s => s.quality === selectedQuality.value) || sourcesLowToHigh.value[0] || props.sources[0]
})
const { hls, initHls, destroyHls } = useHls(videoRef, currentSource, props.autoPlay)

watch(currentSource, () => {
  loading.value = true
})

// 4. Logic: Gestures
const { 
  skipOverlay, handlePointerDown, handlePointerUp, handlePointerLeave 
} = useGestures(videoRef, containerRef, isPlaying, showControls, playbackRate, is2x, togglePlay)


const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return '0:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${h > 0 ? h + ':' : ''}${m < 10 && h > 0 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
}

const onTimeUpdate = () => {
  if (!videoRef.value) return
  currentTime.value = videoRef.value.currentTime
  emit('progress-update', {
    currentTime: currentTime.value,
    duration: duration.value,
    percent: (currentTime.value / duration.value) * 100
  })
  
  if (!viewLoggedTriggered.value && currentTime.value > 30) {
    viewLoggedTriggered.value = true
    emit('view-logged')
  }

  handleThumbnail()
}

let thumbnailGenerated = false
const viewLoggedTriggered = ref(false)
const handleThumbnail = () => {
  if (!thumbnailGenerated && currentTime.value > 5 && videoRef.value?.videoWidth) {
    thumbnailGenerated = true
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 400
      canvas.height = 225
      const ctx = canvas.getContext('2d')
      if (ctx && videoRef.value) {
        ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height)
        emit('thumbnail-generated', canvas.toDataURL('image/jpeg', 0.6))
      }
    } catch (e) {}
  }
}

const changeSubtitle = (subId: string | null) => {
  selectedSubtitle.value = subId
  showSubtitleMenu.value = false
  if (!videoRef.value) return
  const tracks = videoRef.value.textTracks
  for (let i = 0; i < tracks.length; i++) {
    if (subId === null) tracks[i].mode = 'disabled'
    else {
      const sub = props.subtitles.find(s => s.id === subId)
      tracks[i].mode = (sub && (tracks[i].label === sub.label || tracks[i].language === sub.language)) ? 'showing' : 'hidden'
    }
  }
}

const changeQuality = (q: string) => {
  selectedQuality.value = q
  showQualityMenu.value = false
  emit('quality-change', q)
}

const sourcesHighToLow = computed(() => {
  return [...props.sources].sort((a, b) => (parseInt(b.quality) || 0) - (parseInt(a.quality) || 0))
})

onMounted(() => {
  if (videoRef.value) videoRef.value.volume = volume.value
})
onUnmounted(() => {
  destroyHls()
})
</script>

<template>
  <div 
    ref="containerRef"
    class="gox-player-container relative w-full h-full bg-black group select-none overflow-hidden cursor-none"
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
      @play="isPlaying = true; emit('play')"
      @pause="isPlaying = false; emit('pause')"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="duration = $event.target.duration; loading = false"
      @canplay="loading = false"
      @canplaythrough="loading = false"
      @waiting="loading = true"
      @playing="loading = false"
      @error="loading = false"
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
        :src="sub.url || `${subtitleUrlPrefix}${sub.fileKey}`"
        :default="false"
      />
    </video>

    <!-- Overlays -->
    <div v-if="is2x" class="absolute top-10 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 z-50">
      <FastForward class="w-4 h-4 text-[#FF3D00] animate-pulse" />
      <span class="text-xs font-black uppercase tracking-tighter italic text-white">2X Speed</span>
    </div>

    <SkipOverlay :type="skipOverlay" />

    <div v-if="loading" class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl">
      <Loader2 class="w-16 h-16 text-[#FF3D00] animate-spin" />
      <p class="mt-4 font-black text-xs uppercase tracking-[0.3em] text-white opacity-50">Transmitting Data...</p>
    </div>

    <!-- Controls -->
    <div 
      class="absolute inset-0 z-30 flex flex-col justify-end bg-gradient-to-t from-black/90 via-transparent to-black/40 transition-opacity duration-500 p-6"
      :class="showControls ? 'opacity-100' : 'opacity-0'"
    >
      <div class="absolute top-8 left-8">
        <h2 class="text-2xl font-black tracking-tighter text-white">{{ title }}</h2>
        <p class="text-xs font-bold text-white/60 uppercase tracking-widest">{{ subTitle }}</p>
      </div>

      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button @click="togglePlay" class="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/5 hover:bg-[#FF3D00] transition-all active:scale-90">
          <component :is="isPlaying ? Pause : Play" class="w-10 h-10 fill-white text-white" />
        </button>
      </div>

      <div class="w-full space-y-6">
        <ProgressBar :current-time="currentTime" :duration="duration" @seek="videoRef.currentTime = $event" />

        <div class="flex items-center justify-between text-white">
          <div class="flex items-center gap-8">
            <button @click="togglePlay" class="hover:text-[#FF3D00] transition-colors">
              <component :is="isPlaying ? Pause : Play" class="w-6 h-6 fill-current" />
            </button>

            <div class="flex items-center gap-3 group/volume">
              <button @click="toggleMute" class="hover:text-[#FF3D00] transition-colors">
                <component :is="isMuted ? VolumeX : Volume2" class="w-6 h-6" />
              </button>
              <input 
                type="range" min="0" max="1" step="0.1" :value="isMuted ? 0 : volume"
                class="w-0 group-hover/volume:w-24 transition-all overflow-hidden h-1 accent-white"
                @input="handleVolumeChange($event.target.valueAsNumber)"
              />
            </div>

            <div class="text-xs font-black tracking-tighter font-mono">
              <span class="text-white">{{ formatTime(currentTime) }}</span>
              <span class="text-white/40 mx-2">/</span>
              <span class="text-white/60">{{ formatTime(duration) }}</span>
            </div>
          </div>

          <div class="flex items-center gap-6">
            <!-- Subtitles -->
            <div class="relative" v-if="subtitles.length">
              <button @click="showSubtitleMenu = !showSubtitleMenu; showQualityMenu = false; showSpeedMenu = false" class="flex items-center gap-2 hover:text-[#FF3D00] transition-colors">
                <Languages class="w-5 h-5" :class="{ 'text-[#FF3D00]': selectedSubtitle }" />
                <span class="text-[10px] font-black uppercase tracking-tighter">Sub</span>
              </button>
              <MenuOverlay 
                :show="showSubtitleMenu" 
                :options="[{label: 'Off', value: null}, ...subtitles.map(s => ({label: s.label, value: s.id}))]"
                :selected-value="selectedSubtitle"
                @select="changeSubtitle"
              />
            </div>

            <!-- Speed -->
            <div class="relative">
              <button @click="showSpeedMenu = !showSpeedMenu; showQualityMenu = false; showSubtitleMenu = false" class="flex items-center gap-2 hover:text-[#FF3D00] transition-colors">
                <span class="text-[10px] font-black uppercase tracking-tighter">{{ playbackRate }}X</span>
              </button>
              <MenuOverlay 
                :show="showSpeedMenu" 
                :options="speedOptions.map(r => ({label: `${r}x`, value: r}))"
                :selected-value="playbackRate"
                @select="playbackRate = $event; if(videoRef) videoRef.playbackRate = $event; showSpeedMenu = false"
                width="8rem"
              />
            </div>

            <!-- Quality -->
            <div class="relative">
              <button @click="showQualityMenu = !showQualityMenu; showSpeedMenu = false; showSubtitleMenu = false" class="flex items-center gap-2 hover:text-[#FF3D00] transition-colors">
                <Settings class="w-5 h-5" :class="{ 'rotate-90': showQualityMenu }" />
                <span class="text-[10px] font-black uppercase tracking-tighter">{{ selectedQuality }}</span>
              </button>
              <MenuOverlay 
                :show="showQualityMenu" 
                :options="sourcesHighToLow.map(s => ({label: s.quality, value: s.quality}))"
                :selected-value="selectedQuality"
                @select="changeQuality"
              />
            </div>

            <button @click="toggleFullscreen" class="hover:text-[#FF3D00] transition-colors">
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
input[type="range"] { appearance: none; background: transparent; }
input[type="range"]::-webkit-slider-thumb { appearance: none; }

.gox-player-container {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}
</style>
