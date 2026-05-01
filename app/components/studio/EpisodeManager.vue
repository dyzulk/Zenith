<script setup lang="ts">
const props = defineProps<{
  animeId: string
}>()

const { data, refresh } = await useFetch(`/api/studio/anime/${props.animeId}/episodes`)
const episodes = computed(() => data.value?.episodes || [])

const isAddModalOpen = ref(false)
const isLoading = ref(false)
const toast = useToast()

const newEpisode = reactive({
  number: 1,
  title: '',
  synopsis: ''
})

// Set default episode number to next sequence
watch(episodes, (list) => {
  if (list.length > 0) {
    newEpisode.number = Math.max(...list.map((e: any) => e.number)) + 1
  } else {
    newEpisode.number = 1
  }
}, { immediate: true })

async function addEpisode() {
  isLoading.value = true
  try {
    await $fetch(`/api/studio/anime/${props.animeId}/episodes`, {
      method: 'POST',
      body: newEpisode
    })
    toast.add({ title: 'Success', description: 'Episode added', color: 'success' })
    isAddModalOpen.value = false
    await refresh()
  } catch (e: any) {
    toast.add({ title: 'Error', description: e.statusMessage, color: 'error' })
  } finally {
    isLoading.value = false
  }
}

const isVideoModalOpen = ref(false)
const selectedEpisode = ref<any>(null)

function manageVideos(episode: any) {
  selectedEpisode.value = episode
  isVideoModalOpen.value = true
}

const columns = [
  { accessorKey: 'number', header: 'EP', size: 80 },
  { accessorKey: 'title', header: 'EPISODE TITLE' },
  { accessorKey: 'source_count', header: 'SOURCES', size: 140 },
  { id: 'actions', size: 120 }
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center px-1">
      <h3 class="text-lg font-bold">Episodes ({{ episodes.length }})</h3>
      <UButton
        label="Add Episode"
        icon="i-lucide-plus"
        size="sm"
        @click="isAddModalOpen = true"
      />
    </div>

    <div class="glass-panel rounded-2xl overflow-hidden">
      <UTable :data="episodes" :columns="columns" :ui="{ th: 'text-[10px] font-black uppercase tracking-widest text-foreground/40 px-4 py-4', td: 'px-4 py-4' }">
        <template #number-cell="{ row }">
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-black text-xs">
              {{ row.original.number }}
            </span>
          </div>
        </template>
        
        <template #title-cell="{ row }">
          <div class="flex flex-col">
            <span class="text-sm font-bold text-foreground">{{ row.original.title }}</span>
            <span class="text-[10px] text-foreground/40 font-medium uppercase tracking-tighter">Episode Data</span>
          </div>
        </template>

        <template #source_count-cell="{ row }">
          <UBadge 
            :label="`${row.original.source_count} Sources`" 
            :color="row.original.source_count > 0 ? 'primary' : 'neutral'" 
            variant="subtle"
            size="sm"
            class="font-black px-3 py-1"
          />
        </template>

        <template #actions-cell="{ row }">
          <div class="flex justify-end">
            <UButton
              icon="i-lucide-settings-2"
              label="Manage Videos"
              variant="subtle"
              color="primary"
              size="xs"
              class="font-black uppercase tracking-tighter"
              @click="manageVideos(row.original)"
            />
          </div>
        </template>
      </UTable>

      <div v-if="episodes.length === 0" class="py-24 text-center">
        <UIcon name="i-lucide-video-off" class="size-12 text-foreground/10 mb-4 mx-auto" />
        <p class="text-foreground/40 text-sm font-bold uppercase tracking-widest">No episodes found</p>
      </div>
    </div>

    <!-- Video Sources Modal -->
    <UModal v-model:open="isVideoModalOpen">
      <StudioVideoSourceManager 
        v-if="selectedEpisode"
        :episode-id="selectedEpisode.id" 
        :episode-number="selectedEpisode.number"
        @close="isVideoModalOpen = false"
        @saved="refresh"
      />
    </UModal>

    <!-- Add Episode Modal -->
    <UModal v-model:open="isAddModalOpen">
      <UModalContent title="Add New Episode">
        <UForm :state="newEpisode" @submit="addEpisode" class="space-y-4 p-6">
          <UFormGroup label="Episode Number" required>
            <UInput v-model="newEpisode.number" type="number" />
          </UFormGroup>
          <UFormGroup label="Title">
            <UInput v-model="newEpisode.title" placeholder="e.g. The Beginning" />
          </UFormGroup>
          <UFormGroup label="Synopsis">
            <UTextarea v-model="newEpisode.synopsis" :rows="3" />
          </UFormGroup>
          
          <div class="flex justify-end gap-3 pt-4">
            <UButton label="Cancel" variant="ghost" color="neutral" @click="isAddModalOpen = false" />
            <UButton type="submit" label="Add Episode" color="primary" :loading="isLoading" />
          </div>
        </UForm>
      </UModalContent>
    </UModal>
  </div>
</template>
