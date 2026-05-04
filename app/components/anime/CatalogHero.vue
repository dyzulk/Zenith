<script setup lang="ts">
import { Library, LayoutGrid } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-4 animate-reveal-up">
    <div class="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
      <Library class="w-4 h-4" />
      Gox Collection
    </div>
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <h1 class="text-6xl font-black tracking-tighter uppercase">Anime <span class="text-primary">Catalog</span></h1>
      <NuxtLink to="/browse" class="btn-premium px-8 py-4 text-[10px] group">
        <LayoutGrid class="w-4 h-4" />
        Explore Library
      </NuxtLink>
    </div>
  </div>
</template>
