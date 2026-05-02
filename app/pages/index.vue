<script setup lang="ts">
import { Play, Plus, Star, Clock, Calendar } from 'lucide-vue-next'

const { data: trendingAnime } = await useFetch('/api/anime/trending')
const { data: recentHistory } = await useFetch('/api/user/recent')
</script>

<template>
  <div class="space-y-20 pb-20">
    <!-- Hero Section -->
    <section class="relative h-[85vh] flex items-center overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img 
          src="/hero-banner.png" 
          alt="Hero Banner" 
          class="w-full h-full object-cover scale-105 animate-fade-in"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      <!-- Hero Content -->
      <div class="container mx-auto px-6 relative z-10 animate-slide-up">
        <div class="max-w-2xl space-y-6">
          <div class="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase">
            <span class="w-10 h-[2px] bg-primary"></span>
            Streaming Now
          </div>
          <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            UNLEASH THE <br /> <span class="text-gradient">POWER</span> WITHIN
          </h1>
          <p class="text-lg text-foreground/60 leading-relaxed max-w-lg">
            Experience the most epic anime battles and heartfelt stories in stunning high definition. No limits, just pure entertainment.
          </p>
          <div class="flex items-center gap-4 pt-4">
            <button class="btn-premium flex items-center gap-2">
              <Play class="w-5 h-5 fill-current" />
              Watch Now
            </button>
            <button class="px-6 py-3 rounded-xl font-semibold border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2">
              <Plus class="w-5 h-5" />
              Add to List
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Continue Watching Section -->
    <section v-if="recentHistory?.recent?.length" class="container mx-auto px-6 animate-slide-up">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-black tracking-tight mb-1">Continue <span class="text-primary">Watching</span></h2>
          <p class="text-foreground/40 text-[10px] uppercase tracking-[0.2em]">Pick up where you left off</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink 
          v-for="item in recentHistory.recent" 
          :key="item.id"
          :to="`/anime/${item.slug}/episode/${item.episode_number}`"
          class="group relative flex items-center gap-4 p-4 glass-panel rounded-2xl border border-white/5 hover:border-primary/50 transition-all duration-300"
        >
          <div class="relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
            <img v-if="item.poster_key" :src="`/api/r2/${item.poster_key}`" class="w-full h-full object-cover transition-transform group-hover:scale-110" />
            <div v-else class="w-full h-full flex items-center justify-center">
              <Play class="w-6 h-6 text-white/20" />
            </div>
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Play class="w-6 h-6 text-white fill-white" />
            </div>
          </div>
          
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-black truncate leading-none mb-1 group-hover:text-primary transition-colors">{{ item.title }}</h4>
            <p class="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-2">Episode {{ item.episode_number }}</p>
            
            <!-- Progress Bar -->
            <div class="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                class="h-full bg-primary" 
                :style="{ width: `${item.completed ? 100 : (item.progress / 1440) * 100}%` }"
              ></div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Trending Section -->
    <section class="container mx-auto px-6">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h2 class="text-3xl font-black tracking-tight mb-2">Trending <span class="text-primary">Now</span></h2>
          <p class="text-foreground/40 text-sm">Most watched series this week</p>
        </div>
        <NuxtLink to="/anime" class="text-sm font-bold text-primary hover:underline transition-all">View All</NuxtLink>
      </div>

      <div v-if="trendingAnime" class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <NuxtLink 
          v-for="anime in trendingAnime" 
          :key="anime.id"
          :to="`/anime/${anime.slug}`"
          class="group relative aspect-[3/4] rounded-2xl overflow-hidden glass-panel hover:scale-[1.02] transition-all duration-500 cursor-pointer"
        >
          <img :src="anime.image" :alt="anime.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
              <span class="px-2 py-0.5 bg-primary/20 rounded-md backdrop-blur-md">{{ anime.type }}</span>
              <span class="flex items-center gap-1">
                <Star class="w-3 h-3 fill-primary" />
                {{ anime.score }}
              </span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2 leading-tight">{{ anime.title }}</h3>
            <div class="flex items-center gap-3 text-[11px] text-white/50 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span class="flex items-center gap-1"><Clock class="w-3 h-3" /> {{ anime.episodes }} Episodes</span>
            </div>
          </div>

          <!-- Play Overlay -->
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
              <Play class="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Features / Stats -->
    <section class="container mx-auto px-6 py-20">
      <div class="glass-panel rounded-3xl p-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[120px] -mr-32 -mt-32"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[120px] -ml-32 -mb-32"></div>
        
        <div class="space-y-4 relative z-10">
          <div class="text-5xl font-black text-gradient">10k+</div>
          <p class="text-foreground/40 font-medium">Episodes in HD</p>
        </div>
        <div class="space-y-4 relative z-10 border-y md:border-y-0 md:border-x border-white/5 py-8 md:py-0">
          <div class="text-5xl font-black text-gradient">Zero</div>
          <p class="text-foreground/40 font-medium">Lag Buffering</p>
        </div>
        <div class="space-y-4 relative z-10">
          <div class="text-5xl font-black text-gradient">24/7</div>
          <p class="text-foreground/40 font-medium">New Releases</p>
        </div>
      </div>
    </section>
  </div>
</template>
