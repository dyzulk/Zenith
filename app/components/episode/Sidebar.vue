<script setup lang="ts">
import { Play, Lock } from 'lucide-vue-next'
import type { Episode } from '@zenith/shared'

defineProps<{
  episodes: Episode[]
  currentEpisode: number
  animeSlug: string
  animeTitle: string
}>()
</script>

<template>
  <aside class="flex flex-col gap-4">
    <div class="flex items-center justify-between px-2">
      <h3 class="font-black uppercase tracking-[0.2em] text-xs text-white/30">Next Episodes</h3>
      <span class="text-[10px] font-black uppercase tracking-widest text-primary/50">{{ episodes.length }} Episodes</span>
    </div>

    <div class="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 custom-scrollbar">
      <NuxtLink 
        v-for="ep in episodes" 
        :key="ep.id" 
        :to="`/anime/${animeSlug}/episode/${ep.episode_number}`"
        class="flex gap-4 p-2 rounded-xl transition-all group relative overflow-hidden border border-transparent"
        :class="[
          ep.episode_number === currentEpisode 
            ? 'bg-primary/10 border-primary/20' 
            : 'hover:bg-white/5 hover:border-white/10'
        ]"
      >
        <!-- Thumbnail Container -->
        <div class="w-32 aspect-video bg-zinc-900 rounded-lg overflow-hidden shrink-0 shadow-lg relative">
          <img 
            v-if="ep.thumbnail_url"
            :src="ep.thumbnail_url" 
            class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            :class="ep.episode_number === currentEpisode ? 'opacity-40' : 'opacity-60 group-hover:opacity-100'"
          />
          <div v-else class="w-full h-full bg-zinc-800 flex items-center justify-center opacity-30">
             <Play class="w-6 h-6 text-white/20" />
          </div>
          
          <!-- Overlay for Current -->
          <div v-if="ep.episode_number === currentEpisode" class="absolute inset-0 flex items-center justify-center">
             <div class="bg-primary/20 backdrop-blur-sm p-1.5 rounded-full border border-primary/50">
               <Play class="w-4 h-4 fill-primary text-primary" />
             </div>
          </div>
          
          <!-- Episode Number Badge -->
          <div class="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 backdrop-blur-md rounded text-[9px] font-black tracking-tighter">
            EP {{ ep.episode_number }}
          </div>
        </div>

        <!-- Info -->
        <div class="flex flex-col justify-center gap-1 min-w-0">
          <span 
            class="text-[10px] font-black tracking-widest uppercase truncate"
            :class="ep.episode_number === currentEpisode ? 'text-primary' : 'text-white/40'"
          >
            {{ ep.episode_number === currentEpisode ? 'Now Watching' : `Episode ${ep.episode_number}` }}
          </span>
          <h4 
            class="font-bold text-xs line-clamp-2 leading-tight transition-colors"
            :class="ep.episode_number === currentEpisode ? 'text-white' : 'text-white/70 group-hover:text-white'"
          >
            {{ ep.title || 'Untitled Episode' }}
          </h4>
        </div>

        <!-- Progress Placeholder (Optional) -->
        <div v-if="ep.episode_number === currentEpisode" class="absolute bottom-0 left-0 h-0.5 bg-primary w-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"></div>
      </NuxtLink>
    </div>
  </aside>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
