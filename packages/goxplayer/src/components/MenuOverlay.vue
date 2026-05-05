<script setup lang="ts">
import { Check } from 'lucide-vue-next'

defineProps<{
  show: boolean
  options: { label: string, value: any }[]
  selectedValue: any
  width?: string
}>()

const emit = defineEmits<{
  (e: 'select', value: any): void
}>()
</script>

<template>
  <transition 
    enter-active-class="transition duration-200"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div 
      v-if="show" 
      class="absolute bottom-full right-0 mb-4 bg-zinc-900/90 backdrop-blur-2xl border border-white/5 rounded-2xl p-1 shadow-2xl overflow-hidden z-[60]"
      :style="{ width: width || '10rem' }"
    >
      <button 
        v-for="opt in options" 
        :key="opt.label"
        @click="emit('select', opt.value)"
        class="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all"
        :class="selectedValue === opt.value ? 'bg-[#FF3D00] text-white' : 'hover:bg-white/5 text-white/50 hover:text-white'"
      >
        <span class="text-xs font-black uppercase">{{ opt.label }}</span>
        <Check v-if="selectedValue === opt.value" class="w-3 h-3" />
      </button>
    </div>
  </transition>
</template>
