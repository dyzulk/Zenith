<script setup lang="ts">
const { fetchUser } = useAuth()
const route = useRoute()
const appConfig = useAppConfig()

// Detect if we are in studio section
const isStudio = computed(() => route.path.startsWith('/studio'))

const applySiteSettings = async () => {
  try {
    const data: any = await $fetch('/api/studio/settings')
    if (data.settings) {
      if (data.settings.ui_primary) appConfig.ui.colors.primary = data.settings.ui_primary
      if (data.settings.ui_neutral) appConfig.ui.colors.neutral = data.settings.ui_neutral
    }
  } catch (e) {
    console.warn('[Theme] Using default visual configuration.')
  }
}

onMounted(() => {
  fetchUser()
  applySiteSettings()
})

// Apply .is-zenith class to body only for landing pages
useHead({
  bodyAttrs: {
    class: computed(() => isStudio.value ? 'is-studio' : 'is-zenith')
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
