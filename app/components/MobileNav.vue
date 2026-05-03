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
    <div class="glass-panel py-3 px-6 rounded-full border border-border-zenith shadow-2xl flex items-center justify-between gap-2 relative overflow-hidden">
      <!-- Background Ambient Glow (Syncs with Primary) -->
      <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-primary/10 blur-2xl rounded-full"></div>

      <NuxtLink 
        v-for="item in navItems" 
        :key="item.to" 
        :to="item.to"
        class="relative flex flex-col items-center gap-1 group py-1"
      >
        <div 
          class="p-2.5 rounded-2xl transition-all duration-300 relative z-10"
          :class="[
            isActive(item.to) 
              ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' 
              : 'text-foreground/40 dark:text-foreground/30 group-hover:text-primary'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5 transition-transform group-hover:scale-110" />
          
          <!-- Active Indicator Dot -->
          <div 
            v-if="isActive(item.to)" 
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          ></div>
        </div>
        <span 
          class="text-[9px] font-black uppercase tracking-tighter transition-all duration-300"
          :class="isActive(item.to) ? 'text-primary opacity-100' : 'text-foreground/30 opacity-0 group-hover:opacity-100'"
        >
          {{ item.label }}
        </span>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
/* Scoped styles removed to use global Zenith design system (main.css) */
</style>
