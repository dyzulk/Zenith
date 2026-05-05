<script setup lang="ts">
defineProps<{
  currentTime: number
  duration: number
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
  <div class="relative group/progress cursor-pointer">
    <input 
      type="range"
      :min="0"
      :max="duration"
      :value="currentTime"
      class="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer z-10"
      @input="handleSeek"
    />
    <div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
      <div 
        class="h-full bg-[#FF3D00] relative transition-[width] duration-150"
        :style="{ width: `${(currentTime / duration) * 100}%` }"
      >
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xl opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
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
