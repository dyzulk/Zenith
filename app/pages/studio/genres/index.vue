<script setup lang="ts">
definePageMeta({
  layout: 'studio',
  middleware: 'auth'
})

const { data, status, refresh } = await useFetch<{ genres: any[] }>('/api/studio/genres', {
  lazy: true
})

const genres = computed(() => data.value?.genres || [])
</script>

<template>
  <UDashboardPanel id="genres">
    <template #header>
      <UDashboardNavbar title="Manajemen Genre">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <StudioGenresGenreModal @success="refresh" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <StudioGenresGenreList 
        :data="genres" 
        :status="status" 
        @refresh="refresh" 
      />
    </template>
  </UDashboardPanel>
</template>
