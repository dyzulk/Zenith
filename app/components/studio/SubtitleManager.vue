<script setup lang="ts">
import { Trash2, Plus, Languages, Loader2 } from 'lucide-vue-next'

const props = defineProps<{
  episodeId: string
}>()

const toast = useToast()
const subtitles = ref<any[]>([])
const isLoading = ref(false)
const isAdding = ref(false)

const newSub = reactive({
  language: '',
  label: '',
  fileKey: ''
})

const fetchSubtitles = async () => {
  isLoading.value = true
  try {
    const data: any = await $fetch(`/api/studio/episode/${props.episodeId}/subtitles`)
    subtitles.value = data.subtitles || []
  } catch (e) {
    console.error('Failed to fetch subtitles')
  } finally {
    isLoading.value = false
  }
}

const addSubtitle = async () => {
  if (!newSub.language || !newSub.label || !newSub.fileKey) return
  
  isAdding.value = true
  try {
    await $fetch(`/api/studio/episode/${props.episodeId}/subtitles`, {
      method: 'POST',
      body: newSub
    })
    toast.add({ title: 'Success', description: 'Subtitle added', color: 'success' })
    Object.assign(newSub, { language: '', label: '', fileKey: '' })
    await fetchSubtitles()
  } catch (e: any) {
    toast.add({ title: 'Error', description: e.statusMessage || 'Failed to add subtitle', color: 'error' })
  } finally {
    isAdding.value = false
  }
}

const deleteSubtitle = async (subId: string) => {
  try {
    await $fetch(`/api/studio/episode/${props.episodeId}/subtitles`, {
      method: 'DELETE',
      body: { id: subId }
    })
    toast.add({ title: 'Deleted', description: 'Subtitle removed', color: 'neutral' })
    await fetchSubtitles()
  } catch (e) {
    toast.add({ title: 'Error', description: 'Failed to delete subtitle', color: 'error' })
  }
}

onMounted(fetchSubtitles)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-black uppercase tracking-widest text-foreground/40">Subtitles (VTT)</h3>
      <UBadge :label="`${subtitles.length} Tracks`" variant="subtle" size="xs" />
    </div>

    <!-- List -->
    <div v-if="isLoading" class="flex justify-center py-8">
      <Loader2 class="w-6 h-6 text-primary animate-spin" />
    </div>
    
    <div v-else-if="subtitles.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="sub in subtitles" 
        :key="sub.id"
        class="studio-card p-4 rounded-xl flex items-center justify-between border border-white/5 bg-white/5"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Languages class="w-4 h-4 text-primary" />
          </div>
          <div>
            <div class="text-xs font-bold">{{ sub.label }}</div>
            <div class="text-[10px] text-foreground/40 font-mono">{{ sub.language }} • {{ sub.fileKey }}</div>
          </div>
        </div>
        <button 
          @click="deleteSubtitle(sub.id)"
          class="p-2 hover:text-red-500 transition-colors"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>

    <div v-else class="p-8 text-center text-xs text-foreground/20 italic border-2 border-dashed border-white/5 rounded-2xl">
      No subtitles found for this episode.
    </div>

    <!-- Add Form -->
    <div class="studio-card p-6 rounded-2xl border border-primary/20 bg-primary/5 space-y-4">
      <div class="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
        <Plus class="w-3 h-3" /> Add New Subtitle Track
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UFormField label="Language Code (id, en, ja)">
          <UInput v-model="newSub.language" placeholder="id" />
        </UFormField>
        <UFormField label="Label (e.g. Indonesia)">
          <UInput v-model="newSub.label" placeholder="Indonesia" />
        </UFormField>
        <UFormField label="Storage Key / Path">
          <UInput v-model="newSub.fileKey" placeholder="subtitles/ep1/id.vtt" />
        </UFormField>
      </div>

      <div class="flex justify-end pt-2">
        <UButton 
          label="Add Track" 
          icon="i-lucide-plus"
          size="sm" 
          class="font-bold"
          :loading="isAdding"
          @click="addSubtitle"
        />
      </div>
    </div>
  </div>
</template>
