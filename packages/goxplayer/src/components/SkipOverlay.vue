<script setup lang="ts">
import { RotateCcw, RotateCw } from 'lucide-vue-next'

defineProps<{
  type: 'forward' | 'backward' | null
}>()
</script>

<template>
  <div v-if="type" class="absolute inset-0 z-40 flex pointer-events-none">
    <div class="flex-1 flex items-center justify-center bg-white/5 transition-opacity duration-300" :class="type === 'backward' ? 'opacity-100' : 'opacity-0'">
      <div class="flex flex-col items-center gap-2">
        <RotateCcw class="w-12 h-12 text-white animate-bounce" />
        <span class="font-black text-xl text-white">-10s</span>
      </div>
    </div>
    <div class="flex-1 flex items-center justify-center bg-white/5 transition-opacity duration-300" :class="type === 'forward' ? 'opacity-100' : 'opacity-0'">
      <div class="flex flex-col items-center gap-2">
        <RotateCw class="w-12 h-12 text-white animate-bounce" />
        <span class="font-black text-xl text-white">+10s</span>
      </div>
    </div>
  </div>
</template>
