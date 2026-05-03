<script setup lang="ts">
const { data: userProfile, refresh } = await useFetch<any>('/api/auth/me')
</script>

<template>
  <StudioSettingsProfileForm 
    :user="userProfile?.user" 
    @refresh="refresh" 
  />
</template>
