<script setup lang="ts">
import { Play } from 'lucide-vue-next'
</script>

<template>
  <div class="h-screen w-full bg-background flex overflow-hidden relative">
    <!-- Left Side: Branding Visual -->
    <div class="hidden lg:flex w-[40%] h-full relative overflow-hidden bg-surface-zenith">
      <img 
        src="/auth_background.png" 
        class="absolute inset-0 w-full h-full object-cover animate-slow-zoom opacity-40" 
      />
      <div class="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      
      <div class="absolute inset-x-8 bottom-12 space-y-3">
        <div class="flex items-center gap-2 animate-reveal-up" style="animation-delay: 0.2s">
          <div class="w-8 h-[2px] bg-primary"></div>
          <span class="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Now Streaming</span>
        </div>
        <h2 class="text-5xl font-black text-white tracking-tighter uppercase leading-[0.9] animate-reveal-up" style="animation-delay: 0.3s">
          Elevate Your <br /> <span class="text-primary italic">Anime</span> Experience
        </h2>
      </div>
    </div>

    <!-- Right Side: Form Section -->
    <div class="flex-1 h-full flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 relative z-10 overflow-y-auto lg:overflow-hidden">
      <div class="w-full max-w-sm space-y-4 md:space-y-6 animate-reveal-up py-4">
        <!-- Logo -->
        <NuxtLink id="auth-logo" to="/" class="flex items-center gap-2 group justify-center lg:justify-start">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-primary/30">
            <Play class="text-white fill-white w-4 h-4" />
          </div>
          <span class="text-xl font-black tracking-tighter uppercase">
            Ani<span class="text-primary">Zenith</span>
          </span>
        </NuxtLink>

        <!-- Form Slot -->
        <div class="space-y-4">
          <slot />
        </div>

        <!-- Footer Slot -->
        <div class="pt-3 border-t border-border-zenith">
          <slot name="footer" />
        </div>
      </div>
    </div>

    <!-- Ambient Background Blobs -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -mr-32 -mt-32 animate-pulse pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full -ml-32 -mb-32 pointer-events-none"></div>
  </div>
</template>

<style scoped>
/* Ensure no scroll on the root container on desktop */
@media (min-height: 600px) {
  :global(body) {
    overflow: hidden;
  }
}

@media (max-height: 580px) {
  #auth-logo {
    display: none !important;
  }
}
</style>
