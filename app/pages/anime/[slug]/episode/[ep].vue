<script setup lang="ts">
import { ChevronLeft, AlertCircle, Loader2 } from 'lucide-vue-next'
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
  <div class="min-h-screen bg-[#050505] text-white pb-20">
    <!-- Premium Subtle Background Glow -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full"></div>
      <div class="absolute top-[10%] -right-[5%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
    </div>

    <!-- Main Content Grid -->
    <main class="max-w-[1800px] mx-auto px-4 lg:px-8 pt-28 pb-12 lg:pb-20">


      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
        
        <!-- Left Column: Player & Info -->
        <div class="lg:col-span-8 xl:col-span-9 space-y-8">
          <!-- Player Container -->
          <div class="relative aspect-video w-full bg-zinc-950 rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] border border-white/5 group">
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
            <div v-if="loading && !error" class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
              <Loader2 class="w-12 h-12 text-primary animate-spin mb-4" />
              <p class="font-bold tracking-widest text-xs uppercase opacity-50">Syncing Stream...</p>
            </div>

            <!-- Error State -->
            <div v-if="error" class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-zinc-900 px-6 text-center">
              <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                <AlertCircle class="w-8 h-8 text-red-500" />
              </div>
              <h3 class="text-xl font-black mb-2 tracking-tighter">Stream Interrupted</h3>
              <p class="text-white/40 mb-8 max-w-md text-sm">{{ error }}</p>
              <button @click="fetchData" class="px-8 py-3 bg-white text-black font-black rounded-full hover:bg-primary hover:text-white transition-all active:scale-95 text-xs uppercase tracking-widest">
                Reconnect
              </button>
            </div>
          </div>

          <!-- Episode Info & Footer Details -->
          <EpisodeInfo v-if="anime && episode" :anime="anime" :episode="episode" />

          <!-- Discussion Section -->
          <div v-if="episode" class="pt-8 border-t border-white/5">
            <EpisodeCommentSection :episode-id="episode.id" />
          </div>
        </div>

        <!-- Right Column: Sidebar -->
        <div class="lg:col-span-4 xl:col-span-3">
          <div class="sticky top-28">
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
body {
  background-color: #050505;
  margin: 0;
  font-family: 'Inter', sans-serif;
  color: white;
}

/* Custom Scrollbar for the whole page */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #050505;
}
::-webkit-scrollbar-thumb {
  background: #1a1a1a;
  border-radius: 10px;
  border: 2px solid #050505;
}
::-webkit-scrollbar-thumb:hover {
  background: #252525;
}
</style>
