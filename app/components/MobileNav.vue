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
    <div class="glass-panel py-3 px-6 rounded-full border border-border-zenith flex items-center justify-between gap-2 relative overflow-hidden">
      <!-- Background Ambient Glow (Syncs with Primary) -->
      <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-primary/10 blur-2xl rounded-full"></div>

      <NuxtLink 
        v-for="item in navItems" 
        :key="item.to" 
        :to="item.to"
        class="relative flex flex-col items-center group"
      >
        <div 
          class="p-2.5 rounded-2xl transition-all duration-300 relative z-10"
          :class="[
            isActive(item.to) 
              ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' 
              : 'text-foreground/40 dark:text-foreground/30 group-hover:text-primary group-hover:bg-surface-zenith/50'
          ]"
        >
          <component :is="item.icon" class="w-6 h-6 transition-transform" />
          
          <!-- Active Indicator Dot -->
          <div 
            v-if="isActive(item.to)" 
            class="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border-2 border-primary shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          ></div>
        </div>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
/* Scoped styles removed to use global Zenith design system (main.css) */
</style>
