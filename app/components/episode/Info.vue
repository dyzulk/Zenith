<script setup lang="ts">
import { Share2, Plus, Flag, MessageSquare } from 'lucide-vue-next'
import type { Anime, Episode } from '@zenith/shared'

defineProps<{
  anime: Anime
  episode: Episode
}>()
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <!-- Main Info -->
    <div class="space-y-4">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="space-y-2">
          <h1 class="text-3xl font-black tracking-tighter text-white lg:text-4xl">
            Episode {{ episode.episode_number }}: {{ episode.title || 'Untitled' }}
          </h1>
          <div class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/40">
            <span class="text-primary">{{ anime.title }}</span>
            <span>•</span>
            <span>{{ anime.year }}</span>
            <span>•</span>
            <span>{{ anime.status }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <button class="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-xs font-black uppercase tracking-widest">
            <Plus class="w-4 h-4" />
            Watchlist
          </button>
          <button class="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-xs font-black uppercase tracking-widest">
            <Share2 class="w-4 h-4" />
            Share
          </button>
          <button class="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-white/40 hover:text-white">
            <Flag class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Description Card -->
    <div class="p-6 bg-zinc-900/50 rounded-2xl border border-white/5 space-y-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg overflow-hidden bg-zinc-800">
           <img :src="anime.poster_url" class="w-full h-full object-cover" />
        </div>
        <div>
          <h4 class="font-bold text-sm">{{ anime.title }}</h4>
          <p class="text-[10px] text-white/40 font-black uppercase tracking-widest">Series Details</p>
        </div>
      </div>
      
      <p class="text-white/60 leading-relaxed text-sm lg:text-base">
        {{ episode.synopsis || anime.synopsis }}
      </p>

      <div class="pt-4 flex flex-wrap gap-2">
        <span v-for="genre in anime.genres" :key="genre" class="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-tighter text-white/40">
          {{ genre }}
        </span>
      </div>
    </div>

  </div>
</template>
