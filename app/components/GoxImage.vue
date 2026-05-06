<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
  class?: string
  imageClass?: string
}>()

const isLoaded = ref(false)
const imageRef = ref(null)

const onImageLoad = () => {
  if (isLoaded.value) return
  isLoaded.value = true
}

onMounted(() => {
  if (imageRef.value && (imageRef.value as HTMLImageElement).complete) {
    onImageLoad()
  }
})
</script>

<template>
  <div 
    :class="[
      'relative overflow-hidden bg-surface-gox',
      props.class
    ]"
  >
    <!-- Skeleton Loading (Shimmer) -->
    <GoxSkeleton 
      v-if="!isLoaded" 
      class="absolute inset-0 z-10" 
    />

    <!-- Image (Tanpa Animasi/Parallax) -->
    <img 
      ref="imageRef"
      :src="src" 
      :alt="alt" 
      loading="lazy"
      :class="[
        'w-full h-full object-cover transition-opacity duration-300',
        !isLoaded ? 'opacity-0' : 'opacity-100',
        props.imageClass
      ]"
      @load="onImageLoad"
    />
  </div>
</template>

<style scoped>
/* Animasi skeleton ditangani di komponen GoxSkeleton */
</style>
