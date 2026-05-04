<script setup lang="ts">
import { Bell, Play } from 'lucide-vue-next'
const { getAvatar } = useGoxImage()

const { user } = useAuth()
</script>

<template>
  <header class="md:hidden fixed top-0 left-0 right-0 z-[900] px-6 py-4 flex items-center justify-between transition-all bg-gradient-to-b from-background to-transparent">
    <NuxtLink to="/" class="flex items-center gap-2 group">
      <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
        <Play class="text-white fill-white w-4 h-4" />
      </div>
      <span class="text-lg font-bold tracking-tighter">
        Ani<span class="text-primary">GoxStream</span>
      </span>
    </NuxtLink>

    <div class="flex items-center gap-4">
      <button class="p-2 hover:bg-surface-gox rounded-xl transition-colors relative group">
        <Bell class="w-5 h-5 text-foreground/50 group-hover:text-primary transition-colors" />
        <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background shadow-[0_0_8px_rgba(var(--ui-primary-rgb),0.5)]"></span>
      </button>
      
      <NuxtLink v-if="user" to="/user/profile" class="w-9 h-9 rounded-xl border border-border-gox overflow-hidden shadow-lg shadow-black/5 ring-2 ring-primary/0 hover:ring-primary/40 transition-all">
        <img :src="getAvatar(user)" class="w-full h-full object-cover" />
      </NuxtLink>
    </div>
  </header>
</template>
