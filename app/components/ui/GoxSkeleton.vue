<script setup lang="ts">
import { gsap } from 'gsap'

const props = defineProps<{
  class?: string
}>()

const skeletonRef = ref(null)
const shimmerRef = ref(null)

useGsap(() => {
  if (shimmerRef.value) {
    gsap.to(shimmerRef.value, {
      x: '150%',
      duration: 1.5,
      repeat: -1,
      ease: 'power2.inOut',
      delay: Math.random() * 0.5 // Variasi agar tidak seragam jika banyak skeleton
    })
  }
})
</script>

<template>
  <div 
    ref="skeletonRef"
    :class="[
      'relative overflow-hidden bg-white/5 rounded-md',
      props.class
    ]"
  >
    <!-- Shimmer Effect -->
    <div 
      ref="shimmerRef"
      class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
    ></div>
  </div>
</template>
