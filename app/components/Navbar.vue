<script setup lang="ts">
import { Search, Bell, User, Play, Sun, Moon } from 'lucide-vue-next'
const { getAvatar } = useZenithImage()

const { user, logout } = useAuth()
const colorMode = useColorMode()
const isScrolled = ref(false)
const searchQuery = ref('')

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const handleSearch = () => {
  if (searchQuery.value.trim().length < 2) return
  navigateTo({
    path: '/browse',
    query: { q: searchQuery.value.trim() }
  })
}

if (process.client) {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
}
</script>

<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 hidden md:block"
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
        <!-- Search Input -->
        <div class="relative flex items-center group">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search anime..." 
            class="bg-surface-zenith border border-border-zenith rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-surface-zenith transition-all w-32 focus:w-64"
            @keyup.enter="handleSearch"
          />
          <Search class="w-4 h-4 absolute left-3.5 text-muted group-focus-within:text-primary transition-colors" />
        </div>

        <ClientOnly>
          <button 
            class="p-2 hover:bg-surface-zenith rounded-full transition-colors text-muted hover:text-foreground"
            @click="isDark = !isDark"
          >
            <component :is="isDark ? Moon : Sun" class="w-5 h-5" />
          </button>
        </ClientOnly>

        <button class="p-2 hover:bg-surface-zenith rounded-full transition-colors relative">
          <Bell class="w-5 h-5 text-muted hover:text-foreground" />
          <span class="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
        </button>
        
        <div class="flex items-center gap-4 pl-2 border-l border-border-zenith ml-2">
          <template v-if="!user">
            <NuxtLink to="/auth/login" class="flex items-center gap-2">
              <div class="w-8 h-8 bg-surface-zenith rounded-full flex items-center justify-center border border-border-zenith overflow-hidden">
                <User class="w-4 h-4 text-muted" />
              </div>
              <span class="text-sm font-medium hidden sm:inline">Sign In</span>
            </NuxtLink>
          </template>
          <template v-else>
            <div class="flex items-center gap-3">
              <NuxtLink v-if="user.role === 'admin' || user.role === 'superadmin'" to="/studio" class="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20 hover:bg-primary/20 transition-all">Studio</NuxtLink>
              <button @click="logout" class="text-xs font-bold text-muted hover:text-accent transition-colors uppercase tracking-widest">Logout</button>
              <NuxtLink to="/user/profile" class="w-8 h-8 bg-primary rounded-full flex items-center justify-center border border-border-zenith overflow-hidden group">
                <img :src="getAvatar(user)" class="w-full h-full object-cover" />
              </NuxtLink>
            </div>
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
