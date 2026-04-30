<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (!user.value && !useRoute().path.startsWith('/auth')) {
    navigateTo('/auth/login')
  }
}, { immediate: true })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
