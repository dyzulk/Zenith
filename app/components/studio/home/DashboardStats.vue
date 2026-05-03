<script setup lang="ts">
const props = defineProps<{
  stats: any
}>()

const statCards = computed(() => [
  { label: 'Total Anime', value: props.stats?.animeCount || 0, icon: 'i-lucide-clapperboard', color: 'primary' },
  { label: 'Total Episode', value: props.stats?.episodeCount || 0, icon: 'i-lucide-play', color: 'success' },
  { label: 'Total Genre', value: props.stats?.genreCount || 0, icon: 'i-lucide-tags', color: 'warning' },
  { label: 'Total User', value: props.stats?.userCount || 0, icon: 'i-lucide-users', color: 'info' }
])
</script>

<template>
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
</template>
