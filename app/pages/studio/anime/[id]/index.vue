<script setup lang="ts">
definePageMeta({
  layout: 'studio',
  middleware: 'auth'
})

const route = useRoute()
const id = route.params.id as string

const { data, status, refresh } = await useFetch<{ anime: any }>(`/api/studio/anime/${id}`)
const anime = computed(() => data.value?.anime)

const tabs = [
  { label: 'Informasi Umum', icon: 'i-lucide-info', slot: 'general' }, 
  { label: 'Manajemen Episode', icon: 'i-lucide-list-video', slot: 'episodes' }
]
</script>

<template>
  <UDashboardPanel id="anime-edit">
    <template #header>
      <UDashboardNavbar :title="status === 'pending' ? 'Memuat...' : `Edit: ${anime?.title}`">
        <template #leading>
          <UButton icon="i-lucide-arrow-left" variant="ghost" color="neutral" to="/studio/anime" />
        </template>
        <template #right>
          <UButton v-if="anime" label="Lihat di Situs" icon="i-lucide-external-link" variant="ghost" color="neutral" :to="`/anime/${anime.slug}`" target="_blank" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UTabs :items="tabs" class="w-full" :ui="{ list: 'px-4 border-b border-default' }">
        <template #general>
          <StudioAnimeEditForm :anime="anime" :id="id" @refresh="refresh" />
        </template>

        <template #episodes>
          <div class="p-4 lg:p-8">
            <StudioEpisodeManager :anime-id="id" />
          </div>
        </template>
      </UTabs>
    </template>
  </UDashboardPanel>
</template>
