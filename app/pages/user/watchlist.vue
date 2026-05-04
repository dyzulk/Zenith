<script setup lang="ts">
import { Bookmark, Play, Trash2, LayoutGrid, Clock, Star } from 'lucide-vue-next'
const { getPoster } = useGoxImage()

definePageMeta({
  middleware: 'auth'
})

const { data: watchlist, refresh } = await useFetch('/api/user/watchlist')
</script>

<template>
  <div class="is-gox min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6 space-y-12">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-reveal-up">
        <div class="space-y-4">
          <div class="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
            <Bookmark class="w-4 h-4" />
            Personal Sanctuary
          </div>
          <h1 class="text-6xl font-black tracking-tighter uppercase">My <span class="text-primary">Watchlist</span></h1>
        </div>
        
        <div class="flex items-center gap-4">
           <div class="px-6 py-3 bg-surface-gox border border-border-gox rounded-2xl text-[10px] font-black uppercase tracking-widest text-muted">
              {{ watchlist?.length || 0 }} Items Saved
           </div>
           <button class="p-3 bg-surface-gox text-muted border border-border-gox rounded-2xl hover:text-red-500 hover:border-red-500/30 transition-all">
             <Trash2 class="w-5 h-5" />
           </button>
        </div>
      </div>

      <!-- Watchlist Grid -->
      <main class="animate-reveal-up" style="animation-delay: 0.1s">
        <div v-if="watchlist?.length" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
           <NuxtLink 
            v-for="anime in watchlist" 
            :key="anime.id"
            :to="`/anime/${anime.slug}`"
            class="group space-y-4"
          >
            <div class="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-surface-gox border border-border-gox group-hover:border-primary/50 transition-all shadow-xl">
              <img :src="getPoster(anime)" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
              
              <!-- Quick Actions on Hover -->
              <div class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                 <div class="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/40 text-white">
                   <Play class="w-6 h-6 fill-current ml-1" />
                 </div>
              </div>

              <!-- Top Status -->
              <div class="absolute top-4 right-4 z-20">
                <div class="px-3 py-1 bg-black/60 backdrop-blur-md rounded-xl text-[8px] font-black uppercase tracking-widest text-white border border-white/10">
                  {{ anime.status }}
                </div>
              </div>
            </div>

            <div class="px-2 space-y-1">
              <h3 class="font-black text-sm group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-tight">{{ anime.title }}</h3>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-[10px] text-muted font-bold">
                  <Star class="w-3 h-3 text-primary fill-primary" />
                  {{ anime.score }}
                </div>
                <div class="flex items-center gap-2 text-[10px] text-muted font-bold">
                  <Clock class="w-3 h-3" />
                  {{ anime.type }}
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="py-40 text-center space-y-6 glass-panel rounded-[4rem] border-dashed border-border-gox">
           <div class="w-24 h-24 bg-surface-gox rounded-full flex items-center justify-center mx-auto border border-border-gox">
             <Bookmark class="w-10 h-10 text-muted opacity-20" />
           </div>
           <div class="space-y-2">
             <h3 class="text-xl font-black uppercase tracking-[0.2em]">Sanctuary Empty</h3>
             <p class="text-muted font-medium italic text-sm">You haven't saved any series to your transmission list yet.</p>
           </div>
           <NuxtLink to="/browse" class="btn-premium inline-flex px-10 py-4 text-[10px]">
             Discover Anime
           </NuxtLink>
        </div>
      </main>
    </div>
  </div>
</template>
