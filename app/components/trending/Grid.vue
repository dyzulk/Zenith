<script setup lang="ts">
import { Star } from 'lucide-vue-next'
const { getPoster } = useGoxImage()

const props = defineProps<{
  anime: any[]
}>()
</script>

<template>
  <section class="space-y-12">
    <h3 class="text-xs font-black uppercase tracking-[0.3em] text-muted border-l-4 border-primary pl-4">Rising Powerhouses</h3>
    
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
       <NuxtLink 
        v-for="(item, idx) in anime" 
        :key="item.id"
        :to="`/anime/${item.slug}`"
        class="group space-y-4"
      >
        <div class="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-surface-gox border border-border-gox group-hover:border-primary/50 transition-all">
          <div class="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center font-black text-xs text-white border border-white/10 italic">
            #{{ idx + 2 }}
          </div>
          <GoxImage 
          :src="getPoster(item)" 
          :alt="item.title" 
          class="absolute inset-0 w-full h-full"
          image-class="transition-transform duration-1000 group-hover:scale-110"
        />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div class="px-2">
          <h4 class="font-black text-sm group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-tight">{{ item.title }}</h4>
          <div class="flex items-center justify-between mt-1">
            <span class="text-[9px] text-muted font-bold uppercase tracking-widest">{{ item.type }}</span>
            <span class="flex items-center gap-1 text-[10px] font-black text-primary"><Star class="w-3 h-3 fill-primary" /> {{ item.score }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
