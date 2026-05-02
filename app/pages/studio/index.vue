<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'

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
  label: 'Manage Genres',
  icon: 'i-lucide-tags',
  to: '/studio/genres'
}]]

const statCards = computed(() => [
  { label: 'Total Anime', value: stats.value?.animeCount || 0, icon: 'i-lucide-clapperboard', color: 'primary' },
  { label: 'Total Episodes', value: stats.value?.episodeCount || 0, icon: 'i-lucide-play', color: 'success' },
  { label: 'Total Genres', value: stats.value?.genreCount || 0, icon: 'i-lucide-tags', color: 'warning' },
  { label: 'Total Users', value: stats.value?.userCount || 0, icon: 'i-lucide-users', color: 'info' }
])
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Studio Overview">
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="card in statCards" 
            :key="card.label"
            class="studio-card p-6 rounded-3xl space-y-4 border border-white/5"
          >
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-black uppercase tracking-widest text-foreground/40">{{ card.label }}</span>
              <UIcon :name="card.icon" class="size-5 text-primary/50" />
            </div>
            <div class="text-4xl font-black tracking-tight text-foreground">{{ card.value }}</div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Recent Anime (2/3 width) -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center justify-between px-2">
              <h3 class="text-xs font-black uppercase tracking-widest text-foreground/40">Latest Anime</h3>
              <UButton label="View All" variant="ghost" size="xs" to="/studio/anime" class="font-bold" />
            </div>
            
            <div class="studio-card rounded-3xl overflow-hidden border border-white/5">
              <div v-if="stats?.recentAnime?.length" class="divide-y divide-white/5">
                <NuxtLink 
                  v-for="anime in stats.recentAnime" 
                  :key="anime.id"
                  :to="`/studio/anime/${anime.id}`"
                  class="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
                >
                  <div class="size-12 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
                    <img v-if="anime.poster_key" :src="anime.poster_key.startsWith('http') ? anime.poster_key : `/api/r2/${anime.poster_key}`" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <UIcon name="i-lucide-image" class="size-5 text-white/10" />
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="font-bold text-sm group-hover:text-primary transition-colors truncate">{{ anime.title }}</div>
                    <div class="text-[10px] text-foreground/40 uppercase tracking-wider font-black">{{ anime.slug }}</div>
                  </div>
                  <div class="text-[10px] font-bold text-foreground/30 whitespace-nowrap">
                    {{ formatDistanceToNow(new Date(anime.created_at), { addSuffix: true }) }}
                  </div>
                </NuxtLink>
              </div>
              <div v-else class="p-12 text-center text-foreground/20 italic text-sm">
                No anime records found.
              </div>
            </div>
          </div>

          <!-- Recent Episodes (1/3 width) -->
          <div class="space-y-4">
            <div class="flex items-center justify-between px-2">
              <h3 class="text-xs font-black uppercase tracking-widest text-foreground/40">Recent Uploads</h3>
            </div>
            
            <div class="studio-card rounded-3xl overflow-hidden border border-white/5">
              <div v-if="stats?.recentEpisodes?.length" class="divide-y divide-white/5">
                <div 
                  v-for="ep in stats.recentEpisodes" 
                  :key="ep.id"
                  class="p-4 space-y-1"
                >
                  <div class="flex items-center justify-between">
                    <UBadge :label="`EP ${ep.episode_number}`" size="xs" variant="subtle" color="primary" class="font-black" />
                    <span class="text-[10px] font-bold text-foreground/30">
                      {{ formatDistanceToNow(new Date(ep.created_at), { addSuffix: true }) }}
                    </span>
                  </div>
                  <div class="font-bold text-xs truncate">{{ ep.anime_title }}</div>
                  <div class="text-[10px] text-foreground/40 truncate italic">{{ ep.title || 'Untitled Episode' }}</div>
                </div>
              </div>
              <div v-else class="p-12 text-center text-foreground/20 italic text-sm">
                No recent uploads.
              </div>
            </div>
          </div>
        </div>

        <!-- Welcome Banner (Flat Design) -->
        <div class="studio-card p-10 rounded-[2.5rem] border border-primary/20 relative overflow-hidden bg-primary/5">
          <div class="relative z-10 space-y-4 max-w-2xl">
            <h2 class="text-3xl font-black tracking-tight">Studio Insights</h2>
            <p class="text-foreground/60 leading-relaxed text-sm">
              Your anime streaming platform is growing. Keep adding high-quality content and engaging with your audience to build the ultimate anime destination.
            </p>
            <div class="flex gap-4 pt-4">
              <UButton label="Explore Anime" color="primary" variant="subtle" size="md" to="/studio/anime" class="font-black" />
              <UButton label="Genre Setup" color="neutral" variant="ghost" size="md" to="/studio/genres" class="font-black" />
            </div>
          </div>
          <UIcon name="i-lucide-activity" class="absolute -right-10 -bottom-10 size-64 text-primary/10 rotate-12" />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
