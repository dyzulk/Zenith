<script setup lang="ts">
import { gsap } from 'gsap'

const props = defineProps<{
  src: string
  alt: string
  class?: string
  imageClass?: string
  parallax?: boolean
}>()

const isLoaded = ref(false)
const containerRef = ref(null)
const imageRef = ref(null)

const onImageLoad = () => {
  isLoaded.value = true
  
  // Animasi saat gambar berhasil dimuat
  gsap.fromTo(imageRef.value, 
    { opacity: 0, scale: 1.1, filter: 'blur(10px)' }, 
    { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }
  )
}

useGsap((ctx) => {
  if (props.parallax && containerRef.value) {
    // Efek Parallax menggunakan ScrollTrigger
    gsap.to(imageRef.value, {
      y: '15%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  }

  // Animasi reveal saat pertama kali masuk viewport (selain parallax)
  gsap.from(containerRef.value, {
    y: 20,
    opacity: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: containerRef.value,
      start: 'top 95%',
      toggleActions: 'play none none reverse'
    }
  })
})
</script>

<template>
  <div 
    ref="containerRef"
    :class="[
      'relative overflow-hidden bg-surface-gox',
      props.class
    ]"
  >
    <!-- Skeleton Loading -->
    <GoxSkeleton 
      v-if="!isLoaded" 
      class="absolute inset-0 z-10" 
    />

    <!-- Image -->
    <img 
      ref="imageRef"
      :src="src" 
      :alt="alt" 
      loading="lazy"
      :class="[
        'w-full h-full object-cover will-change-transform',
        !isLoaded ? 'opacity-0' : '',
        props.imageClass
      ]"
      @load="onImageLoad"
    />
  </div>
</template>
