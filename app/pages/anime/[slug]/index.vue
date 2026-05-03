<script setup lang="ts">
import { Play, Plus, Star, Calendar, Clock, Bookmark, Building2, Users, LayoutGrid, Info } from 'lucide-vue-next'

const route = useRoute()
const slug = route.params.slug as string

const { data: anime, refresh } = await useFetch(`/api/anime/${slug}`)

// Complete the metadata structure if missing
const displayStats = computed(() => [
  { label: 'Score', value: anime.value?.score || 'N/A', icon: Star, color: 'text-primary' },
  { label: 'Year', value: anime.value?.year || 'N/A', icon: Calendar },
  { label: 'Status', value: anime.value?.status || 'Ongoing', icon: Clock },
  { label: 'Type', value: anime.value?.type || 'TV', icon: Play },
])

// Dynamic SEO
if (anime.value) {
  const seoTitle = `${anime.value.title} - Watch on Zenith`
  const seoDesc = anime.value.synopsis || `Watch ${anime.value.title} on Zenith. High quality streaming with no ads.`
  const seoImage = anime.value.poster_url || (anime.value.poster_key ? `/api/r2/${anime.value.poster_key}` : '')

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
</script>

<template>
  <div v-if="anime" class="is-zenith pb-32">
    <!-- Cover Banner -->
    <div class="h-[70vh] relative overflow-hidden">
      <img :src="anime.banner_url || anime.banner" class="w-full h-full object-cover animate-blur-in" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent"></div>
    </div>

    <div class="container mx-auto px-6 -mt-64 relative z-10">
      <div class="flex flex-col lg:flex-row gap-16">
        <!-- Poster & Quick Actions -->
        <div class="w-full lg:w-80 shrink-0 space-y-8 animate-reveal-up">
          <div class="aspect-[2/3] rounded-[2rem] overflow-hidden glass-card shadow-2xl group relative border-white/10">
            <img :src="anime.poster_url || anime.image" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Official Art • {{ anime.year }}</span>
            </div>
          </div>
          
          <div class="flex gap-4">
            <button class="flex-1 btn-premium py-5 group">
              <Play class="w-5 h-5 fill-current group-hover:scale-125 transition-transform" />
              Watch Now
            </button>
            <button class="p-5 rounded-2xl glass-card text-foreground/40 hover:text-primary active:scale-90 transition-all">
              <Bookmark class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Detailed Info -->
        <div class="flex-1 space-y-12 animate-reveal-up" style="animation-delay: 0.1s">
          <div class="space-y-6">
            <div class="flex flex-wrap gap-2">
              <span v-for="genre in anime.genres" :key="genre" class="px-4 py-1.5 glass-card rounded-full text-[9px] font-black uppercase tracking-widest text-primary/80 hover:bg-primary/10 transition-colors cursor-default">
                {{ genre }}
              </span>
            </div>
            <h1 class="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase">{{ anime.title }}</h1>
            <p v-if="anime.title_romaji" class="text-2xl font-bold text-foreground/20 tracking-tighter">{{ anime.title_romaji }}</p>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div v-for="stat in displayStats" :key="stat.label" class="glass-card p-6 rounded-3xl space-y-3">
              <div class="flex items-center gap-2 text-foreground/30">
                <component :is="stat.icon" class="w-4 h-4" />
                <span class="text-[9px] font-black uppercase tracking-[0.2em]">{{ stat.label }}</span>
              </div>
              <div class="text-2xl font-black text-glow" :class="stat.color">{{ stat.value }}</div>
            </div>
          </div>

          <div class="space-y-6">
            <h3 class="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
              <span class="w-12 h-[2px] bg-primary"></span>
              Synopsis
            </h3>
            <p class="text-xl text-foreground/60 leading-relaxed font-medium max-w-4xl italic">
              "{{ anime.synopsis }}"
            </p>
          </div>

          <!-- Production Info -->
          <div class="flex flex-wrap gap-12 pt-8 border-t border-white/5">
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-foreground/20 text-[10px] font-black uppercase tracking-widest">
                <Building2 class="w-4 h-4" /> Studio
              </div>
              <div class="text-foreground/80 font-black text-sm uppercase tracking-tight">{{ anime.studio || 'Unknown' }}</div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-foreground/20 text-[10px] font-black uppercase tracking-widest">
                <Users class="w-4 h-4" /> Season
              </div>
              <div class="text-foreground/80 font-black text-sm uppercase tracking-tight">{{ anime.season || 'Unknown' }} {{ anime.year }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Episodes List -->
      <div class="mt-40">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div class="space-y-2">
            <div class="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
              <LayoutGrid class="w-4 h-4" />
              Stream Directory
            </div>
            <h2 class="text-5xl font-black tracking-tighter uppercase">Episodes <span class="text-primary ml-2">{{ anime.episodes?.length || 0 }}</span></h2>
          </div>
          <div class="flex items-center gap-2 px-6 py-3 glass-card rounded-full text-[10px] font-black uppercase tracking-widest text-foreground/30">
            <Info class="w-4 h-4" />
            Select an episode to start
          </div>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <NuxtLink 
            v-for="ep in anime.episodes" 
            :key="ep.number"
            :to="`/anime/${slug}/episode/${ep.number}`"
            class="group glass-card p-4 rounded-[2rem]"
          >
            <div class="aspect-video relative rounded-2xl overflow-hidden mb-5">
              <img :src="ep.thumbnail || '/img/placeholder-ep.jpg'" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-100" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                <div class="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40">
                  <Play class="w-7 h-7 text-white fill-white ml-1" />
                </div>
              </div>
              
              <div class="absolute top-4 left-4 px-4 py-1.5 glass-card rounded-xl text-[10px] font-black tracking-widest border-white/10 uppercase">
                EP {{ ep.number }}
              </div>
            </div>
            
            <div class="px-2 space-y-1">
              <h3 class="font-black text-sm group-hover:text-primary transition-colors line-clamp-1 leading-tight uppercase tracking-tight">{{ ep.title }}</h3>
              <p class="text-[9px] text-foreground/30 font-black uppercase tracking-[0.2em]">{{ anime.title }}</p>
            </div>
          </NuxtLink>
        </div>
        
        <div v-if="!anime.episodes || anime.episodes.length === 0" class="py-32 text-center glass-card rounded-[3rem] border-dashed border-white/10">
          <p class="text-foreground/20 font-black italic tracking-[0.4em] uppercase text-[10px]">No transmission detected</p>
        </div>
      </div>
    </div>
  </div>
</template>
