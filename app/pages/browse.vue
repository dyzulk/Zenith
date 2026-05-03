<script setup lang="ts">
import { Search, Filter, LayoutGrid, List, SlidersHorizontal, Star, Clock, Calendar } from 'lucide-vue-next'
const { getPoster } = useZenithImage()

const searchQuery = ref('')
const selectedGenres = ref<string[]>([])
const selectedYear = ref('')
const selectedStatus = ref('')

// Mock genres for now, could be fetched from API
const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller']
const years = ['2024', '2023', '2022', '2021', '2020', '2010s', '2000s']
const statuses = ['Ongoing', 'Completed', 'Upcoming']

const { data: animeList, pending } = await useFetch('/api/anime', {
  query: computed(() => ({
    q: searchQuery.value,
    genres: selectedGenres.value.join(','),
    year: selectedYear.value,
    status: selectedStatus.value
  }))
})

const toggleGenre = (genre: string) => {
  const index = selectedGenres.value.indexOf(genre)
  if (index > -1) selectedGenres.value.splice(index, 1)
  else selectedGenres.value.push(genre)
}
</script>

<template>
  <div class="is-zenith min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6 space-y-12">
      <!-- Header & Search -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-reveal-up">
        <div class="space-y-4">
          <div class="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
            <Search class="w-4 h-4" />
            Universal Discovery
          </div>
          <h1 class="text-6xl font-black tracking-tighter uppercase">Browse <span class="text-primary italic">Library</span></h1>
        </div>

        <div class="relative flex-1 max-w-xl group">
          <Search class="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search anime title, studio, or tags..." 
            class="w-full bg-surface-zenith border border-border-zenith rounded-2xl py-5 pl-16 pr-6 text-sm focus:outline-none focus:border-primary transition-all shadow-xl"
          />
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-72 shrink-0 space-y-10 animate-reveal-up" style="animation-delay: 0.1s">
          <!-- Genres -->
          <div class="space-y-6">
            <h3 class="text-xs font-black uppercase tracking-widest text-muted flex items-center gap-2">
              <Filter class="w-4 h-4" /> Genres
            </h3>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="genre in genres" 
                :key="genre"
                @click="toggleGenre(genre)"
                class="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter border transition-all"
                :class="selectedGenres.includes(genre) ? 'bg-primary border-primary text-white' : 'bg-surface-zenith border-border-zenith text-muted hover:border-primary/50'"
              >
                {{ genre }}
              </button>
            </div>
          </div>

          <!-- Advanced Filters -->
          <div class="space-y-8">
             <div class="space-y-4">
               <h3 class="text-xs font-black uppercase tracking-widest text-muted flex items-center gap-2">
                 <Calendar class="w-4 h-4" /> Release Year
               </h3>
               <select v-model="selectedYear" class="w-full bg-surface-zenith border border-border-zenith rounded-xl p-3 text-xs font-black uppercase focus:outline-none focus:border-primary transition-all">
                 <option value="">All Years</option>
                 <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
               </select>
             </div>

             <div class="space-y-4">
               <h3 class="text-xs font-black uppercase tracking-widest text-muted flex items-center gap-2">
                 <Clock class="w-4 h-4" /> Status
               </h3>
               <select v-model="selectedStatus" class="w-full bg-surface-zenith border border-border-zenith rounded-xl p-3 text-xs font-black uppercase focus:outline-none focus:border-primary transition-all">
                 <option value="">All Status</option>
                 <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
               </select>
             </div>
          </div>
        </aside>

        <!-- Main Grid -->
        <main class="flex-1 space-y-10 animate-reveal-up" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
               Found <span class="text-foreground">{{ animeList?.length || 0 }}</span> results
            </span>
            <div class="flex items-center gap-2">
              <button class="p-2 bg-primary text-white rounded-lg"><LayoutGrid class="w-4 h-4" /></button>
              <button class="p-2 bg-surface-zenith text-muted rounded-lg hover:text-foreground transition-colors"><List class="w-4 h-4" /></button>
            </div>
          </div>

          <div v-if="pending" class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8">
             <div v-for="i in 8" :key="i" class="aspect-[3/4] bg-surface-zenith rounded-2xl animate-pulse"></div>
          </div>

          <div v-else-if="animeList?.length" class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8">
            <NuxtLink 
              v-for="anime in animeList" 
              :key="anime.id"
              :to="`/anime/${anime.slug}`"
              class="group relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-surface-zenith transition-all hover:-translate-y-2"
            >
              <img :src="getPoster(anime)" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <div class="flex items-center gap-2 mb-2">
                  <span class="px-2 py-0.5 bg-primary/80 backdrop-blur-md rounded-md text-[8px] font-black text-white uppercase">{{ anime.type }}</span>
                  <span class="flex items-center gap-1 text-[10px] font-black text-primary"><Star class="w-3 h-3 fill-primary" /> {{ anime.score }}</span>
                </div>
                <h3 class="font-black text-sm text-white uppercase line-clamp-2 leading-tight">{{ anime.title }}</h3>
              </div>
            </NuxtLink>
          </div>

          <div v-else class="py-32 text-center space-y-4 glass-panel rounded-[3rem] border-dashed border-border-zenith">
             <SlidersHorizontal class="w-12 h-12 text-muted mx-auto opacity-20" />
             <p class="text-muted font-black uppercase tracking-[0.2em] text-[10px]">No anime matches your transmission parameters</p>
             <button @click="selectedGenres = []; selectedYear = ''; selectedStatus = ''; searchQuery = ''" class="text-primary text-xs font-black uppercase tracking-widest hover:underline">Reset Filters</button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
