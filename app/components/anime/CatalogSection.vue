<script setup lang="ts">
import { Star } from 'lucide-vue-next'
const { getPoster } = useGoxImage()

const props = defineProps<{
  title: string
  icon: any
  items: any[]
  delay?: number
}>()
</script>

<template>
  <div class="space-y-10 animate-reveal-up" :style="{ animationDelay: `${delay}s` }">
    <div class="flex items-center gap-4">
       <div class="w-10 h-10 rounded-xl bg-surface-gox border border-border-gox flex items-center justify-center">
         <component :is="icon" class="w-5 h-5 text-primary" />
       </div>
       <h2 class="text-2xl font-black uppercase tracking-tight">{{ title }}</h2>
    </div>

    <div v-if="items" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      <NuxtLink 
        v-for="anime in items" 
        :key="anime.id"
        :to="`/anime/${anime.slug}`"
        class="group space-y-4"
      >
        <div class="aspect-[2/3] rounded-2xl overflow-hidden bg-surface-gox border border-border-gox relative group-hover:border-primary/50 transition-all">
          <GoxImage 
          :src="getPoster(anime)" 
          :alt="anime.title" 
          class="absolute inset-0 w-full h-full"
          image-class="transition-transform duration-1000 group-hover:scale-110"
        />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <div class="flex items-center gap-1 text-primary mb-1">
              <Star class="w-3 h-3 fill-primary" />
              <span class="text-[10px] font-black">{{ anime.score }}</span>
            </div>
          </div>
        </div>
        <div class="px-1">
          <h3 class="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors leading-tight uppercase tracking-tight">{{ anime.title }}</h3>
          <p class="text-[10px] text-muted mt-1 font-bold uppercase tracking-widest">{{ anime.year }} • {{ anime.status }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
