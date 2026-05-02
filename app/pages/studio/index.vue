<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'

definePageMeta({
  layout: 'studio',
  middleware: 'studio-auth'
})

const { isNotificationsSlideoverOpen } = useDashboard()

// Fetch real stats from D1
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

const statCards = computed(() => [
  { label: 'Total Anime', value: stats.value?.animeCount || 0, icon: 'i-lucide-clapperboard', color: 'primary' },
  { label: 'Total Episode', value: stats.value?.episodeCount || 0, icon: 'i-lucide-play', color: 'success' },
  { label: 'Total Genre', value: stats.value?.genreCount || 0, icon: 'i-lucide-tags', color: 'warning' },
  { label: 'Total User', value: stats.value?.userCount || 0, icon: 'i-lucide-users', color: 'info' }
])
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
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div 
            v-for="card in statCards" 
            :key="card.label"
            class="bg-elevated/50 p-6 rounded-2xl border border-default flex flex-col gap-2"
          >
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-black uppercase tracking-widest text-muted">{{ card.label }}</span>
              <UIcon :name="card.icon" class="size-5 text-primary/50" />
            </div>
            <div class="text-3xl font-black tracking-tight text-foreground">{{ card.value }}</div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Recent Anime -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center justify-between px-1">
              <h3 class="text-[10px] font-black uppercase tracking-widest text-muted">Anime Terbaru</h3>
              <UButton label="Lihat Semua" variant="ghost" size="xs" to="/studio/anime" class="font-bold" />
            </div>
            
            <div class="bg-elevated/50 rounded-2xl overflow-hidden border border-default">
              <div v-if="stats?.recentAnime?.length" class="divide-y divide-default">
                <NuxtLink 
                  v-for="anime in stats.recentAnime" 
                  :key="anime.id"
                  :to="`/studio/anime/${anime.id}`"
                  class="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors group"
                >
                  <div class="size-12 rounded-xl overflow-hidden flex-shrink-0 bg-muted border border-default">
                    <img v-if="anime.poster_key" :src="anime.poster_key.startsWith('http') ? anime.poster_key : `/api/r2/${anime.poster_key}`" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-muted">
                      <UIcon name="i-lucide-image" class="size-5" />
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="font-bold text-sm group-hover:text-primary transition-colors truncate">{{ anime.title }}</div>
                    <div class="text-[10px] text-muted uppercase tracking-wider font-bold">{{ anime.slug }}</div>
                  </div>
                  <div class="text-[10px] font-bold text-muted whitespace-nowrap">
                    {{ formatDistanceToNow(new Date(anime.created_at), { addSuffix: true }) }}
                  </div>
                </NuxtLink>
              </div>
              <div v-else class="p-12 text-center text-muted italic text-sm">
                Belum ada data anime.
              </div>
            </div>
          </div>

          <!-- Recent Episodes -->
          <div class="space-y-4">
            <div class="flex items-center justify-between px-1">
              <h3 class="text-[10px] font-black uppercase tracking-widest text-muted">Upload Terakhir</h3>
            </div>
            
            <div class="bg-elevated/50 rounded-2xl overflow-hidden border border-default">
              <div v-if="stats?.recentEpisodes?.length" class="divide-y divide-default">
                <div 
                  v-for="ep in stats.recentEpisodes" 
                  :key="ep.id"
                  class="p-4 space-y-1"
                >
                  <div class="flex items-center justify-between">
                    <UBadge :label="`EP ${ep.episode_number}`" size="xs" variant="subtle" color="primary" class="font-bold" />
                    <span class="text-[10px] font-bold text-muted">
                      {{ formatDistanceToNow(new Date(ep.created_at), { addSuffix: true }) }}
                    </span>
                  </div>
                  <div class="font-bold text-xs truncate">{{ ep.anime_title }}</div>
                  <div class="text-[10px] text-muted truncate italic">{{ ep.title || 'Tanpa Judul' }}</div>
                </div>
              </div>
              <div v-else class="p-12 text-center text-muted italic text-sm">
                Belum ada episode baru.
              </div>
            </div>
          </div>
        </div>

        <!-- Banner -->
        <div class="bg-primary/5 p-8 lg:p-12 rounded-[2rem] border border-primary/10 relative overflow-hidden">
          <div class="relative z-10 space-y-4 max-w-xl">
            <h2 class="text-3xl font-black tracking-tight text-foreground">Studio Insights</h2>
            <p class="text-muted leading-relaxed text-sm">
              Platform streaming anime Anda terus berkembang. Terus tambahkan konten berkualitas tinggi dan pantau statistik Anda untuk membangun destinasi anime terbaik.
            </p>
            <div class="flex gap-4 pt-4">
              <UButton label="Eksplor Anime" color="primary" size="md" to="/studio/anime" class="font-bold" />
              <UButton label="Kelola Genre" color="neutral" variant="ghost" size="md" to="/studio/genres" class="font-bold" />
            </div>
          </div>
          <UIcon name="i-lucide-activity" class="absolute -right-8 -bottom-8 size-48 text-primary/5 rotate-12" />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
