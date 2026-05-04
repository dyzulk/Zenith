<script setup lang="ts">
import { Calendar } from 'lucide-vue-next'

const props = defineProps<{
  days: string[]
}>()

const activeDay = defineModel<string>('activeDay')
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-reveal-up">
    <div class="space-y-4">
      <div class="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
        <Calendar class="w-4 h-4" />
        Transmission Schedule
      </div>
      <h1 class="text-6xl font-black tracking-tighter uppercase">Weekly <span class="text-primary italic">Releases</span></h1>
    </div>
    <div class="flex items-center gap-2 p-1 bg-surface-gox rounded-2xl border border-border-gox">
       <button 
         v-for="day in days" 
         :key="day"
         @click="activeDay = day"
         class="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all"
         :class="activeDay === day ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted hover:text-foreground'"
       >
         {{ day.slice(0, 3) }}
       </button>
    </div>
  </div>
</template>
