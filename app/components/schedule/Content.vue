<script setup lang="ts">
import { ChevronRight, Clock, Play, Calendar } from 'lucide-vue-next'
const { getPoster } = useGoxImage()

const props = defineProps<{
  days: string[]
}>()

const activeDay = defineModel<string>('activeDay')

const { data: scheduleData } = await useFetch('/api/anime', {
  query: { status: 'Ongoing' }
})

const scheduleByDay = computed(() => {
  const map: Record<string, any[]> = {}
  props.days.forEach(day => map[day] = [])
  
  scheduleData.value?.forEach((anime: any, idx: number) => {
    const day = props.days[idx % 7]
    map[day].push(anime)
  })
  return map
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
    <!-- Sidebar Navigation -->
    <aside class="hidden lg:block lg:col-span-3 space-y-4 animate-reveal-up" style="animation-delay: 0.1s">
      <button 
        v-for="day in days" 
        :key="day"
        @click="activeDay = day"
        class="w-full flex items-center justify-between p-6 rounded-3xl border transition-all group"
        :class="activeDay === (activeDay as any) ? (activeDay === day ? 'bg-surface-gox border-primary shadow-xl translate-x-2' : 'bg-transparent border-border-gox hover:border-primary/30') : ''"
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
      <div v-if="activeDay && scheduleByDay[activeDay]?.length" class="space-y-6">
        <NuxtLink 
          v-for="anime in scheduleByDay[activeDay]" 
          :key="anime.id"
          :to="`/anime/${anime.slug}`"
          class="group flex flex-col sm:flex-row gap-8 p-6 bg-surface-gox border border-border-gox rounded-[2.5rem] hover:border-primary/50 transition-all hover:-translate-y-1"
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
                <span v-for="genre in anime.genres?.slice(0, 2)" :key="genre" class="text-[9px] font-black uppercase tracking-widest text-muted/50 border border-border-gox px-2 py-0.5 rounded-md">{{ genre }}</span>
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

      <div v-else class="py-40 text-center glass-panel rounded-[3rem] border border-dashed border-border-gox">
         <Calendar class="w-12 h-12 text-muted mx-auto opacity-20 mb-4" />
         <p class="text-muted font-black uppercase tracking-[0.2em] text-[10px]">No transmissions scheduled for this day</p>
      </div>
    </main>
  </div>
</template>
