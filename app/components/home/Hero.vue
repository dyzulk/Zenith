<script setup lang="ts">
import { Play, Plus, Star } from 'lucide-vue-next'
const { getBanner } = useGoxImage()

const { data: trendingAnime } = await useFetch('/api/anime/trending')

const currentIndex = ref(0)
const items = computed(() => trendingAnime.value || [])

let timer: any = null
onMounted(() => {
  timer = setInterval(() => {
    if (items.value.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % items.value.length
    }
  }, 8000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const getTitleClass = (title: string) => {
  const len = title.length
  if (len > 40) return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
  if (len > 25) return 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
  if (len > 15) return 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
  return 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
}
</script>

<template>
  <section class="relative h-[70vh] sm:h-[80vh] min-h-[520px] max-h-[800px] flex items-center overflow-hidden bg-background">
    <!-- Slider Container -->
    <div v-if="trendingAnime && trendingAnime.length" class="absolute inset-0 z-0">
      <TransitionGroup name="fade-scale">
        <div 
          v-for="(anime, index) in trendingAnime" 
          v-show="currentIndex === index"
          :key="anime.id"
          class="absolute inset-0"
        >
          <!-- Background Image -->
          <div class="absolute inset-0 overflow-hidden">
            <img 
              :src="getBanner(anime)" 
              :alt="anime.title" 
              class="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
            <!-- Overlays for Depth and Readability -->
            <div class="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div class="absolute inset-0 bg-black/40"></div>
          </div>

          <!-- Hero Content -->
          <div class="container mx-auto px-6 h-full flex flex-col justify-center relative z-10 pt-12 md:pt-0">
            <div class="max-w-3xl space-y-4 md:space-y-6 animate-reveal-up pb-20 md:pb-0">
              <div class="flex items-center gap-3 text-primary font-black tracking-[0.3em] text-[8px] md:text-[10px] uppercase">
                <span class="w-8 md:w-12 h-[1px] bg-primary/50"></span>
                Must Watch Today
                <span class="w-8 md:w-12 h-[1px] bg-primary/50"></span>
              </div>
              
              <div class="space-y-2 md:space-y-4">
                <h1 
                  class="font-black tracking-tighter leading-[0.95] uppercase transition-all duration-500"
                  :class="getTitleClass(anime.title)"
                >
                  {{ anime.title }}
                </h1>
                <div class="flex flex-wrap items-center gap-3 md:gap-4 text-[9px] md:text-xs font-bold uppercase tracking-widest text-foreground/80">
                  <span class="flex items-center gap-1 text-primary">
                    <Star class="w-3.5 h-3.5 md:w-4 md:h-4 fill-primary" />
                    {{ anime.score }}
                  </span>
                  <span class="w-1 h-1 rounded-full bg-foreground/20"></span>
                  <span>{{ anime.year }}</span>
                  <span class="w-1 h-1 rounded-full bg-foreground/20"></span>
                  <span class="px-2 py-0.5 bg-foreground/10 rounded text-[8px] md:text-[9px]">{{ anime.type }}</span>
                </div>
              </div>
              
              <p class="text-[10px] md:text-sm lg:text-base text-foreground/60 leading-relaxed line-clamp-2 md:line-clamp-3 font-medium max-w-xl">
                {{ anime.synopsis || 'Experience the next level of anime streaming with GoxStream. High quality, zero buffering, and the latest releases.' }}
              </p>
              
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 pt-2 md:pt-4">
                <NuxtLink :to="`/anime/${anime.slug}/episode/1`" class="btn-premium px-8 md:px-10 py-3 md:py-4 text-xs md:text-sm group flex-1 sm:flex-none">
                  <Play class="w-4 h-4 md:w-5 md:h-5 fill-current group-hover:scale-125 transition-transform" />
                  Start Watching
                </NuxtLink>
                <div class="flex items-center gap-3 flex-1 sm:flex-none">
                  <NuxtLink :to="`/anime/${anime.slug}`" class="flex-1 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest border border-border-gox hover:bg-surface-gox transition-all backdrop-blur-md flex items-center justify-center gap-2">
                    Details
                  </NuxtLink>
                  <button class="p-3 md:p-4 rounded-2xl border border-border-gox hover:bg-surface-gox transition-all backdrop-blur-md text-foreground/60 hover:text-primary shrink-0">
                    <Plus class="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Slider Navigation Dots -->
      <div class="absolute bottom-16 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
        <button 
          v-for="(_, index) in trendingAnime" 
          :key="index"
          @click="currentIndex = index"
          class="h-1 md:h-1.5 transition-all duration-500 rounded-full"
          :class="currentIndex === index ? 'w-8 md:w-12 bg-primary' : 'w-2 md:w-3 bg-white/20 hover:bg-white/40'"
        ></button>
      </div>
    </div>

    <!-- Loading Placeholder -->
    <div v-else class="absolute inset-0 bg-surface-gox animate-pulse flex items-center justify-center">
      <div class="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  </section>
</template>
