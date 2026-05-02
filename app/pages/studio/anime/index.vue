<script setup lang="ts">
definePageMeta({
  layout: 'studio',
  middleware: 'studio-auth'
})

// Define columns as a simple constant to avoid TanStack rendering issues
const columns = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'year', header: 'Year' },
  { id: 'actions' }
]

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
          :data="filteredAnime"
          row-key="id"
          :ui="{ td: 'align-middle' }"
        >
          <template #title-cell="{ row }">
            <div class="flex flex-col">
              <span class="font-bold text-foreground">{{ row.original.title }}</span>
              <span class="text-xs text-foreground/40">{{ row.original.slug }}</span>
            </div>
          </template>

          <template #status-cell="{ row }">
            <UBadge
              :label="row.original.status"
              :color="getStatusColor(row.original.status)"
              variant="subtle"
              class="capitalize"
            />
          </template>

          <template #actions-cell="{ row }">
            <div class="flex justify-end gap-2">
              <UButton
                icon="i-lucide-edit"
                variant="ghost"
                color="neutral"
                square
                :to="`/studio/anime/${row.original.id}`"
              />
              <UButton
                icon="i-lucide-external-link"
                variant="ghost"
                color="neutral"
                square
                :to="`/anime/${row.original.slug}`"
                target="_blank"
              />
            </div>
          </template>
        </UTable>
      </div>
    </template>
  </UDashboardPanel>
</template>
