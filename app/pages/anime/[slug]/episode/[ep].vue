<script setup lang="ts">
import { ChevronLeft, AlertCircle, Loader2, ArrowLeft, Maximize2, Monitor } from 'lucide-vue-next'
import type { Anime, Episode, VideoSource } from '@zenith/shared'

const route = useRoute()
const config = useRuntimeConfig()
const { slug, ep } = route.params
const goBack = () => navigateTo(`/anime/${slug}`)

const loading = ref(true)
const error = ref<string | null>(null)
const anime = ref<Anime | null>(null)
const episode = ref<Episode | null>(null)
const episodes = ref<Episode[]>([])
const selectedQuality = ref('360p')
const sources = ref<VideoSource[]>([])

const handleQualityChange = async (quality: string) => {
  const source = sources.value.find(s => s.quality === quality)
  if (!source) return
  
  selectedQuality.value = quality
  
  // If already has a signed URL, no need to fetch again (unless expired)
  if (source.url) return

  try {
    // Force use of internal API route to prevent localhost:8787 connection refused errors
    const workerUrl = `/api/stream/sign?path=${source.r2_key}`
    const response = await fetch(workerUrl)

    if (!response.ok) throw new Error('Failed to get streaming access')
    const { url } = await response.json()
    
    // Update the specific source with the signed URL
    source.url = url
  } catch (err: any) {
    console.error('Quality Switch Error:', err)
  }
}

const handleThumbnailGenerated = async (dataUrl: string) => {
  const currentEp = episodes.value.find(e => e.episode_number === Number(ep))
  if (currentEp && !currentEp.thumbnail_url) {
    try {
      // Optimitically update UI
      currentEp.thumbnail_url = dataUrl

      // Save to backend & R2
      await $fetch('/api/thumbnail/save', {
        method: 'POST',
        body: {
          episode_id: currentEp.id,
          anime_slug: slug,
          episode_number: currentEp.episode_number,
          dataUrl
        }
      })
    } catch (err) {
      console.error('Failed to save generated thumbnail:', err)
    }
  }
}

