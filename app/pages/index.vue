<script setup lang="ts">
import { Play, Plus, Star, Clock, Flame, TrendingUp, History } from 'lucide-vue-next'
const { getPoster, getBanner, getThumbnail } = useZenithImage()

const { data: trendingAnime } = await useFetch('/api/anime/trending')
const { data: recentHistory } = await useFetch('/api/user/recent')

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
  <div class="is-zenith space-y-24 pb-24 overflow-x-hidden">
    <!-- Hero Section -->
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
                  {{ anime.synopsis || 'Experience the next level of anime streaming with ZenithStream. High quality, zero buffering, and the latest releases.' }}
                </p>
                
                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 pt-2 md:pt-4">
                  <NuxtLink :to="`/anime/${anime.slug}/episode/1`" class="btn-premium px-8 md:px-10 py-3 md:py-4 text-xs md:text-sm group flex-1 sm:flex-none">
                    <Play class="w-4 h-4 md:w-5 md:h-5 fill-current group-hover:scale-125 transition-transform" />
                    Start Watching
                  </NuxtLink>
                  <div class="flex items-center gap-3 flex-1 sm:flex-none">
                    <NuxtLink :to="`/anime/${anime.slug}`" class="flex-1 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest border border-border-zenith hover:bg-surface-zenith transition-all backdrop-blur-md flex items-center justify-center gap-2">
                      Details
                    </NuxtLink>
                    <button class="p-3 md:p-4 rounded-2xl border border-border-zenith hover:bg-surface-zenith transition-all backdrop-blur-md text-foreground/60 hover:text-primary shrink-0">
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
      <div v-else class="absolute inset-0 bg-surface-zenith animate-pulse flex items-center justify-center">
        <div class="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    </section>

    <!-- Continue Watching Section -->
    <section v-if="recentHistory?.recent?.length" class="container mx-auto px-6 animate-reveal-up" style="animation-delay: 0.2s">
      <div class="flex items-center gap-4 mb-10">
        <div class="w-12 h-12 rounded-2xl bg-surface-zenith border border-border-zenith flex items-center justify-center">
          <History class="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 class="text-3xl font-black tracking-tighter uppercase">Continue <span class="text-primary">Watching</span></h2>
          <p class="text-foreground/40 text-[10px] font-bold uppercase tracking-[0.2em]">Pick up where you left off</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <NuxtLink 
          v-for="item in recentHistory.recent" 
          :key="item.id"
          :to="`/anime/${item.slug}/episode/${item.episode_number}`"
          class="group glass-card p-4 rounded-3xl"
        >
          <div class="relative aspect-video rounded-2xl overflow-hidden bg-surface-zenith mb-4">
            <img 
              :src="getPoster(item)" 
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                <Play class="w-6 h-6 text-white fill-white" />
              </div>
            </div>
            
            <!-- Progress Bar Overlay -->
            <div class="absolute bottom-0 left-0 right-0 h-1.5 bg-foreground/10">
              <div 
                class="h-full bg-primary shadow-[0_0_15px_rgba(var(--ui-primary-rgb),0.5)]" 
                :style="{ width: `${item.completed ? 100 : (item.progress / 1440) * 100}%` }"
              ></div>
            </div>
          </div>
          
          <div class="space-y-1">
            <h4 class="font-black text-sm truncate group-hover:text-primary transition-colors uppercase tracking-tight">{{ item.title }}</h4>
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-muted font-bold uppercase tracking-widest">Episode {{ item.episode_number }}</span>
              <span class="text-[10px] text-primary/80 font-black">{{ Math.round((item.progress / 1440) * 100) }}%</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Trending Section -->
    <section class="container mx-auto px-6">
      <div class="flex items-end justify-between mb-12">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Flame class="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div>
            <h2 class="text-3xl font-black tracking-tighter uppercase">Trending <span class="text-primary">Now</span></h2>
            <p class="text-foreground/40 text-xs font-bold uppercase tracking-widest">Most watched series this week</p>
          </div>
        </div>
        <NuxtLink to="/anime" class="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 hover:text-primary transition-all">
          View All <TrendingUp class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </NuxtLink>
      </div>

      <div v-if="trendingAnime" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        <NuxtLink 
          v-for="anime in trendingAnime" 
          :key="anime.id"
          :to="`/anime/${anime.slug}`"
          class="group glass-card aspect-[3/4] rounded-2xl overflow-hidden"
        >
          <img 
            :src="getPoster(anime)" 
            :alt="anime.title" 
            loading="lazy"
            decoding="async"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <div class="flex items-center gap-2 text-[9px] font-black uppercase tracking-tighter mb-2">
              <span class="px-2 py-0.5 bg-primary/80 text-white rounded-md backdrop-blur-md">{{ anime.type }}</span>
              <span class="flex items-center gap-1 text-primary">
                <Star class="w-3 h-3 fill-primary" />
                {{ anime.score }}
              </span>
            </div>
            <h3 class="text-sm font-black text-white mb-2 leading-tight uppercase line-clamp-2">{{ anime.title }}</h3>
            <div class="flex items-center gap-3 text-[10px] text-white/60 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span class="flex items-center gap-1"><Clock class="w-3 h-3" /> {{ anime.episodes }} EP</span>
            </div>
          </div>

          <!-- Premium Hover Overlay -->
          <div class="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/40 transition-all duration-500 rounded-2xl pointer-events-none"></div>
        </NuxtLink>
      </div>
    </section>

    <!-- Features / Stats -->
    <section class="container mx-auto px-6 py-12">
      <div class="glass-panel rounded-[3rem] p-16 grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative overflow-hidden border-primary/10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] -mr-48 -mt-48"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[120px] -ml-48 -mb-48"></div>
        
        <div class="space-y-4 relative z-10 group cursor-default">
          <div class="text-7xl font-black text-gradient group-hover:scale-110 transition-transform duration-500">10k+</div>
          <p class="text-muted font-black uppercase tracking-[0.3em] text-xs">Episodes in HD</p>
        </div>
        <div class="space-y-4 relative z-10 border-y md:border-y-0 md:border-x border-border-zenith py-12 md:py-0 group cursor-default">
          <div class="text-7xl font-black text-gradient group-hover:scale-110 transition-transform duration-500">Zero</div>
          <p class="text-muted font-black uppercase tracking-[0.3em] text-xs">Lag Buffering</p>
        </div>
        <div class="space-y-4 relative z-10 group cursor-default">
          <div class="text-7xl font-black text-gradient group-hover:scale-110 transition-transform duration-500">24/7</div>
          <p class="text-muted font-black uppercase tracking-[0.3em] text-xs">New Releases</p>
        </div>
      </div>
    </section>
  </div>
</template>
