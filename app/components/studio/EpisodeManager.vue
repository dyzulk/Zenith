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

const columns = [{
  key: 'number',
  label: 'Ep'
}, {
  key: 'title',
  label: 'Title'
}, {
  key: 'source_count',
  label: 'Videos'
}, {
  key: 'actions',
  label: ''
}]
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

    <div class="glass-panel rounded-2xl overflow-hidden border border-white/5 bg-white/5">
      <UTable :rows="episodes" :columns="columns">
        <template #number-data="{ row }">
          <span class="font-black text-primary">#{{ row.number }}</span>
        </template>
        
        <template #title-data="{ row }">
          <span class="text-sm font-medium">{{ row.title }}</span>
        </template>

        <template #source_count-data="{ row }">
          <UBadge 
            :label="`${row.source_count} Sources`" 
            :color="row.source_count > 0 ? 'success' : 'warning'" 
            variant="subtle"
            size="sm"
          />
        </template>

        <template #actions-data="{ row }">
          <div class="flex justify-end gap-2">
            <UButton
              icon="i-lucide-settings-2"
              label="Manage Videos"
              variant="ghost"
              color="neutral"
              size="xs"
              class="font-bold"
              @click="toast.add({ title: 'Coming Soon', description: 'Video source management is next!' })"
            />
          </div>
        </template>
      </UTable>

      <div v-if="episodes.length === 0" class="py-20 text-center">
        <p class="text-foreground/40 text-sm italic">No episodes found for this anime.</p>
      </div>
    </div>

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
