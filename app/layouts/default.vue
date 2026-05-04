<template>
  <div class="min-h-screen bg-background text-foreground selection:bg-primary/30">
    <Navbar v-if="!isWatchPage" />
    <MobileHeader v-if="!isWatchPage" />
    <MobileNav v-if="!isWatchPage" />
    <main :class="[!isWatchPage ? 'pb-24 md:pb-0' : '']">
      <slot />
    </main>
    <footer class="py-20 border-t border-white/5 mt-20 hidden md:block">
      <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Play class="text-white fill-white w-4 h-4" />
            </div>
            <span class="text-xl font-bold tracking-tighter">
              Ani<span class="text-primary">Gox</span>
            </span>
          </div>
          <p class="text-foreground/50 max-w-sm">
            The ultimate destination for anime fans. Stream your favorite series in high quality with a modern, fast experience.
          </p>
        </div>
        <div>
          <h4 class="font-bold mb-6">Platform</h4>
          <ul class="space-y-4 text-foreground/50 text-sm">
            <li><NuxtLink to="/anime" class="hover:text-primary transition-colors">Browse Anime</NuxtLink></li>
            <li><NuxtLink to="/schedule" class="hover:text-primary transition-colors">Release Schedule</NuxtLink></li>
            <li><NuxtLink to="/trending" class="hover:text-primary transition-colors">Trending Now</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-6">Legal</h4>
          <ul class="space-y-4 text-foreground/50 text-sm">
            <li><a href="#" class="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">DMCA</a></li>
          </ul>
        </div>
      </div>
      <div class="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-xs text-foreground/30">
        © 2026 GoxStream. Built with Nuxt and Cloudflare.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Play } from 'lucide-vue-next'

const route = useRoute()
const isWatchPage = computed(() => route.path.includes('/episode/'))
</script>
