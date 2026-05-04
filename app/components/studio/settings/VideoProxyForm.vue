<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps<{
  initialData: Record<string, string>
}>()

const emit = defineEmits(['save'])

const toast = useToast()
const isSaving = ref(false)

const schema = z.object({
  video_proxy_enabled: z.boolean().default(false)
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  video_proxy_enabled: props.initialData.video_proxy_enabled === 'true'
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isSaving.value = true
  try {
    await $fetch('/api/studio/settings/core', {
      method: 'POST',
      body: event.data
    })
    
    toast.add({ title: 'Success', description: 'Video proxy settings updated', color: 'success' })
    emit('save')
  } catch (e) {
    toast.add({ title: 'Error', description: 'Failed to save video proxy settings', color: 'error' })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-8">
    <UPageCard title="Video Infrastructure" description="Optimize video delivery and security.">
      <div class="space-y-6">
        <UFormField 
          name="video_proxy_enabled" 
          label="Enable Video Proxy" 
          description="Serve video files through the server to bypass CORS and hide storage URLs. Disable for better performance/direct CDN access."
        >
          <UToggle v-model="state.video_proxy_enabled" />
        </UFormField>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <UButton type="submit" label="Update Proxy Config" color="primary" :loading="isSaving" />
        </div>
      </template>
    </UPageCard>
  </UForm>
</template>
