<script setup lang="ts">
const props = defineProps<{
  episodeId: string
  episodeNumber: number
}>()

const emit = defineEmits(['close', 'saved'])

const qualities = ['360p', '480p', '720p', '1080p']
const state = reactive({
  sources: qualities.map(q => ({ quality: q, url: '', type: 'mp4' }))
})

const isLoading = ref(false)
const isFetching = ref(true)
const toast = useToast()

// Fetch existing sources
onMounted(async () => {
  try {
    const data: any = await $fetch(`/api/studio/episode/${props.episodeId}/sources`)
    if (data.sources) {
      data.sources.forEach((s: any) => {
        const index = state.sources.findIndex(item => item.quality === s.quality)
        if (index !== -1) {
          state.sources[index].url = s.url
          state.sources[index].type = s.type || 'mp4'
        }
      })
    }
  } catch (e) {
    console.error('Failed to fetch sources', e)
  } finally {
    isFetching.value = false
  }
})

async function onSave() {
  isLoading.value = true
  try {
    await $fetch(`/api/studio/episode/${props.episodeId}/sources`, {
      method: 'POST',
      body: { sources: state.sources.filter(s => s.url.trim() !== '') }
    })
    toast.add({ title: 'Success', description: 'Video sources updated', color: 'success' })
    emit('saved')
    emit('close')
  } catch (e: any) {
    toast.add({ title: 'Error', description: e.statusMessage, color: 'error' })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
    <div class="space-y-6">
      <div v-if="isFetching" class="flex justify-center py-10">
        <span class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
      
      <UForm v-else :state="state" @submit="onSave" class="space-y-6">
        <div v-for="(source, index) in state.sources" :key="source.quality" class="space-y-3">
          <div class="flex items-center justify-between px-1">
            <label class="text-[10px] font-black uppercase tracking-widest text-primary">{{ source.quality }} SOURCE</label>
            <UBadge :label="source.type" size="xs" color="primary" variant="subtle" class="font-black" />
          </div>
          <UInput 
            v-model="state.sources[index].url" 
            placeholder="https://cdn.example.com/video.mp4" 
            icon="i-lucide-link"
          />
        </div>

        <div class="pt-6 flex justify-end gap-3 border-t border-white/5">
          <UButton label="Discard" variant="ghost" color="neutral" @click="$emit('close')" class="font-bold" />
          <UButton type="submit" label="Save All Sources" color="primary" :loading="isLoading" class="px-6 font-bold" />
        </div>
      </UForm>
    </div>
</template>
