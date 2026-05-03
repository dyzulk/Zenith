<script setup lang="ts">
import { Home, Search, Bookmark, User, Compass } from 'lucide-vue-next'

const { user } = useAuth()
const route = useRoute()

const navItems = [
  { label: 'Home', icon: Home, to: '/' },
  { label: 'Browse', icon: Compass, to: '/anime' },
  { label: 'Search', icon: Search, to: '/browse' },
  { label: 'My List', icon: Bookmark, to: '/user/watchlist' },
  { label: 'Profile', icon: User, to: '/user/profile' }
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <nav class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] md:hidden w-[90%] max-w-md">
    <div class="glass-panel py-3 px-6 rounded-full border border-border-zenith shadow-xl flex items-center justify-between gap-2 relative overflow-hidden">
      <!-- Background Ambient Glow -->
      <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-primary/20 blur-2xl rounded-full"></div>

      <NuxtLink 
        v-for="item in navItems" 
        :key="item.to" 
        :to="item.to"
        class="relative flex flex-col items-center gap-1 group py-1"
      >
        <div 
          class="p-2 rounded-xl transition-all duration-300 relative z-10"
          :class="[
            isActive(item.to) 
              ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/40' 
              : 'text-muted group-hover:text-foreground'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5" />
          
          <!-- Active Indicator Dot -->
          <div 
            v-if="isActive(item.to)" 
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"
          ></div>
        </div>
        <span 
          class="text-[9px] font-black uppercase tracking-tighter transition-all duration-300"
          :class="isActive(item.to) ? 'text-primary opacity-100' : 'text-muted/50 opacity-0 group-hover:opacity-100'"
        >
          {{ item.label }}
        </span>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.glass-panel {
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style>
