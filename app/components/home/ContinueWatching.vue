<script setup lang="ts">
import { History, Play } from 'lucide-vue-next'
const { getPoster } = useGoxImage()

const { data: recentHistory } = await useFetch('/api/user/recent')
</script>

<template>
  <section v-if="recentHistory?.recent?.length" class="container mx-auto px-6">
    <div class="flex items-center gap-4 mb-10">
      <div class="w-12 h-12 rounded-2xl bg-surface-gox border border-border-gox flex items-center justify-center">
        <History class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h2 class="text-3xl font-black tracking-tighter uppercase">Continue <span class="text-primary">Watching</span></h2>
        <p class="text-foreground/40 text-[10px] font-bold uppercase tracking-[0.2em]">Pick up where you left off</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <NuxtLink 
        v-for="item in recentHistory.recent" 
        :key="item.id"
        :to="`/anime/${item.slug}/episode/${item.episode_number}`"
        class="group glass-card p-4 rounded-3xl"
      >
        <div class="relative aspect-video rounded-2xl overflow-hidden bg-surface-gox mb-4">
          <GoxImage 
            :src="getPoster(item)" 
            :alt="item.title"
            parallax
            class="w-full h-full"
            image-class="transition-transform duration-700 group-hover:scale-110"
          />
          
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
              <Play class="w-6 h-6 text-white fill-white" />
            </div>
          </div>
          
          <!-- Progress Bar Overlay -->
          <div class="absolute bottom-0 left-0 right-0 h-1.5 bg-foreground/10">
            <div 
              class="h-full bg-primary shadow-[0_0_15px_rgba(var(--ui-primary-rgb),0.5)]" 
              :style="{ width: `${item.completed ? 100 : (item.progress / 1440) * 100}%` }"
            ></div>
          </div>
        </div>
        
        <div class="space-y-1">
          <h4 class="font-black text-sm truncate group-hover:text-primary transition-colors uppercase tracking-tight">{{ item.title }}</h4>
          <div class="flex items-center justify-between">
            <span class="text-[10px] text-muted font-bold uppercase tracking-widest">Episode {{ item.episode_number }}</span>
            <span class="text-[10px] text-primary/80 font-black">{{ Math.round((item.progress / 1440) * 100) }}%</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
