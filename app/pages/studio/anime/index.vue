<script setup lang="ts">
definePageMeta({
  layout: 'studio',
  middleware: 'auth'
})

const { data, status, refresh } = await useFetch<{ anime: any[] }>('/api/studio/anime', {
  lazy: true
})

const animeList = computed(() => data.value?.anime || [])
</script>

<template>
  <UDashboardPanel id="anime">
    <template #header>
      <UDashboardNavbar title="Manajemen Anime">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <UButton
            label="Tambah Anime"
            icon="i-lucide-plus"
            color="primary"
            to="/studio/anime/create"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <StudioAnimeList 
        :data="animeList" 
        :status="status" 
        @refresh="refresh" 
      />
    </template>
  </UDashboardPanel>
</template>
