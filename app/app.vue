<script setup lang="ts">
const { fetchUser } = useAuth()

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
