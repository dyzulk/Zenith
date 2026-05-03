<script setup lang="ts">
definePageMeta({
  layout: 'studio-settings',
  middleware: 'studio-auth'
})

const { data: userProfile, refresh } = await useFetch<any>("/api/auth/me")
</script>

<template>
  <StudioSettingsProfileForm 
    :user="userProfile?.user" 
    @refresh="refresh" 
  />
</template>