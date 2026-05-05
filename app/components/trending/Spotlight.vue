<script setup lang="ts">
import { Star, Play } from 'lucide-vue-next'
const { getBanner } = useGoxImage()

const props = defineProps<{
  anime: any
}>()
</script>

<template>
  <section v-if="anime">
    <NuxtLink :to="`/anime/${anime.slug}`" class="group relative block aspect-[21/9] rounded-[3rem] overflow-hidden border border-border-gox">
      <img :src="getBanner(anime)" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
      <div class="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      
      <div class="absolute inset-y-0 left-0 p-12 md:p-20 flex flex-col justify-center max-w-2xl space-y-6">
        <div class="flex items-center gap-4">
           <span class="px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/30">#1 Trending</span>
           <div class="flex items-center gap-2 text-primary font-black text-sm">
             <Star class="w-5 h-5 fill-primary" /> {{ anime.score }}
           </div>
        </div>
        <h2 class="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">{{ anime.title }}</h2>
        <p class="text-foreground/60 line-clamp-3 text-lg italic">"{{ anime.synopsis }}"</p>
        <div class="flex items-center gap-6 pt-4">
          <button class="btn-premium px-10 py-5 text-[11px]">
            <Play class="w-5 h-5 fill-current" />
            Watch Number One
          </button>
        </div>
      </div>
    </NuxtLink>
  </section>
</template>
