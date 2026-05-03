<script setup lang="ts">
import { LayoutGrid, Library, Star, Flame, Sparkles } from 'lucide-vue-next'
const { getPoster } = useZenithImage()

const { data: allAnime } = await useFetch('/api/anime')
const { data: popularAnime } = await useFetch('/api/anime/trending')

const categories = [
  { title: 'Popular Series', icon: Flame, items: popularAnime },
  { title: 'Recently Added', icon: Sparkles, items: allAnime },
]
</script>

<template>
  <div class="is-zenith min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6 space-y-20">
      <!-- Header -->
      <div class="space-y-4 animate-reveal-up">
        <div class="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
          <Library class="w-4 h-4" />
          Zenith Collection
        </div>
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 class="text-6xl font-black tracking-tighter uppercase">Anime <span class="text-primary">Catalog</span></h1>
          <NuxtLink to="/browse" class="btn-premium px-8 py-4 text-[10px] group">
            <LayoutGrid class="w-4 h-4" />
            Explore Library
          </NuxtLink>
        </div>
      </div>

      <!-- Content Sections -->
      <div v-for="(cat, idx) in categories" :key="cat.title" 
           class="space-y-10 animate-reveal-up" 
           :style="{ animationDelay: `${(idx + 1) * 0.1}s` }">
        <div class="flex items-center gap-4">
           <div class="w-10 h-10 rounded-xl bg-surface-zenith border border-border-zenith flex items-center justify-center">
             <component :is="cat.icon" class="w-5 h-5 text-primary" />
           </div>
           <h2 class="text-2xl font-black uppercase tracking-tight">{{ cat.title }}</h2>
        </div>

        <div v-if="cat.items?.value" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <NuxtLink 
            v-for="anime in cat.items.value" 
            :key="anime.id"
            :to="`/anime/${anime.slug}`"
            class="group space-y-4"
          >
            <div class="aspect-[2/3] rounded-2xl overflow-hidden bg-surface-zenith border border-border-zenith relative group-hover:border-primary/50 transition-all">
              <img :src="getPoster(anime)" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
    </div>
  </div>
</template>
