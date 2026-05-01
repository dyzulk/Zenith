<script setup lang="ts">
definePageMeta({
  layout: 'studio',
  middleware: 'studio-auth'
})

const columns = [{
  key: 'title',
  label: 'Title'
}, {
  key: 'status',
  label: 'Status'
}, {
  key: 'year',
  label: 'Year'
}, {
  key: 'actions',
  label: ''
}]

const { data, refresh } = await useFetch('/api/studio/anime')
const anime = computed(() => data.value?.anime || [])

const q = ref('')
const filteredAnime = computed(() => {
  if (!q.value) return anime.value
  return anime.value.filter((a: any) => 
    a.title.toLowerCase().includes(q.value.toLowerCase()) || 
    a.slug.toLowerCase().includes(q.value.toLowerCase())
  )
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ongoing': return 'primary'
    case 'completed': return 'success'
    case 'hiatus': return 'warning'
    default: return 'neutral'
  }
}
</script>

<template>
  <UDashboardPanel id="anime-list">
    <template #header>
      <UDashboardNavbar title="Anime Management" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UInput
            v-model="q"
            icon="i-lucide-search"
            size="sm"
            placeholder="Search anime..."
            class="hidden lg:block w-64"
          />
          <UButton
            label="New Anime"
            icon="i-lucide-plus"
            color="primary"
            to="/studio/anime/create"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-4 overflow-x-auto">
        <UTable
          :columns="columns"
          :rows="filteredAnime"
          row-key="id"
          :ui="{ td: 'align-middle' }"
        >
          <template #title-data="{ row }">
            <div class="flex flex-col">
              <span class="font-bold text-foreground">{{ row.title }}</span>
              <span class="text-xs text-foreground/40">{{ row.slug }}</span>
            </div>
          </template>

          <template #status-data="{ row }">
            <UBadge
              :label="row.status"
              :color="getStatusColor(row.status)"
              variant="subtle"
              class="capitalize"
            />
          </template>

          <template #actions-data="{ row }">
            <div class="flex justify-end gap-2">
              <UButton
                icon="i-lucide-edit"
                variant="ghost"
                color="neutral"
                square
                :to="`/studio/anime/${row.id}`"
              />
              <UButton
                icon="i-lucide-external-link"
                variant="ghost"
                color="neutral"
                square
                :to="`/anime/${row.slug}`"
                target="_blank"
              />
            </div>
          </template>
        </UTable>
      </div>
    </template>
  </UDashboardPanel>
</template>
