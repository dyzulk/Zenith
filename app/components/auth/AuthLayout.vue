<script setup lang="ts">
import { Play } from 'lucide-vue-next'
</script>

<template>
  <div class="h-screen w-full bg-background flex overflow-hidden relative">
    <!-- Left Side: Branding Visual (Fixed width, hidden on mobile) -->
    <div class="hidden lg:flex w-[45%] h-full relative overflow-hidden bg-surface-zenith">
      <img 
        src="/auth_background.png" 
        class="absolute inset-0 w-full h-full object-cover animate-slow-zoom opacity-60" 
      />
      <div class="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      
      <div class="absolute inset-x-12 bottom-16 space-y-4">
        <div class="flex items-center gap-3 animate-reveal-up" style="animation-delay: 0.2s">
          <div class="w-10 h-[2px] bg-primary"></div>
          <span class="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Now Streaming</span>
        </div>
        <h2 class="text-6xl font-black text-white tracking-tighter uppercase leading-[0.9] animate-reveal-up" style="animation-delay: 0.3s">
          Elevate Your <br /> <span class="text-primary italic">Anime</span> Experience
        </h2>
      </div>
    </div>

    <!-- Right Side: Form Section (Flexible) -->
    <div class="flex-1 h-full flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
      <div class="w-full max-w-sm space-y-8 animate-reveal-up">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group justify-center lg:justify-start">
          <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-primary/30">
            <Play class="text-white fill-white w-5 h-5" />
          </div>
          <span class="text-2xl font-black tracking-tighter uppercase">
            Ani<span class="text-primary">Zenith</span>
          </span>
        </NuxtLink>

        <!-- Form Slot (No card/glass effect if it takes too much space, just a clean setup) -->
        <div class="space-y-6">
          <slot />
        </div>

        <!-- Footer Slot -->
        <div class="pt-4 border-t border-border-zenith">
          <slot name="footer" />
        </div>
      </div>
    </div>

    <!-- Background Blobs (Global) -->
    <div class="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[100px] rounded-full -mr-40 -mt-40 animate-pulse pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 blur-[100px] rounded-full -ml-40 -mb-40 pointer-events-none"></div>
  </div>
</template>

<style scoped>
/* Ensure no scroll on the root container */
:global(body) {
  overflow: hidden;
}
</style>
