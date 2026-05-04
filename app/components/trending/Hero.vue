<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-4 animate-reveal-up text-center max-w-2xl mx-auto">
    <div class="flex items-center justify-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
      <TrendingUp class="w-4 h-4" />
      Real-time Analytics
    </div>
    <h1 class="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">Trending <span class="text-primary italic">Global</span></h1>
    <p class="text-muted font-medium italic">What the GoxStream community is watching right now across the globe.</p>
  </div>
</template>
