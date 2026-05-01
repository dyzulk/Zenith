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
  { accessorKey: 'number', header: 'EP', size: 100 },
  { accessorKey: 'info', header: 'EPISODE INFO' },
  { accessorKey: 'source_count', header: 'STATUS', size: 180 },
  { id: 'actions', size: 150 }
]

const activeTab = ref(0)
const tabs = [{
  label: 'Video Sources',
  icon: 'i-lucide-video'
}, {
  label: 'Subtitles',
  icon: 'i-lucide-languages'
}]
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center px-1">
      <h3 class="text-lg font-bold">Episodes ({{ episodes.length }})</h3>
      
      <!-- Add Episode Modal & Trigger -->
      <UModal v-model:open="isAddModalOpen" title="Register New Episode" description="Enter the details for the new anime episode.">
        <UButton
          label="Add Episode"
          icon="i-lucide-plus"
          size="sm"
        />

        <template #body>
          <UForm :state="newEpisode" @submit="addEpisode" class="space-y-6">
            <div class="grid grid-cols-4 gap-6">
              <UFormField label="No." required class="col-span-1">
                <UInput v-model="newEpisode.number" type="number" size="lg" class="font-bold" />
              </UFormField>
              <UFormField label="Episode Title" class="col-span-3">
                <UInput v-model="newEpisode.title" placeholder="e.g. The Beginning" size="lg" />
              </UFormField>
            </div>
            
            <UFormField label="Episode Synopsis" description="Brief summary of the events in this episode">
              <UTextarea v-model="newEpisode.synopsis" :rows="4" placeholder="What happens in this episode?" />
            </UFormField>
            
            <div class="flex justify-end gap-4 pt-6 border-t border-white/5">
              <UButton label="Discard" variant="ghost" color="neutral" @click="isAddModalOpen = false" class="font-bold" />
              <UButton type="submit" label="Register Episode" color="primary" size="lg" :loading="isLoading" class="px-8 font-bold" />
            </div>
          </UForm>
        </template>
      </UModal>
    </div>

    <div class="studio-card rounded-2xl overflow-hidden">
      <UTable :data="episodes" :columns="columns" :ui="{ th: 'text-[10px] font-black uppercase tracking-widest text-foreground/40 px-4 py-4', td: 'px-4 py-4' }">
        <template #number-cell="{ row }">
          <div class="flex items-center gap-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white font-black text-sm shadow-inner">
              {{ row.original.number }}
            </span>
          </div>
        </template>
        
        <template #info-cell="{ row }">
          <div class="flex flex-col gap-1 max-w-md">
            <span class="text-sm font-black text-foreground leading-tight">{{ row.original.title || `Episode ${row.original.number}` }}</span>
            <p class="text-[11px] text-foreground/50 line-clamp-1 leading-relaxed">
              {{ row.original.synopsis || 'No description provided for this episode.' }}
            </p>
          </div>
        </template>

        <template #source_count-cell="{ row }">
          <div class="flex items-center gap-2">
            <UBadge 
              :label="row.original.source_count > 0 ? `${row.original.source_count} Sources` : 'No Video'" 
              :color="row.original.source_count > 0 ? 'success' : 'error'" 
              variant="subtle"
              size="sm"
              class="font-black px-2.5 py-1"
            />
            <UIcon 
              v-if="row.original.source_count > 0" 
              name="i-lucide-check-circle-2" 
              class="text-success size-4" 
            />
            <UIcon 
              v-else 
              name="i-lucide-alert-circle" 
              class="text-error size-4" 
            />
          </div>
        </template>

        <template #actions-cell="{ row }">
          <div class="flex justify-end">
            <!-- Manage Content Modal (Tabs) -->
            <UModal v-model:open="isVideoModalOpen" :title="selectedEpisode ? `Manage Content - Episode #${selectedEpisode.number}` : 'Manage Content'">
              <UButton
                icon="i-lucide-settings-2"
                label="Manage"
                variant="subtle"
                color="primary"
                size="xs"
                class="font-bold uppercase tracking-wider px-3"
                @click="manageVideos(row.original)"
              />

              <template #body>
                <div class="space-y-6">
                  <UTabs v-model="activeTab" :items="tabs" class="w-full" />
                  
                  <div v-if="activeTab === 0">
                    <StudioVideoSourceManager 
                      v-if="selectedEpisode"
                      :episode-id="selectedEpisode.id" 
                      :episode-number="selectedEpisode.number"
                      @close="isVideoModalOpen = false"
                      @saved="refresh"
                    />
                  </div>
                  <div v-else-if="activeTab === 1">
                    <StudioSubtitleManager 
                      v-if="selectedEpisode"
                      :episode-id="selectedEpisode.id"
                    />
                  </div>
                </div>
              </template>
            </UModal>
          </div>
        </template>
      </UTable>

      <div v-if="episodes.length === 0" class="py-24 text-center">
        <UIcon name="i-lucide-video-off" class="size-12 text-foreground/10 mb-4 mx-auto" />
        <p class="text-foreground/40 text-sm font-bold uppercase tracking-widest">No episodes found</p>
      </div>
    </div>

  </div>
</template>
