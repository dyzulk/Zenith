<script setup lang="ts">
import GoxPlayer from '~/components/player/GoxPlayer.vue'
import type { VideoSource, Subtitle } from '@goxstream/shared'

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

// Settings Logic
const { settings } = usePublicSettings()

// Subtitles State
const subtitles = ref<Subtitle[]>([])
const fetchSubtitles = async () => {
  console.log('[EpisodePlayer] Fetching subtitles for episode:', props.episodeId)
  try {
    const data: any = await $fetch(`/api/studio/episode/${props.episodeId}/subtitles`)
    subtitles.value = data.subtitles || []
    console.log('[EpisodePlayer] Subtitles fetched:', subtitles.value.length)
  } catch (e) {
    console.error('[EpisodePlayer] Failed to fetch subtitles:', e)
  }
}

// History & Analytics Logic
const { user } = useAuth()
const duration = ref(0)
const currentTime = ref(0)
const isPlaying = ref(false)
const viewLoggedTriggered = ref(false)

const saveHistory = async (progress: number, completed: boolean) => {
  if (!user.value || !props.episodeId) return
  console.log('[EpisodePlayer] Saving history:', { progress, completed })
  try {
    await $fetch('/api/user/history', {
      method: 'POST',
      body: { episode_id: props.episodeId, progress, completed }
    })
  } catch (e) {
    console.error('[EpisodePlayer] Failed to save watch history:', e)
  }
}

const logView = async () => {
  if (viewLoggedTriggered.value || !props.episodeId) return
  console.log('[EpisodePlayer] Logging view for episode:', props.episodeId)
  try {
    await $fetch(`/api/episode/${props.episodeId}/view`, { method: 'POST' })
    viewLoggedTriggered.value = true
    console.log('[EpisodePlayer] View logged successfully')
  } catch (e) {
    console.error('[EpisodePlayer] Failed to log view:', e)
  }
}

const handleProgress = (data: { currentTime: number, duration: number, percent: number }) => {
  currentTime.value = data.currentTime
  duration.value = data.duration
}

const handleViewLogged = () => {
  logView()
}

// Pulse history every 30 seconds
const historyInterval = ref<any>(null)
onMounted(() => {
  console.log('[EpisodePlayer] Mounted. Episode:', props.episodeId, 'Sources:', props.sources.length)
  fetchSubtitles()
  historyInterval.value = setInterval(() => {
    if (isPlaying.value && duration.value > 0) {
      const progress = Math.floor(currentTime.value)
      const completed = progress > (duration.value * 0.9)
      saveHistory(progress, completed)
    }
  }, 30000)
})

onUnmounted(() => {
  if (historyInterval.value) clearInterval(historyInterval.value)
})

// Sync Quality
const handleQualityChange = (q: string) => {
  emit('quality-change', q)
}

const handleThumbnail = (dataUrl: string) => {
  emit('thumbnail-generated', dataUrl)
}
</script>

<template>
  <div class="w-full h-full">
    <GoxPlayer
      :sources="sources"
      :subtitles="subtitles"
      :initial-quality="initialQuality"
      :title="title"
      :sub-title="subTitle"
      :subtitle-url-prefix="settings.video_proxy_enabled ? '/api/storage/' : (settings.r2_public_url || '/')"
      auto-play
      @progress-update="handleProgress"
      @view-logged="handleViewLogged"
      @quality-change="handleQualityChange"
      @thumbnail-generated="handleThumbnail"
      @play="isPlaying = true"
      @pause="isPlaying = false"
    />
  </div>
</template>

<style>
/* GoxPlayer uses Tailwind, ensure styles are available */
@import "~/assets/css/main.css";
</style>
