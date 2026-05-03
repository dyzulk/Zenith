<script setup lang="ts">
import { Github, Chrome, MessageCircle } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-4">
    <div class="relative flex items-center justify-center">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-border-zenith"></div>
      </div>
      <span class="relative px-3 bg-background text-[8px] font-black uppercase tracking-[0.2em] text-muted">Or</span>
    </div>

    <div class="flex items-center gap-3">
      <button class="flex-1 flex items-center justify-center py-3 rounded-xl border border-border-zenith hover:border-primary/50 hover:bg-primary/5 transition-all group">
        <Chrome class="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
      </button>
      <button class="flex-1 flex items-center justify-center py-3 rounded-xl border border-border-zenith hover:border-primary/50 hover:bg-primary/5 transition-all group">
        <Github class="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
      </button>
      <button class="flex-1 flex items-center justify-center py-3 rounded-xl border border-border-zenith hover:border-primary/50 hover:bg-primary/5 transition-all group">
        <MessageCircle class="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
      </button>
    </div>
  </div>
</template>
