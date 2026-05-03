<script setup lang="ts">
import { Calendar, Clock, ChevronRight, Play, LayoutGrid } from 'lucide-vue-next'
const { getPoster } = useZenithImage()

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const activeDay = ref(new Date().toLocaleDateString('en-US', { weekday: 'long' }))

const { data: scheduleData } = await useFetch('/api/anime', {
  query: { status: 'Ongoing' }
})

// Group anime by day (for demo/placeholder logic)
// In a real app, you'd fetch schedule specifically
const scheduleByDay = computed(() => {
  const map: Record<string, any[]> = {}
  days.forEach(day => map[day] = [])
  
  scheduleData.value?.forEach((anime: any, idx: number) => {
    const day = days[idx % 7]
    map[day].push(anime)
  })
  return map
})
</script>

<template>
  <div class="is-zenith min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6 space-y-16">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-reveal-up">
        <div class="space-y-4">
          <div class="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
            <Calendar class="w-4 h-4" />
            Transmission Schedule
          </div>
          <h1 class="text-6xl font-black tracking-tighter uppercase">Weekly <span class="text-primary italic">Releases</span></h1>
        </div>
        <div class="flex items-center gap-2 p-1 bg-surface-zenith rounded-2xl border border-border-zenith">
           <button 
             v-for="day in days" 
             :key="day"
             @click="activeDay = day"
             class="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all"
             :class="activeDay === day ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted hover:text-foreground'"
           >
             {{ day.slice(0, 3) }}
           </button>
        </div>
      </div>

      <!-- Schedule Content -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Sidebar Navigation (Vertical for large screens) -->
        <aside class="hidden lg:block lg:col-span-3 space-y-4 animate-reveal-up" style="animation-delay: 0.1s">
          <button 
            v-for="day in days" 
            :key="day"
            @click="activeDay = day"
            class="w-full flex items-center justify-between p-6 rounded-3xl border transition-all group"
            :class="activeDay === day ? 'bg-surface-zenith border-primary shadow-xl translate-x-2' : 'bg-transparent border-border-zenith hover:border-primary/30'"
          >
            <div class="flex flex-col items-start">
              <span class="text-[10px] font-black uppercase tracking-widest" :class="activeDay === day ? 'text-primary' : 'text-muted'">{{ day }}</span>
              <span class="text-xs font-bold">{{ scheduleByDay[day]?.length || 0 }} Episodes</span>
            </div>
            <ChevronRight class="w-5 h-5 transition-transform" :class="activeDay === day ? 'text-primary translate-x-1' : 'text-muted group-hover:translate-x-1'" />
          </button>
        </aside>

        <!-- Main Day List -->
        <main class="lg:col-span-9 space-y-8 animate-reveal-up" style="animation-delay: 0.2s">
          <div v-if="scheduleByDay[activeDay]?.length" class="space-y-6">
            <NuxtLink 
              v-for="anime in scheduleByDay[activeDay]" 
              :key="anime.id"
              :to="`/anime/${anime.slug}`"
              class="group flex flex-col sm:flex-row gap-8 p-6 bg-surface-zenith border border-border-zenith rounded-[2.5rem] hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <div class="w-full sm:w-48 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 shadow-xl">
                 <img :src="getPoster(anime)" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>

              <div class="flex-1 flex flex-col justify-center space-y-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="px-3 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest">Airing Today</span>
                    <span class="text-xs font-bold text-muted flex items-center gap-2"><Clock class="w-4 h-4" /> 18:30 JST</span>
                  </div>
                  <div class="hidden sm:flex items-center gap-2">
                    <span v-for="genre in anime.genres?.slice(0, 2)" :key="genre" class="text-[9px] font-black uppercase tracking-widest text-muted/50 border border-border-zenith px-2 py-0.5 rounded-md">{{ genre }}</span>
                  </div>
                </div>

                <div>
                  <h3 class="text-4xl font-black tracking-tighter uppercase group-hover:text-primary transition-colors leading-none mb-4">{{ anime.title }}</h3>
                  <p class="text-muted line-clamp-2 italic text-sm">"{{ anime.synopsis }}"</p>
                </div>

                <div class="flex items-center gap-4">
                   <button class="btn-premium px-6 py-3 text-[9px]">
                     <Play class="w-4 h-4 fill-current" />
                     View Details
                   </button>
                </div>
              </div>
            </NuxtLink>
          </div>

          <div v-else class="py-40 text-center glass-panel rounded-[3rem] border border-dashed border-border-zenith">
             <Calendar class="w-12 h-12 text-muted mx-auto opacity-20 mb-4" />
             <p class="text-muted font-black uppercase tracking-[0.2em] text-[10px]">No transmissions scheduled for this day</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
