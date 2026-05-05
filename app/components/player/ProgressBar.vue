<script setup lang="ts">
defineProps<{
  currentTime: number
  duration: number
  buffered?: number
}>()

const emit = defineEmits<{
  (e: 'seek', time: number): void
}>()

const handleSeek = (e: Event) => {
  const val = (e.target as HTMLInputElement).valueAsNumber
  emit('seek', val)
}
</script>

<template>
  <div class="relative group/progress cursor-pointer h-6 flex items-center">
    <input 
      type="range"
      :min="0"
      :max="duration"
      step="any"
      :value="currentTime"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
      @input="handleSeek"
    />
    <div class="h-1.5 w-full bg-white/10 rounded-full relative overflow-hidden">
      <!-- Buffered Bar -->
      <div 
        class="absolute left-0 top-0 h-full bg-white/20 transition-[width] duration-300"
        :style="{ width: `${buffered || 0}%` }"
      ></div>
      
      <!-- Progress Bar -->
      <div 
        class="h-full bg-[#FF3D00] relative z-10 transition-[width] duration-150"
        :style="{ width: `${(currentTime / duration) * 100}%` }"
      >
        <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-xl opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="range"] {
  appearance: none;
  background: transparent;
}
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
}
</style>
