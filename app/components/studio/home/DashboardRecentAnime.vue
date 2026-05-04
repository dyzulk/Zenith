<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'

defineProps<{
  anime: any[]
}>()

const { getPoster } = useGoxImage()
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between px-1">
      <h3 class="text-[10px] font-black uppercase tracking-widest text-muted">Anime Terbaru</h3>
      <UButton label="Lihat Semua" variant="ghost" size="xs" to="/studio/anime" class="font-bold" />
    </div>
    
    <div class="bg-elevated/50 rounded-2xl overflow-hidden border border-default">
      <div v-if="anime?.length" class="divide-y divide-default">
        <NuxtLink 
          v-for="item in anime" 
          :key="item.id"
          :to="`/studio/anime/${item.id}`"
          class="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors group"
        >
          <div class="size-12 rounded-xl overflow-hidden flex-shrink-0 bg-muted border border-default">
            <img :src="getPoster(item)" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-sm group-hover:text-primary transition-colors truncate">{{ item.title }}</div>
            <div class="text-[10px] text-muted uppercase tracking-wider font-bold">{{ item.slug }}</div>
          </div>
          <div class="text-[10px] font-bold text-muted whitespace-nowrap">
            {{ formatDistanceToNow(new Date(item.created_at), { addSuffix: true }) }}
          </div>
        </NuxtLink>
      </div>
      <div v-else class="p-12 text-center text-muted italic text-sm">
        Belum ada data anime.
      </div>
    </div>
  </div>
</template>