const fetchData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const data = await $fetch(`/api/anime/${slug}/episode/${ep}`)
    
    anime.value = data.anime
    episode.value = data.episode
    episodes.value = data.episodes
    sources.value = data.sources

    // 4. Initial Signing for 360p (Preferred Default)
    const defaultQuality = '360p'
    const has360 = sources.value.some(s => s.quality === defaultQuality)
    selectedQuality.value = has360 ? defaultQuality : (sources.value.find(s => s.is_primary)?.quality || sources.value[0].quality)
    
    await handleQualityChange(selectedQuality.value)

    if (anime.value && episode.value) {
      const seoTitle = `Watch ${anime.value.title} - Episode ${episode.value.episode_number}`
      const seoDesc = episode.value.synopsis || `Watch Episode ${episode.value.episode_number} of ${anime.value.title} on Zenith. High quality streaming.`
      const seoImage = episode.value.thumbnail_url || (episode.value.thumbnail_key ? `/api/r2/${episode.value.thumbnail_key}` : '')

      useSeoMeta({
        title: seoTitle,
        ogTitle: seoTitle,
        description: seoDesc,
        ogDescription: seoDesc,
        ogImage: seoImage,
        twitterCard: 'summary_large_image',
        twitterTitle: seoTitle,
        twitterDescription: seoDesc,
        twitterImage: seoImage
      })
    }

  } catch (err: any) {
    console.error(err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

// Watch for route changes to re-fetch data
watch(() => route.params.ep, () => {
  fetchData()
})
</script>

<template>
  <div class="is-zenith min-h-screen bg-[#050505] text-white pb-32">
    <!-- Premium Subtle Background Glow -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full animate-float"></div>
      <div class="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-500/5 blur-[150px] rounded-full animate-float" style="animation-delay: -3s"></div>
    </div>

    <!-- Navigation Header -->
    <header class="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 py-4 lg:py-6 px-6 lg:px-12">
      <div class="max-w-[1800px] mx-auto flex items-center justify-between">
        <button @click="goBack" class="group flex items-center gap-3 text-foreground/40 hover:text-white transition-colors">
          <div class="w-10 h-10 rounded-xl glass-card flex items-center justify-center group-hover:border-primary/50">
            <ArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          <div class="hidden sm:block">
            <p class="text-[9px] font-black uppercase tracking-[0.2em] leading-none mb-1">Return to</p>
            <p class="text-sm font-black uppercase tracking-tight line-clamp-1 max-w-[200px]">{{ anime?.title || 'Series' }}</p>
          </div>
        </button>

        <div class="flex items-center gap-6">
          <div class="hidden md:flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
            <Monitor class="w-4 h-4 text-primary" />
            <span class="text-[10px] font-black uppercase tracking-widest text-primary">Cinema Mode</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Grid -->
    <main class="max-w-[1800px] mx-auto px-4 lg:px-12 pt-32 pb-12 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
        
        <!-- Left Column: Player & Info -->
        <div class="lg:col-span-8 xl:col-span-9 space-y-12">
          <!-- Player Container with Ambient Glow -->
          <div class="relative">
            <!-- Dynamic Ambient Glow -->
            <div class="absolute -inset-10 bg-primary/20 blur-[80px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"></div>
            
            <div class="relative aspect-video w-full bg-zinc-950 rounded-[2rem] overflow-hidden shadow-[0_48px_96px_-24px_rgba(0,0,0,0.9)] border border-white/5 group animate-reveal-up">
              <EpisodePlayer 
                v-if="!loading && !error && episode"
                :episode-id="episode.id"
                :sources="sources"
                :initial-quality="selectedQuality"
                :title="episode?.title || 'Untitled'"
                :sub-title="`${anime?.title} • Episode ${episode?.episode_number}`"
                @quality-change="handleQualityChange"
                @thumbnail-generated="handleThumbnailGenerated"
              />
              
              <!-- Loading State -->
              <div v-if="loading && !error" class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl">
                <div class="relative">
                  <Loader2 class="w-16 h-16 text-primary animate-spin" />
                  <div class="absolute inset-0 blur-xl bg-primary/20 animate-pulse"></div>
                </div>
                <p class="font-black tracking-[0.4em] text-[10px] uppercase text-primary mt-8 animate-pulse">Establishing Link...</p>
              </div>

              <!-- Error State -->
              <div v-if="error" class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0a0a0a] px-8 text-center">
                <div class="w-20 h-20 bg-red-500/10 rounded-[2rem] flex items-center justify-center mb-8 border border-red-500/20 shadow-2xl shadow-red-500/10">
                  <AlertCircle class="w-10 h-10 text-red-500" />
                </div>
                <h3 class="text-3xl font-black mb-3 tracking-tighter uppercase">Transmission Interrupted</h3>
                <p class="text-white/30 mb-10 max-w-md text-sm font-medium leading-relaxed">{{ error }}</p>
                <button @click="fetchData" class="btn-premium px-12 py-4">
                  Reconnect
                </button>
              </div>
            </div>
          </div>

          <!-- Episode Info & Footer Details -->
          <div class="animate-reveal-up" style="animation-delay: 0.2s">
            <EpisodeInfo v-if="anime && episode" :anime="anime" :episode="episode" />
          </div>

          <!-- Discussion Section -->
          <div v-if="episode" class="pt-12 border-t border-white/5 animate-reveal-up" style="animation-delay: 0.3s">
            <EpisodeCommentSection :episode-id="episode.id" />
          </div>
        </div>

        <!-- Right Column: Sidebar -->
        <div class="lg:col-span-4 xl:col-span-3">
          <div class="sticky top-32 animate-reveal-up" style="animation-delay: 0.4s">
            <EpisodeSidebar 
              v-if="anime && episodes.length" 
              :episodes="episodes" 
              :current-episode="Number(ep)" 
              :anime-slug="slug as string"
              :anime-title="anime.title"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
/* Custom Scrollbar for the whole page */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--ui-primary);
}
</style>

