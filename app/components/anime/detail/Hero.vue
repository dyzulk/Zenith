<script setup lang="ts">
import { Play, Bookmark, Star, Calendar, Clock, Building2, Users } from 'lucide-vue-next'
const { getPoster, getBanner } = useGoxImage()

const props = defineProps<{
  anime: any
}>()

const displayStats = computed(() => [
  { label: 'Score', value: props.anime?.score || 'N/A', icon: Star, color: 'text-primary' },
  { label: 'Year', value: props.anime?.year || 'N/A', icon: Calendar },
  { label: 'Status', value: props.anime?.status || 'Ongoing', icon: Clock },
  { label: 'Type', value: props.anime?.type || 'TV', icon: Play },
])
</script>

<template>
  <div v-if="anime">
    <!-- Cover Banner -->
    <div class="h-[70vh] relative overflow-hidden">
      <img :src="getBanner(anime)" class="w-full h-full object-cover animate-blur-in" />
      <div class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-background via-background/10 to-transparent"></div>
    </div>

    <div class="container mx-auto px-6 -mt-64 relative z-10">
      <div class="flex flex-col lg:flex-row gap-16">
        <!-- Poster & Quick Actions -->
        <div class="w-full lg:w-80 shrink-0 space-y-8 animate-reveal-up">
          <div class="aspect-[2/3] rounded-[2rem] overflow-hidden glass-card shadow-lg group relative border-border-gox">
            <GoxImage 
              :src="getPoster(anime)" 
              :alt="anime.title"
              class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Official Art • {{ anime.year }}</span>
            </div>
          </div>
          
          <div class="flex gap-4">
            <button class="flex-1 btn-premium py-5 group">
              <Play class="w-5 h-5 fill-current group-hover:scale-125 transition-transform" />
              Watch Now
            </button>
            <button class="p-5 rounded-2xl glass-card text-muted hover:text-primary active:scale-90 transition-all border border-border-gox">
              <Bookmark class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Detailed Info -->
        <div class="flex-1 space-y-12 animate-reveal-up" style="animation-delay: 0.1s">
          <div class="glass-panel p-8 md:p-12 rounded-[3rem] border-border-gox space-y-6 relative overflow-hidden group">
            <!-- Decorative Glow -->
            <div class="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-colors"></div>
            
            <div class="flex flex-wrap gap-2 relative z-10">
              <span v-for="genre in anime.genres" :key="genre" class="px-4 py-1.5 bg-surface-gox border border-border-gox rounded-full text-[9px] font-black uppercase tracking-widest text-primary/80 hover:bg-primary/10 transition-colors cursor-default">
                {{ genre }}
              </span>
            </div>
            <h1 class="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.95] uppercase relative z-10">
              {{ anime.title }}
            </h1>
            <p v-if="anime.title_romaji" class="text-xl md:text-2xl font-bold text-muted tracking-tighter relative z-10">{{ anime.title_romaji }}</p>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div v-for="stat in displayStats" :key="stat.label" class="glass-card p-6 rounded-3xl space-y-3 border border-border-gox">
              <div class="flex items-center gap-2 text-muted">
                <component :is="stat.icon" class="w-4 h-4" />
                <span class="text-[9px] font-black uppercase tracking-[0.2em]">{{ stat.label }}</span>
              </div>
              <div class="text-2xl font-black text-glow" :class="stat.color">{{ stat.value }}</div>
            </div>
          </div>

          <div class="space-y-6">
            <h3 class="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
              <span class="w-12 h-[2px] bg-primary"></span>
              Synopsis
            </h3>
            <p class="text-xl text-foreground leading-relaxed font-medium max-w-4xl italic">
              "{{ anime.synopsis }}"
            </p>
          </div>

          <!-- Production Info -->
          <div class="flex flex-wrap gap-12 pt-8 border-t border-border-gox">
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-muted text-[10px] font-black uppercase tracking-widest">
                <Building2 class="w-4 h-4" /> Studio
              </div>
              <div class="text-foreground font-black text-sm uppercase tracking-tight">{{ anime.studio || 'Unknown' }}</div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-muted text-[10px] font-black uppercase tracking-widest">
                <Users class="w-4 h-4" /> Season
              </div>
              <div class="text-foreground font-black text-sm uppercase tracking-tight">{{ anime.season || 'Unknown' }} {{ anime.year }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
