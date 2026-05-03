<script setup lang="ts">
definePageMeta({
  layout: 'studio',
  middleware: 'auth'
})

const { isNotificationsSlideoverOpen } = useDashboard()

// Fetch real stats from API
const { data: stats } = await useFetch<any>('/api/studio/stats')

const items = [[{
  label: 'Anime Baru',
  icon: 'i-lucide-play',
  to: '/studio/anime/create'
}, {
  label: 'Kelola Genre',
  icon: 'i-lucide-tags',
  to: '/studio/genres'
}]]
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Ringkasan Studio">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton
            color="neutral"
            variant="ghost"
            square
            @click="isNotificationsSlideoverOpen = true"
          >
            <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
          </UButton>

          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" color="primary" />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-4 lg:p-8 space-y-8">
        <StudioHomeDashboardStats :stats="stats" />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <StudioHomeDashboardRecentAnime :anime="stats?.recentAnime" class="lg:col-span-2" />
          <StudioHomeDashboardRecentEpisodes :episodes="stats?.recentEpisodes" />
        </div>

        <StudioHomeDashboardInsights />
      </div>
    </template>
  </UDashboardPanel>
</template>
