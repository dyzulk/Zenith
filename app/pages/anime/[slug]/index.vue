<script setup lang="ts">
import { Play, Plus, Star, Calendar, Clock, Bookmark, Building2, Users } from 'lucide-vue-next'

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
</script>

<template>
  <div v-if="anime" class="pb-20">
    <!-- Cover Banner -->
    <div class="h-[60vh] relative overflow-hidden">
      <img :src="anime.banner_url || anime.banner" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
    </div>

    <div class="container mx-auto px-6 -mt-48 relative z-10">
      <div class="flex flex-col md:flex-row gap-12">
        <!-- Poster & Quick Actions -->
        <div class="w-72 shrink-0 mx-auto md:mx-0 space-y-6">
          <div class="aspect-[2/3] rounded-3xl overflow-hidden glass-panel shadow-2xl border border-white/10 group relative">
            <img :src="anime.poster_url || anime.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span class="text-xs font-bold uppercase tracking-widest text-white/60">Released in {{ anime.year }}</span>
            </div>
          </div>
          
          <div class="flex gap-3">
            <button class="flex-1 btn-premium py-4 flex items-center justify-center gap-2 group">
              <Play class="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
              Watch Now
            </button>
            <button class="p-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all text-foreground/60 hover:text-primary">
              <Bookmark class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Detailed Info -->
        <div class="flex-1 space-y-8">
          <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <span v-for="genre in anime.genres" :key="genre" class="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-tighter text-foreground/40 hover:text-primary hover:border-primary/30 transition-all cursor-default">
                {{ genre }}
              </span>
            </div>
            <h1 class="text-5xl md:text-7xl font-black tracking-tighter text-white">{{ anime.title }}</h1>
            <p v-if="anime.title_romaji" class="text-xl font-bold text-foreground/30 tracking-tight">{{ anime.title_romaji }}</p>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 glass-panel rounded-3xl border border-white/5">
            <div v-for="stat in displayStats" :key="stat.label" class="space-y-1">
              <div class="flex items-center gap-2 text-foreground/40">
                <component :is="stat.icon" class="w-4 h-4" />
                <span class="text-[10px] font-bold uppercase tracking-widest">{{ stat.label }}</span>
              </div>
              <div class="text-lg font-black" :class="stat.color">{{ stat.value }}</div>
            </div>
          </div>

          <div class="space-y-6">
            <h3 class="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <span class="w-8 h-[2px] bg-primary"></span>
              Synopsis
            </h3>
            <p class="text-lg text-foreground/60 leading-relaxed font-medium">
              {{ anime.synopsis }}
            </p>
          </div>

          <!-- Production Info -->
          <div class="flex flex-wrap gap-10 pt-4 border-t border-white/5 mt-10">
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-foreground/30 text-xs font-bold uppercase tracking-widest">
                <Building2 class="w-4 h-4" /> Studio
              </div>
              <div class="text-foreground/80 font-bold">{{ anime.studio || 'Unknown' }}</div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-foreground/30 text-xs font-bold uppercase tracking-widest">
                <Users class="w-4 h-4" /> Season
              </div>
              <div class="text-foreground/80 font-bold capitalize">{{ anime.season || 'Unknown' }} {{ anime.year }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Episodes List -->
      <div class="mt-32">
        <div class="flex items-end justify-between mb-12 border-b border-white/5 pb-6">
          <h2 class="text-4xl font-black tracking-tighter">Episodes <span class="text-primary ml-2">{{ anime.episodes?.length || 0 }}</span></h2>
          <span class="text-xs font-bold uppercase tracking-widest text-foreground/30">Select an episode to start streaming</span>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink 
            v-for="ep in anime.episodes" 
            :key="ep.number"
            :to="`/anime/${slug}/episode/${ep.number}`"
            class="group relative glass-panel rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 border border-white/5"
          >
            <div class="aspect-video relative overflow-hidden">
              <img :src="ep.thumbnail || '/img/placeholder-ep.jpg'" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/40">
                  <Play class="w-6 h-6 text-white fill-white ml-1" />
                </div>
              </div>
              <div class="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-black tracking-tighter border border-white/10">
                EP {{ ep.number }}
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-bold text-sm group-hover:text-primary transition-colors line-clamp-1 leading-tight">{{ ep.title }}</h3>
              <p class="text-[10px] text-foreground/40 mt-1 font-bold uppercase tracking-widest">{{ anime.title }}</p>
            </div>
          </NuxtLink>
        </div>
        
        <div v-if="!anime.episodes || anime.episodes.length === 0" class="py-20 text-center glass-panel rounded-3xl border border-dashed border-white/10">
          <p class="text-foreground/40 font-bold italic tracking-widest uppercase text-xs">No episodes available yet</p>
        </div>
      </div>
    </div>
  </div>
</template>
