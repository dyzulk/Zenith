<script setup lang="ts">
import { gsap } from 'gsap'

const props = defineProps<{
  loading?: boolean
}>()

const loaderRef = ref(null)
const progressRef = ref(null)
const textRef = ref(null)

const { gsap: g } = useGsap((ctx) => {
  if (props.loading) {
    // Animasi masuk
    gsap.fromTo(loaderRef.value, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    
    // Animasi progress bar berulang (indeterminant)
    gsap.to(progressRef.value, {
      x: '100%',
      duration: 1.5,
      repeat: -1,
      ease: 'power1.inOut'
    })

    // Animasi teks berdenyut
    gsap.to(textRef.value, {
      opacity: 0.5,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }
})

// Gunakan watch untuk handle perubahan props loading
watch(() => props.loading, (val) => {
  if (!val && loaderRef.value) {
    gsap.to(loaderRef.value, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        // Logika tambahan jika diperlukan
      }
    })
  }
})
</script>

<template>
  <Transition>
    <div 
      v-if="loading" 
      ref="loaderRef"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/90 backdrop-blur-xl"
    >
      <!-- Premium Logo/Icon Animation -->
      <div class="relative w-24 h-24 mb-8">
        <div class="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-primary font-black text-2xl tracking-tighter italic">GOX</span>
        </div>
      </div>

      <!-- Loading Text -->
      <div ref="textRef" class="text-center space-y-2">
        <h3 class="text-lg font-black uppercase tracking-[0.3em] text-primary">Transmitting Data</h3>
        <p class="text-xs text-foreground/40 font-medium tracking-widest uppercase">Synchronizing with Edge Nodes</p>
      </div>

      <!-- Progress Bar Container -->
      <div class="mt-8 w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <div ref="progressRef" class="w-full h-full bg-primary -translate-x-full"></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
