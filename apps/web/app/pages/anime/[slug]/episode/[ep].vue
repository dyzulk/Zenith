<script setup lang="ts">
import { ChevronLeft, Maximize, Settings, Volume2, Play, AlertCircle, Loader2 } from 'lucide-vue-next'
import Hls from 'hls.js'
import type { Anime, Episode, VideoSource } from '@zenith/shared'

const route = useRoute()
const config = useRuntimeConfig()
const supabase = useSupabaseClient()
const { slug, ep } = route.params

const videoRef = ref<HTMLVideoElement | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const anime = ref<Anime | null>(null)
const episode = ref<Episode | null>(null)
const hlsInstance = ref<Hls | null>(null)

const goBack = () => navigateTo(`/anime/${slug}`)

const initPlayer = async (url: string) => {
  if (!videoRef.value) return

  if (Hls.isSupported()) {
    if (hlsInstance.value) hlsInstance.value.destroy()
    const hls = new Hls({
      capLevelToPlayerSize: true,
      autoStartLoad: true
    })
    hlsInstance.value = hls
    hls.loadSource(url)
    hls.attachMedia(videoRef.value)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      loading.value = false
      // videoRef.value?.play() // Optional auto-play
    })
    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        error.value = "Fatal streaming error. Please refresh."
      }
    })
  } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
    videoRef.value.src = url
    videoRef.value.addEventListener('loadedmetadata', () => {
      loading.value = false
    })
  }
}

const fetchData = async () => {
  try {
    loading.value = true
    
    // 1. Fetch Anime
    const { data: animeData, error: animeError } = await supabase
      .from('anime')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (animeError || !animeData) throw new Error('Anime not found')
    anime.value = animeData as Anime

    // 2. Fetch Episode
    const { data: epData, error: epError } = await supabase
      .from('episodes')
      .select('*')
      .eq('anime_id', animeData.id)
      .eq('episode_number', ep)
      .single()
    
    if (epError || !epData) throw new Error('Episode not found')
    episode.value = epData as Episode

    // 3. Fetch Video Sources
    const { data: sources, error: sourceError } = await supabase
      .from('video_sources')
      .select('*')
      .eq('episode_id', epData.id)
    
    if (sourceError || !sources || sources.length === 0) {
      // For demo purposes, if no source in DB, we use a fallback or show error
      // throw new Error('No video sources found')
      console.warn('No sources in DB, using fallback for demo')
      await initPlayer('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')
      return
    }

    const primarySource = (sources.find(s => s.is_primary) || sources[0]) as VideoSource

    // 4. Get Signed URL from Worker
    const { data: session } = await supabase.auth.getSession()
    const token = session?.session?.access_token

    if (!token) {
       // In a real app, redirect to login or handle public access
       console.warn('No auth token, worker might reject request')
    }

    const workerUrl = `${config.public.streamWorkerUrl}/${primarySource.r2_key}`
    const response = await fetch(workerUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) throw new Error('Failed to get streaming access')
    
    const { url } = await response.json()
    await initPlayer(url)

  } catch (err: any) {
    console.error(err)
    error.value = err.message
  } finally {
    // loading.value = false // Handled in initPlayer for better UX
  }
}

onMounted(() => {
  fetchData()
})

onUnmounted(() => {
  if (hlsInstance.value) hlsInstance.value.destroy()
})
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 p-6 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
      <button @click="goBack" class="flex items-center gap-2 hover:text-primary transition-colors group">
        <ChevronLeft class="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        <span class="font-bold tracking-tight">Back to Series</span>
      </button>
      <div class="text-center" v-if="anime && episode">
        <h1 class="text-[10px] font-black opacity-40 uppercase tracking-[0.2em]">Now Watching</h1>
        <p class="font-black text-lg">{{ anime.title }} — Episode {{ episode.episode_number }}</p>
      </div>
      <div class="w-20"></div>
    </header>

    <!-- Player Area -->
    <div class="h-screen w-full flex items-center justify-center relative group bg-zinc-950">
      
      <!-- Loading State -->
      <div v-if="loading && !error" class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
        <Loader2 class="w-12 h-12 text-primary animate-spin mb-4" />
        <p class="font-bold tracking-widest text-xs uppercase opacity-50">Buffering Dreams...</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-zinc-900 px-6 text-center">
        <div class="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
          <AlertCircle class="w-10 h-10 text-red-500" />
        </div>
        <h3 class="text-2xl font-black mb-2">Streaming Interrupted</h3>
        <p class="text-white/50 mb-8 max-w-md">{{ error }}</p>
        <button @click="fetchData" class="px-8 py-3 bg-white text-black font-black rounded-full hover:bg-primary hover:text-white transition-all active:scale-95">
          Try Again
        </button>
      </div>

      <video 
        ref="videoRef"
        controls 
        class="w-full h-full max-h-[85vh] aspect-video object-contain shadow-[0_0_100px_rgba(0,0,0,0.5)] z-10"
      ></video>

      <!-- Custom Overlay (Visual Only) -->
      <div v-if="!loading && !error" class="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <div class="w-20 h-20 bg-primary/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10">
          <Play class="w-8 h-8 fill-white text-white" />
        </div>
      </div>
    </div>

    <!-- Episode Navigation / Info -->
    <div class="container mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-white/5">
      <div class="lg:col-span-2 space-y-8">
        <div v-if="episode" class="space-y-4">
          <h2 class="text-4xl font-black tracking-tighter">Episode {{ episode.episode_number }}: {{ episode.title || 'Untitled' }}</h2>
          <div class="flex gap-4 text-xs font-bold uppercase tracking-widest text-white/40">
            <span>{{ anime?.type }}</span>
            <span>•</span>
            <span>{{ anime?.status }}</span>
            <span>•</span>
            <span>{{ anime?.year }}</span>
          </div>
        </div>
        <p class="text-lg text-white/60 leading-relaxed max-w-3xl">
          {{ episode?.synopsis || anime?.synopsis }}
        </p>
      </div>

      <!-- Up Next / Side List -->
      <div class="space-y-8">
        <div class="flex items-center justify-between">
          <h3 class="font-black uppercase tracking-[0.2em] text-xs text-white/30">Up Next</h3>
          <button class="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View All</button>
        </div>
        <div class="space-y-6">
          <NuxtLink v-for="i in 3" :key="i" :to="`/anime/${slug}/episode/${Number(ep) + i}`" class="flex gap-6 p-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/10">
            <div class="w-40 aspect-video bg-zinc-900 rounded-xl overflow-hidden shrink-0 shadow-lg relative">
              <img src="https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&q=80" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div class="flex flex-col justify-center gap-1">
              <span class="text-[10px] font-black text-primary tracking-widest uppercase">EPISODE {{ Number(ep) + i }}</span>
              <span class="font-bold text-white/80 group-hover:text-white transition-colors line-clamp-2">The next chapter of the journey begins...</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Nuxt 4 uses app/ directory by default, ensuring global styles apply */
body {
  background-color: #000;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #09090b;
}
::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #3f3f46;
}
</style>
