<script setup lang="ts">
const { fetchUser } = useAuth()
const route = useRoute()

// Detect if we are in studio section
const isStudio = computed(() => route.path.startsWith('/studio'))

onMounted(() => {
  fetchUser()
})

// Apply .is-zenith class to body only for landing pages
useHead({
  bodyAttrs: {
    class: computed(() => isStudio.value ? '' : 'is-zenith')
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
