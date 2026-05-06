<script setup lang="ts">
import { Flame, TrendingUp, Star, Clock } from 'lucide-vue-next'
import { gsap } from 'gsap'
const { getPoster } = useGoxImage()

const { data: trendingAnime } = await useFetch('/api/anime/trending')

useGsap((ctx) => {
  if (trendingAnime.value?.length) {
    gsap.fromTo('.trending-card', 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.trending-grid',
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )
  }
})
</script>

<template>
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

    <div v-if="trendingAnime" class="trending-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      <NuxtLink 
        v-for="anime in trendingAnime" 
        :key="anime.id"
        :to="`/anime/${anime.slug}`"
        class="trending-card group glass-card aspect-[3/4] rounded-2xl overflow-hidden"
      >
        <GoxImage 
          :src="getPoster(anime)" 
          :alt="anime.title" 
          parallax
          class="absolute inset-0 w-full h-full"
          image-class="transition-transform duration-1000 group-hover:scale-110"
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
</template>
