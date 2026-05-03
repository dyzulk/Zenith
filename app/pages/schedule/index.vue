<script setup lang="ts">
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const activeDay = ref(new Date().toLocaleDateString('en-US', { weekday: 'long' }))
</script>

<template>
  <div class="is-zenith min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6 space-y-16">
      <ScheduleHero :days="days" v-model:activeDay="activeDay" />
      <ScheduleContent :days="days" v-model:activeDay="activeDay" />
    </div>
  </div>
</template>
