<script setup lang="ts">
import { Search, Bell, User, Play } from 'lucide-vue-next'

const { user, logout } = useAuth()
const isScrolled = ref(false)

if (process.client) {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
}
</script>

<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500"
    :class="[isScrolled ? 'glass-panel py-3 mx-4 mt-4 rounded-2xl' : 'bg-transparent py-6']"
  >
    <div class="container mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/30">
          <Play class="text-white fill-white w-6 h-6" />
        </div>
        <span class="text-2xl font-bold tracking-tighter">
          Ani<span class="text-primary">Zenith</span>
        </span>
      </NuxtLink>

      <!-- Nav Links -->
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/70">
        <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
        <NuxtLink to="/anime" class="hover:text-primary transition-colors">Browse</NuxtLink>
        <NuxtLink to="/schedule" class="hover:text-primary transition-colors">Schedule</NuxtLink>
        <NuxtLink to="/trending" class="hover:text-primary transition-colors">Trending</NuxtLink>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <button class="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Search class="w-5 h-5" />
        </button>
        <button class="p-2 hover:bg-white/10 rounded-full transition-colors relative">
          <Bell class="w-5 h-5" />
          <span class="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
        </button>
        
        <div class="flex items-center gap-4 pl-2 border-l border-white/10 ml-2">
          <template v-if="!user">
            <NuxtLink to="/auth/login" class="flex items-center gap-2">
              <div class="w-8 h-8 bg-secondary rounded-full flex items-center justify-center border border-white/10 overflow-hidden">
                <User class="w-4 h-4 text-foreground/50" />
              </div>
              <span class="text-sm font-medium hidden sm:inline">Sign In</span>
            </NuxtLink>
          </template>
          <template v-else>
            <button @click="logout" class="text-xs font-bold text-foreground/40 hover:text-accent transition-colors uppercase tracking-widest">Logout</button>
            <NuxtLink to="/user/profile" class="w-8 h-8 bg-primary rounded-full flex items-center justify-center border border-white/10 overflow-hidden group">
              <img v-if="user.avatar_url" :src="user.avatar_url" class="w-full h-full object-cover" />
              <User v-else class="w-4 h-4 text-white" />
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  color: var(--ui-primary);
}
</style>
