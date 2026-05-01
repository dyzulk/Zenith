<script setup lang="ts">
import { Search, Filter, Play, Star } from 'lucide-vue-next'

const { data: animeList } = await useFetch('/api/anime/trending') // Using trending as default for browse
const q = ref('')

const filteredAnime = computed(() => {
  if (!q.value) return animeList.value
  return animeList.value?.filter((a: any) => 
    a.title.toLowerCase().includes(q.value.toLowerCase())
  )
})
</script>

<template>
  <div class="pt-32 pb-20 container mx-auto px-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
      <div class="space-y-4">
        <h1 class="text-5xl md:text-7xl font-black tracking-tighter">Browse <span class="text-primary">Anime</span></h1>
        <p class="text-foreground/40 font-medium max-w-md italic">Discover your next favorite series from our curated collection.</p>
      </div>

      <div class="relative w-full md:w-96">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
        <input 
          v-model="q"
          type="text" 
          placeholder="Search for titles..." 
          class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary/50 transition-all font-bold text-sm"
        />
      </div>
    </div>

    <!-- Anime Grid -->
    <div v-if="filteredAnime?.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      <NuxtLink 
        v-for="anime in filteredAnime" 
        :key="anime.slug"
        :to="`/anime/${anime.slug}`"
        class="group space-y-4"
      >
        <div class="aspect-[2/3] rounded-2xl overflow-hidden glass-panel border border-white/5 relative shadow-xl">
          <img :src="anime.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <div class="flex items-center gap-1 text-primary mb-1">
              <Star class="w-3 h-3 fill-primary" />
              <span class="text-[10px] font-black">{{ anime.score }}</span>
            </div>
          </div>
          <div class="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[8px] font-black tracking-tighter uppercase border border-white/10">
            {{ anime.type }}
          </div>
        </div>
        <div class="px-1">
          <h3 class="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors leading-tight">{{ anime.title }}</h3>
          <p class="text-[10px] text-foreground/40 mt-1 font-bold uppercase tracking-widest">{{ anime.year }} • {{ anime.status }}</p>
        </div>
      </NuxtLink>
    </div>

    <div v-else class="py-40 text-center glass-panel rounded-[3rem] border border-dashed border-white/5">
      <p class="text-foreground/20 font-black italic tracking-widest uppercase text-xl">No anime found</p>
    </div>
  </div>
</template>
