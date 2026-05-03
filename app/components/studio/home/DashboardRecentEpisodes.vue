<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'

defineProps<{
  episodes: any[]
}>()
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between px-1">
      <h3 class="text-[10px] font-black uppercase tracking-widest text-muted">Upload Terakhir</h3>
    </div>
    
    <div class="bg-elevated/50 rounded-2xl overflow-hidden border border-default">
      <div v-if="episodes?.length" class="divide-y divide-default">
        <div 
          v-for="ep in episodes" 
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
</template>
