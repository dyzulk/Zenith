<script setup lang="ts">
definePageMeta({
  layout: 'studio-settings',
  middleware: 'auth'
})

const { data: settingsData, refresh } = await useFetch<any>('/api/studio/settings')

const settings = computed(() => settingsData.value?.settings || {})
</script>

<template>
  <div class="space-y-12">
    <StudioSettingsAppearanceForm 
      :initial-data="settings" 
      @save="refresh" 
    />
  </div>
</template>
