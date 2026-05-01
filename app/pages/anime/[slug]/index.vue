<script setup lang="ts">
import { Play, Plus, Star, Calendar, Clock, Bookmark } from 'lucide-vue-next'

const { data: anime } = await useFetch(`/api/anime/${slug}`)
</script>

<template>
  <div v-if="anime" class="pb-20">
    <!-- Cover Banner -->
    <div class="h-[50vh] relative overflow-hidden">
      <img :src="anime.banner" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
    </div>

    <div class="container mx-auto px-6 -mt-32 relative z-10">
      <div class="flex flex-col md:flex-row gap-10">
        <!-- Poster -->
        <div class="w-64 shrink-0 mx-auto md:mx-0">
          <div class="aspect-[3/4] rounded-2xl overflow-hidden glass-panel shadow-2xl border-white/10 group">
            <img :src="anime.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
        </div>

        <!-- Info -->
        <div class="flex-1 space-y-6 text-center md:text-left">
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span v-for="genre in anime.genres" :key="genre" class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              {{ genre }}
            </span>
          </div>

          <h1 class="text-4xl md:text-6xl font-black tracking-tighter">{{ anime.title }}</h1>
          <p v-if="anime.title_romaji" class="text-foreground/40 font-medium italic">{{ anime.title_romaji }}</p>

          <div class="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-bold text-foreground/60">
            <div class="flex items-center gap-2"><Star class="w-5 h-5 text-primary fill-primary" /> {{ anime.score }}</div>
            <div class="flex items-center gap-2"><Calendar class="w-5 h-5 text-primary" /> {{ anime.year }}</div>
            <div class="flex items-center gap-2"><Clock class="w-5 h-5 text-primary" /> {{ anime.status }}</div>
          </div>

          <p class="text-foreground/60 leading-relaxed max-w-3xl">
            {{ anime.synopsis }}
          </p>

          <div class="flex items-center justify-center md:justify-start gap-4 pt-4">
            <button class="btn-premium flex items-center gap-2">
              <Play class="w-5 h-5 fill-current" />
              Watch Episode 1
            </button>
            <button class="p-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all">
              <Bookmark class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Episodes List -->
      <div class="mt-20">
        <h2 class="text-3xl font-black mb-10 tracking-tight">Episodes <span class="text-primary">{{ anime.episodes.length }}</span></h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink 
            v-for="ep in anime.episodes" 
            :key="ep.number"
            :to="`/anime/${slug}/episode/${ep.number}`"
            class="group glass-panel rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
          >
            <div class="aspect-video relative">
              <img :src="ep.thumbnail" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play class="w-12 h-12 text-white fill-white" />
              </div>
              <div class="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-black">
                EPISODE {{ ep.number }}
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-sm group-hover:text-primary transition-colors line-clamp-1">{{ ep.title }}</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
