<script setup lang="ts">
import { Flame, Sparkles } from 'lucide-vue-next'

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
      <AnimeCatalogHero />
      <AnimeCatalogSection 
        v-for="(cat, idx) in categories" 
        :key="cat.title"
        :title="cat.title"
        :icon="cat.icon"
        :items="cat.items.value"
        :delay="(idx + 1) * 0.1"
      />
    </div>
  </div>
</template>
