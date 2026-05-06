<template>
  <NuxtLoadingIndicator color="#00DC82" :height="2" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { fetchUser } = useAuth()
const route = useRoute()
const { isLoading } = useLoadingIndicator()

// State manual untuk loading jika diperlukan
const isInitialLoading = ref(true)
const loading = computed(() => isLoading.value || isInitialLoading.value)

useAppSeo()

// Detect if we are in studio section
const isStudio = computed(() => route.path.startsWith('/studio'))

useAppAppearance()

onMounted(() => {
  fetchUser()
  
  // Matikan initial loading setelah komponen utama mount
  setTimeout(() => {
    isInitialLoading.value = false
  }, 1000)
})

// Apply .is-gox class to body only for landing pages
useHead({
  bodyAttrs: {
    class: computed(() => isStudio.value ? 'is-studio' : 'is-gox')
  }
})
</script>
