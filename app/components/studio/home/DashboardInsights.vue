<template>
  <div class="bg-primary/5 p-8 lg:p-12 rounded-[2rem] border border-primary/10 relative overflow-hidden">
    <div class="relative z-10 space-y-4 max-w-xl">
      <h2 class="text-3xl font-black tracking-tight text-foreground">Studio Insights</h2>
      <p class="text-muted leading-relaxed text-sm">
        Platform streaming anime Anda terus berkembang. Terus tambahkan konten berkualitas tinggi dan pantau statistik Anda untuk membangun destinasi anime terbaik.
      </p>
      <div class="flex gap-4 pt-4">
        <UButton label="Eksplor Anime" color="primary" size="md" to="/studio/anime" class="font-bold" />
        <UButton label="Kelola Genre" color="neutral" variant="ghost" size="md" to="/studio/genres" class="font-bold" />
      </div>
    </div>
    <UIcon name="i-lucide-activity" class="absolute -right-8 -bottom-8 size-48 text-primary/5 rotate-12" />
  </div>
</template>
