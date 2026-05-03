<script setup lang="ts">
import { Flame, Star, Play, TrendingUp, Clock } from 'lucide-vue-next'
const { getPoster, getBanner } = useZenithImage()

const { data: trendingAnime } = await useFetch('/api/anime/trending')

const topAnime = computed(() => trendingAnime.value?.[0])
const restAnime = computed(() => trendingAnime.value?.slice(1) || [])
</script>

<template>
  <div class="is-zenith min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6 space-y-20">
      <!-- Header -->
      <div class="space-y-4 animate-reveal-up text-center max-w-2xl mx-auto">
        <div class="flex items-center justify-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
          <TrendingUp class="w-4 h-4" />
          Real-time Analytics
        </div>
        <h1 class="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">Trending <span class="text-primary italic">Global</span></h1>
        <p class="text-muted font-medium italic">What the Zenith community is watching right now across the globe.</p>
      </div>

      <!-- Spotlight (Top 1) -->
      <section v-if="topAnime" class="animate-reveal-up" style="animation-delay: 0.1s">
        <NuxtLink :to="`/anime/${topAnime.slug}`" class="group relative block aspect-[21/9] rounded-[3rem] overflow-hidden border border-border-zenith">
          <img :src="getBanner(topAnime)" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          
          <div class="absolute inset-y-0 left-0 p-12 md:p-20 flex flex-col justify-center max-w-2xl space-y-6">
            <div class="flex items-center gap-4">
               <span class="px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/30">#1 Trending</span>
               <div class="flex items-center gap-2 text-primary font-black text-sm">
                 <Star class="w-5 h-5 fill-primary" /> {{ topAnime.score }}
               </div>
            </div>
            <h2 class="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">{{ topAnime.title }}</h2>
            <p class="text-foreground/60 line-clamp-3 text-lg italic">"{{ topAnime.synopsis }}"</p>
            <div class="flex items-center gap-6 pt-4">
              <button class="btn-premium px-10 py-5 text-[11px]">
                <Play class="w-5 h-5 fill-current" />
                Watch Number One
              </button>
            </div>
          </div>
        </NuxtLink>
      </section>

      <!-- The Rest -->
      <section class="space-y-12 animate-reveal-up" style="animation-delay: 0.2s">
        <h3 class="text-xs font-black uppercase tracking-[0.3em] text-muted border-l-4 border-primary pl-4">Rising Powerhouses</h3>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
           <NuxtLink 
            v-for="(anime, idx) in restAnime" 
            :key="anime.id"
            :to="`/anime/${anime.slug}`"
            class="group space-y-4"
          >
            <div class="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-surface-zenith border border-border-zenith group-hover:border-primary/50 transition-all">
              <div class="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center font-black text-xs text-white border border-white/10 italic">
                #{{ idx + 2 }}
              </div>
              <img :src="getPoster(anime)" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="px-2">
              <h4 class="font-black text-sm group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-tight">{{ anime.title }}</h4>
              <div class="flex items-center justify-between mt-1">
                <span class="text-[9px] text-muted font-bold uppercase tracking-widest">{{ anime.type }}</span>
                <span class="flex items-center gap-1 text-[10px] font-black text-primary"><Star class="w-3 h-3 fill-primary" /> {{ anime.score }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>
