<script setup lang="ts">
const { user, fetchUser } = useAuth()

onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
})

watch(user, () => {
  if (user.value) {
    navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-6">
    <div class="text-center space-y-4">
      <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="text-foreground/50 font-medium">Completing authentication...</p>
    </div>
  </div>
</template>
