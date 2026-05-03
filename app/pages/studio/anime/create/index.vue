<script setup lang="ts">
definePageMeta({
  layout: 'studio',
  middleware: 'auth'
})
</script>

<template>
  <UDashboardPanel id="anime-create">
    <template #header>
      <UDashboardNavbar title="Tambah Anime Baru">
        <template #leading>
          <UButton
            icon="i-lucide-arrow-left"
            variant="ghost"
            color="neutral"
            to="/studio/anime"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <StudioAnimeCreateForm />
    </template>
  </UDashboardPanel>
</template>
