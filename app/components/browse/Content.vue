<script setup lang="ts">
import { Filter, Clock, LayoutGrid, List, SlidersHorizontal, Star, X } from 'lucide-vue-next'
import { gsap } from 'gsap'
const { getPoster } = useGoxImage()
const { genres, statuses, fetchOptions } = useBrowseData()

onMounted(fetchOptions)

const props = defineProps<{
  searchQuery: string
}>()

const selectedGenres = ref<string[]>([])
const selectedStatus = ref('')

const combinedGenres = computed(() => {
  return selectedGenres.value.join(',')
})

const { data: animeList, pending } = await useFetch('/api/anime', {
  query: computed(() => ({
    q: props.searchQuery,
    genres: combinedGenres.value,
    status: selectedStatus.value
  }))
})

const resetFilters = () => {
  selectedGenres.value = []
  selectedStatus.value = ''
}

const removeGenre = (slug: string) => {
  const index = selectedGenres.value.indexOf(slug)
  if (index > -1) selectedGenres.value.splice(index, 1)
}

// GSAP Staggered Entrance
useGsap((ctx) => {
  watch(animeList, () => {
    // Delay sedikit agar DOM selesai render
    setTimeout(() => {
      gsap.fromTo('.browse-card', 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          overwrite: true
        }
      )
    }, 50)
  }, { immediate: true })
})
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-12">
    <aside class="w-full lg:w-72 shrink-0 space-y-10">
      <!-- Genres -->
      <div class="space-y-6">
        <h3 class="text-xs font-black uppercase tracking-widest text-muted flex items-center gap-2">
          <Filter class="w-4 h-4" /> Genres
        </h3>
        <div class="space-y-4">
          <UiGoxSelect
            v-model="selectedGenres"
            :items="genres"
            value-key="slug"
            label-key="name"
            searchable
            multiple
            placeholder="Select Genres..."
          />
          
          <div v-if="selectedGenres.length" class="flex flex-wrap gap-2 mt-3">
            <span 
              v-for="slug in selectedGenres" 
              :key="slug"
              class="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-lg text-[10px] font-black uppercase"
            >
              {{ genres.find(g => g.slug === slug)?.name || slug }}
              <button @click="removeGenre(slug)" class="hover:text-foreground transition-colors">
                <X class="w-3 h-3" />
              </button>
            </span>
          </div>
        </div>
      </div>

      <!-- Advanced Filters -->
      <div class="space-y-8">
         <div class="space-y-4">
           <h3 class="text-xs font-black uppercase tracking-widest text-muted flex items-center gap-2">
             <Clock class="w-4 h-4" /> Status
           </h3>
           <UiGoxSelect 
             v-model="selectedStatus" 
             :items="statuses" 
             value-key="value"
             label-key="label"
             searchable
             placeholder="All Status..."
           />
         </div>
      </div>
    </aside>

    <!-- Main Grid -->
    <main class="flex-1 space-y-10">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
           Found <span class="text-foreground">{{ animeList?.length || 0 }}</span> results
        </span>
        <div class="flex items-center gap-2">
          <button class="p-2 bg-primary text-white rounded-lg"><LayoutGrid class="w-4 h-4" /></button>
          <button class="p-2 bg-surface-gox text-muted rounded-lg hover:text-foreground transition-colors"><List class="w-4 h-4" /></button>
        </div>
      </div>

      <div v-if="pending" class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8">
         <div v-for="i in 8" :key="i" class="aspect-[3/4] bg-surface-gox rounded-2xl animate-pulse"></div>
      </div>

      <div v-else-if="animeList?.length" class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8">
        <NuxtLink 
          v-for="anime in animeList" 
          :key="anime.id"
          :to="`/anime/${anime.slug}`"
          class="browse-card group relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-surface-gox transition-all hover:-translate-y-2"
        >
          <GoxImage 
          :src="getPoster(anime)" 
          :alt="anime.title" 
          class="absolute inset-0 w-full h-full"
          image-class="transition-transform duration-1000 group-hover:scale-110"
        />
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

      <div v-else class="py-32 text-center space-y-4 glass-panel rounded-[3rem] border-dashed border-border-gox">
         <SlidersHorizontal class="w-12 h-12 text-muted mx-auto opacity-20" />
         <p class="text-muted font-black uppercase tracking-[0.2em] text-[10px]">No anime matches your transmission parameters</p>
         <button @click="resetFilters" class="text-primary text-xs font-black uppercase tracking-widest hover:underline">Reset Filters</button>
      </div>
    </main>
  </div>
</template>
