<script setup lang="ts">
const { fetchUser } = useAuth()
const route = useRoute()
const appConfig = useAppConfig()

useAppSeo()

// Detect if we are in studio section
const isStudio = computed(() => route.path.startsWith('/studio'))

useAppAppearance()

onMounted(() => {
  fetchUser()
})

// Apply .is-gox class to body only for landing pages
useHead({
  bodyAttrs: {
    class: computed(() => isStudio.value ? 'is-studio' : 'is-gox')
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
