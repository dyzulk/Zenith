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
  { accessorKey: 'number', header: 'EP', size: 60 },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'source_count', header: 'Sources', size: 120 },
  { id: 'actions', size: 80 }
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

    <div class="border border-default rounded-xl overflow-hidden bg-elevated/5">
      <UTable :data="episodes" :columns="columns">
        <template #number-cell="{ row }">
          <span class="font-bold text-neutral-900 dark:text-white">#{{ row.original.number }}</span>
        </template>
        
        <template #title-cell="{ row }">
          <span class="text-sm font-medium text-foreground">{{ row.original.title }}</span>
        </template>

        <template #source_count-cell="{ row }">
          <UBadge 
            :label="`${row.original.source_count} Sources`" 
            :color="row.original.source_count > 0 ? 'primary' : 'neutral'" 
            variant="subtle"
            size="sm"
          />
        </template>

        <template #actions-cell="{ row }">
          <div class="flex justify-end pr-2">
            <UButton
              icon="i-lucide-settings-2"
              label="Sources"
              variant="subtle"
              color="neutral"
              size="xs"
              @click="manageVideos(row.original)"
            />
          </div>
        </template>
      </UTable>

      <div v-if="episodes.length === 0" class="py-12 text-center">
        <p class="text-foreground/40 text-sm italic">No episodes found.</p>
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
