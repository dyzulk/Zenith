<template>
  <section class="container mx-auto px-6 py-12">
    <div class="glass-panel rounded-[3rem] p-16 grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative overflow-hidden border-primary/10">
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] -mr-48 -mt-48"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[120px] -ml-48 -mb-48"></div>
      
      <div class="space-y-4 relative z-10 group cursor-default">
        <div class="text-7xl font-black text-gradient group-hover:scale-110 transition-transform duration-500">10k+</div>
        <p class="text-muted font-black uppercase tracking-[0.3em] text-xs">Episodes in HD</p>
      </div>
      <div class="space-y-4 relative z-10 border-y md:border-y-0 md:border-x border-border-gox py-12 md:py-0 group cursor-default">
        <div class="text-7xl font-black text-gradient group-hover:scale-110 transition-transform duration-500">Zero</div>
        <p class="text-muted font-black uppercase tracking-[0.3em] text-xs">Lag Buffering</p>
      </div>
      <div class="space-y-4 relative z-10 group cursor-default">
        <div class="text-7xl font-black text-gradient group-hover:scale-110 transition-transform duration-500">24/7</div>
        <p class="text-muted font-black uppercase tracking-[0.3em] text-xs">New Releases</p>
      </div>
    </div>
  </section>
</template>
