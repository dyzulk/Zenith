<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: anime } = await useFetch(`/api/anime/${slug}`)

// Dynamic SEO
if (anime.value) {
  const seoTitle = `${anime.value.title} - Watch on GoxStream`
  const seoDesc = anime.value.synopsis || `Watch ${anime.value.title} on GoxStream. High quality streaming with no ads.`
  const seoImage = anime.value.poster_url || (anime.value.poster_key ? `/api/storage/${anime.value.poster_key}` : '')

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
  <div v-if="anime" class="is-gox pb-32">
    <AnimeDetailHero :anime="anime" />
    <AnimeDetailEpisodes :anime="anime" />
  </div>
</template>
