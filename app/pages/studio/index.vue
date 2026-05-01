<script setup lang="ts">
definePageMeta({
  layout: 'studio',
  middleware: 'studio-auth'
})

const { isNotificationsSlideoverOpen } = useDashboard()

// Fetch real stats from D1
const { data: stats } = await useFetch('/api/studio/stats')

const items = [[{
  label: 'New Anime',
  icon: 'i-lucide-play',
  to: '/studio/anime/create'
}, {
  label: 'Manage Users',
  icon: 'i-lucide-users',
  to: '/studio/users'
}]]
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Studio Dashboard" :ui="{ right: 'gap-3' }">
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
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-8 space-y-8">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="glass-panel p-6 rounded-3xl border border-white/5 space-y-2">
            <span class="text-xs font-bold uppercase tracking-widest text-foreground/40">Total Anime</span>
            <div class="text-4xl font-black text-primary">{{ stats?.animeCount || 0 }}</div>
          </div>
          <div class="glass-panel p-6 rounded-3xl border border-white/5 space-y-2">
            <span class="text-xs font-bold uppercase tracking-widest text-foreground/40">Total Episodes</span>
            <div class="text-4xl font-black text-primary">{{ stats?.episodeCount || 0 }}</div>
          </div>
          <div class="glass-panel p-6 rounded-3xl border border-white/5 space-y-2">
            <span class="text-xs font-bold uppercase tracking-widest text-foreground/40">Total Users</span>
            <div class="text-4xl font-black text-primary">{{ stats?.userCount || 0 }}</div>
          </div>
        </div>

        <!-- Welcome Card -->
        <div class="glass-panel p-10 rounded-[3rem] border border-white/5 relative overflow-hidden bg-primary/5">
          <div class="relative z-10 space-y-4 max-w-2xl">
            <h1 class="text-4xl font-black tracking-tight">Welcome to Zenith Studio</h1>
            <p class="text-foreground/60 leading-relaxed">
              Manage your anime collection, upload new episodes, and monitor user engagement from this central dashboard.
            </p>
            <div class="flex gap-4 pt-4">
              <UButton label="Add Anime" color="primary" size="lg" to="/studio/anime/create" />
              <UButton label="View Website" variant="ghost" color="neutral" size="lg" to="/" target="_blank" />
            </div>
          </div>
          <UIcon name="i-lucide-sparkles" class="absolute -right-10 -bottom-10 size-64 text-primary/10 rotate-12" />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
