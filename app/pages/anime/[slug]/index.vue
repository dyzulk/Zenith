<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: anime } = await useFetch(`/api/anime/${slug}`)

// Dynamic SEO
if (anime.value) {
  const seoTitle = `${anime.value.title} - Watch on Zenith`
  const seoDesc = anime.value.synopsis || `Watch ${anime.value.title} on Zenith. High quality streaming with no ads.`
  const seoImage = anime.value.poster_url || (anime.value.poster_key ? `/api/r2/${anime.value.poster_key}` : '')

  useSeoMeta({
    title: seoTitle,
    ogTitle: seoTitle,
    description: seoDesc,
    ogDescription: seoDesc,
    ogImage: seoImage,
    twitterCard: 'summary_large_image',
    twitterTitle: seoTitle,
    twitterDescription: seoDesc,
    twitterImage: seoImage
  })
}
</script>

<template>
  <div v-if="anime" class="is-zenith pb-32">
    <AnimeDetailHero :anime="anime" />
    <AnimeDetailEpisodes :anime="anime" />
  </div>
</template>
