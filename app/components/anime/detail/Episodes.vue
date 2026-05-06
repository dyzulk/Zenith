<script setup lang="ts">
import { LayoutGrid, Info, Play } from 'lucide-vue-next'
import { gsap } from 'gsap'
const { getThumbnail } = useGoxImage()

const props = defineProps<{
  anime: any
}>()

const slug = computed(() => props.anime?.slug)
const episodes = computed(() => props.anime?.episodes || [])

useGsap((ctx) => {
  if (episodes.value.length > 0) {
    gsap.from('.episode-card', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.episodes-grid',
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    })
  }
})
</script>

<template>
  <div v-if="anime" class="mt-40 container mx-auto px-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
      <div class="space-y-2">
        <div class="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
          <LayoutGrid class="w-4 h-4" />
          Stream Directory
        </div>
        <h2 class="text-5xl font-black tracking-tighter uppercase">Episodes <span class="text-primary ml-2">{{ episodes.length }}</span></h2>
      </div>
      <div class="flex items-center gap-2 px-6 py-3 glass-card rounded-full text-[10px] font-black uppercase tracking-widest text-muted border border-border-gox">
        <Info class="w-4 h-4" />
        Select an episode to start
      </div>
    </div>
    
    <div class="episodes-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <NuxtLink 
        v-for="ep in episodes" 
        :key="ep.episodeNumber"
        :to="`/anime/${slug}/episode/${ep.episodeNumber}`"
        class="episode-card group glass-card p-4 rounded-[2rem]"
      >
        <div class="aspect-video relative rounded-2xl overflow-hidden mb-5 bg-surface-gox">
          <GoxImage 
            :src="getThumbnail(ep)" 
            :alt="ep.title"
            class="w-full h-full"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
            <div class="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40">
              <Play class="w-7 h-7 text-white fill-white ml-1" />
            </div>
          </div>
          
          <div class="absolute top-4 left-4 px-4 py-1.5 glass-card rounded-xl text-[10px] font-black tracking-widest border-white/10 uppercase">
            EP {{ ep.episodeNumber }}
          </div>
        </div>
        
        <div class="px-2 space-y-1">
          <h3 class="font-black text-sm group-hover:text-primary transition-colors line-clamp-1 leading-tight uppercase tracking-tight">{{ ep.title }}</h3>
          <p class="text-[9px] text-muted font-black uppercase tracking-[0.2em]">{{ anime.title }}</p>
        </div>
      </NuxtLink>
    </div>
    
    <div v-if="!anime.episodes || anime.episodes.length === 0" class="py-32 text-center glass-card rounded-[3rem] border-dashed border-border-gox">
      <p class="text-muted font-black italic tracking-[0.4em] uppercase text-[10px]">No transmission detected</p>
    </div>
  </div>
</template>
