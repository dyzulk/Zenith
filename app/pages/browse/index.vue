<script setup lang="ts">
const searchQuery = ref('')
</script>

<template>
  <div class="is-zenith min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6 space-y-12">
      <BrowseHero v-model:searchQuery="searchQuery" />
      <BrowseContent :searchQuery="searchQuery" />
    </div>
  </div>
</template>
