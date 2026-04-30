<script setup lang="ts">
import { ChevronLeft, Maximize, Settings, Volume2, Play } from 'lucide-vue-next'
import Hls from 'hls.js'

const route = useRoute()
const { slug, ep } = route.params
const videoRef = ref<HTMLVideoElement | null>(null)

// In a real app, you would:
// 1. Fetch episode metadata from Supabase
// 2. Fetch presigned R2 URL from your stream-signer Worker
const videoUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' // Sample HLS

const goBack = () => navigateTo(`/anime/${slug}`)

onMounted(() => {
  if (videoRef.value) {
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(videoUrl)
      hls.attachMedia(videoRef.value)
    } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.value.src = videoUrl
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
      <button @click="goBack" class="flex items-center gap-2 hover:text-primary transition-colors group">
        <ChevronLeft class="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        <span class="font-bold tracking-tight">Back to Series</span>
      </button>
      <div class="text-center">
        <h1 class="text-sm font-bold opacity-50 uppercase tracking-widest">Now Watching</h1>
        <p class="font-black">Solo Leveling — Episode {{ ep }}</p>
      </div>
      <div class="w-20"></div> <!-- Spacer -->
    </header>

    <!-- Player Area -->
    <div class="h-screen w-full flex items-center justify-center relative group">
      <video 
        ref="videoRef"
        controls 
        class="w-full h-full max-h-[80vh] aspect-video object-contain shadow-2xl"
      ></video>

      <!-- Custom Overlay (If building custom UI) -->
      <div class="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div class="w-20 h-20 bg-primary/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
          <Play class="w-8 h-8 fill-white" />
        </div>
      </div>
    </div>

    <!-- Episode Navigation / Info -->
    <div class="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div class="lg:col-span-2 space-y-6">
        <h2 class="text-2xl font-black">Episode {{ ep }}: I'm Used to It</h2>
        <p class="text-white/60 leading-relaxed">
          Sung Jin-Woo awakens in a hospital bed only to discover that he has become a "Player" in a real-life game system. As he completes daily quests to level up, he realizes his strength is growing at an impossible rate.
        </p>
      </div>

      <!-- Up Next / Side List -->
      <div class="space-y-6">
        <h3 class="font-bold uppercase tracking-widest text-xs text-white/40">Up Next</h3>
        <div class="space-y-4">
          <NuxtLink v-for="i in 3" :key="i" :to="`/anime/${slug}/episode/${Number(ep) + i}`" class="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group">
            <div class="w-32 aspect-video bg-white/10 rounded-lg overflow-hidden shrink-0">
              <img src="https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=200&q=80" class="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div class="flex flex-col justify-center">
              <span class="text-[10px] font-bold text-primary">EPISODE {{ Number(ep) + i }}</span>
              <span class="text-sm font-bold line-clamp-1">Title of next episode</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide default scrollbar during playback */
body {
  overflow: hidden;
}
</style>
