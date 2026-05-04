<script setup lang="ts">
import { Share2, Plus, Flag, MessageSquare } from 'lucide-vue-next'
const { getPoster } = useGoxImage()
import type { Anime, Episode } from '@goxstream/shared'

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
          <h1 class="text-3xl font-black tracking-tighter lg:text-4xl">
            Episode {{ episode.episodeNumber }}: {{ episode.title || 'Untitled' }}
          </h1>
          <div class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted">
            <span class="text-primary">{{ anime.title }}</span>
            <span>•</span>
            <span>{{ anime.year }}</span>
            <span>•</span>
            <span>{{ anime.status }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <button class="flex items-center gap-2 px-4 py-2.5 bg-surface-gox hover:bg-white/10 rounded-xl transition-all border border-border-gox text-xs font-black uppercase tracking-widest">
            <Plus class="w-4 h-4" />
            Watchlist
          </button>
          <button class="flex items-center gap-2 px-4 py-2.5 bg-surface-gox hover:bg-white/10 rounded-xl transition-all border border-border-gox text-xs font-black uppercase tracking-widest">
            <Share2 class="w-4 h-4" />
            Share
          </button>
          <button class="p-2.5 bg-surface-gox hover:bg-white/10 rounded-xl transition-all border border-border-gox text-muted hover:text-foreground">
            <Flag class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Description Card -->
    <div class="p-6 bg-surface-gox rounded-2xl border border-border-gox space-y-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg overflow-hidden bg-background border border-border-gox">
           <img :src="getPoster(anime)" class="w-full h-full object-cover" />
        </div>
        <div>
          <h4 class="font-bold text-sm">{{ anime.title }}</h4>
          <p class="text-[10px] text-muted font-black uppercase tracking-widest">Series Details</p>
        </div>
      </div>
      
      <p class="text-foreground/70 leading-relaxed text-sm lg:text-base">
        {{ episode.synopsis || anime.synopsis }}
      </p>

      <div class="pt-4 flex flex-wrap gap-2">
        <span v-for="genre in anime.genres" :key="genre" class="px-3 py-1 bg-surface-gox rounded-full text-[10px] font-black uppercase tracking-tighter text-muted">
          {{ genre }}
        </span>
      </div>
    </div>

  </div>
</template>
