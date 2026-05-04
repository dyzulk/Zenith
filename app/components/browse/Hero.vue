<script setup lang="ts">
import { Search } from 'lucide-vue-next'

const searchQuery = defineModel<string>('searchQuery')
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-reveal-up">
    <div class="space-y-4">
      <div class="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
        <Search class="w-4 h-4" />
        Universal Discovery
      </div>
      <h1 class="text-6xl font-black tracking-tighter uppercase">Browse <span class="text-primary italic">Library</span></h1>
    </div>

    <div class="relative flex-1 max-w-xl group">
      <Search class="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Search anime title, studio, or tags..." 
        class="w-full bg-surface-gox border border-border-gox rounded-2xl py-5 pl-16 pr-6 text-sm focus:outline-none focus:border-primary transition-all shadow-xl"
      />
    </div>
  </div>
</template>
