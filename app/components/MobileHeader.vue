<script setup lang="ts">
import { Bell, Play } from 'lucide-vue-next'
const { getAvatar } = useZenithImage()

const { user } = useAuth()
</script>

<template>
  <header class="md:hidden fixed top-0 left-0 right-0 z-[900] px-6 py-4 flex items-center justify-between transition-all bg-gradient-to-b from-background to-transparent">
    <NuxtLink to="/" class="flex items-center gap-2 group">
      <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
        <Play class="text-white fill-white w-4 h-4" />
      </div>
      <span class="text-lg font-bold tracking-tighter">
        Ani<span class="text-primary">Zenith</span>
      </span>
    </NuxtLink>

    <div class="flex items-center gap-4">
      <button class="p-2 hover:bg-surface-zenith rounded-full transition-colors relative">
        <Bell class="w-5 h-5 text-muted hover:text-foreground" />
        <span class="absolute top-2 right-2 w-1.5 h-1.5 bg-accent rounded-full border-2 border-background"></span>
      </button>
      
      <NuxtLink v-if="user" to="/user/profile" class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center border border-border-zenith overflow-hidden">
        <img :src="getAvatar(user)" class="w-full h-full object-cover" />
      </NuxtLink>
    </div>
  </header>
</template>
