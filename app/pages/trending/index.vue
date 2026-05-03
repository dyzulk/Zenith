<script setup lang="ts">
const { data: trendingAnime } = await useFetch('/api/anime/trending')

const topAnime = computed(() => trendingAnime.value?.[0])
const restAnime = computed(() => trendingAnime.value?.slice(1) || [])
</script>

<template>
  <div class="is-zenith min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6 space-y-20">
      <TrendingHero />
      <TrendingSpotlight :anime="topAnime" />
      <TrendingGrid :anime="restAnime" />
    </div>
  </div>
</template>
