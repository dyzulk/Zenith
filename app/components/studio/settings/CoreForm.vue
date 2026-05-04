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
  comment_system: z.enum(['polling', 'websocket']),
  pusher_app_id: z.string().optional(),
  pusher_key: z.string().optional(),
  pusher_secret: z.string().optional(),
  pusher_cluster: z.string().optional(),
  
  storage_driver: z.enum(['r2_binding', 's3_api']),
  s3_endpoint: z.string().optional(),
  s3_access_key: z.string().optional(),
  s3_secret_key: z.string().optional(),
  s3_bucket: z.string().optional(),
  r2_public_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  transcoding_strategy: z.enum(['client', 'server', 'direct']),
  video_proxy_enabled: z.boolean().default(true)
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  comment_system: (props.initialData.comment_system as any) || 'polling',
  pusher_app_id: props.initialData.pusher_app_id || '',
  pusher_key: props.initialData.pusher_key || '',
  pusher_secret: props.initialData.pusher_secret || '',
  pusher_cluster: props.initialData.pusher_cluster || 'mt1',
  
  storage_driver: (props.initialData.storage_driver as any) || 'r2_binding',
  s3_endpoint: props.initialData.s3_endpoint || '',
  s3_access_key: props.initialData.s3_access_key || '',
  s3_secret_key: props.initialData.s3_secret_key || '',
  s3_bucket: props.initialData.s3_bucket || '',
  r2_public_url: props.initialData.r2_public_url || '',
  transcoding_strategy: (props.initialData.transcoding_strategy as any) || 'client',
  video_proxy_enabled: props.initialData.video_proxy_enabled === 'true'
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isSaving.value = true
  try {
    await $fetch('/api/studio/settings/core', {
      method: 'POST',
      body: event.data
    })
    
    toast.add({ title: 'Success', description: 'Core system settings updated', color: 'success' })
    emit('save')
  } catch (e) {
    toast.add({ title: 'Error', description: 'Failed to save core settings', color: 'error' })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-8">
    <!-- Section: Real-time Engine -->
    <UPageCard title="Real-time Engine" description="Configure how the platform handles live interactions.">
      <div class="space-y-6">
        <UFormField name="comment_system" label="Comment Sync Mode" description="Method for syncing real-time comments.">
          <USelectMenu 
            v-model="state.comment_system" 
            :items="[{ label: 'HTTP Polling (Safe)', value: 'polling' }, { label: 'WebSocket (Pusher)', value: 'websocket' }]" 
            value-attribute="value"
            class="w-full"
          />
        </UFormField>

        <div v-if="state.comment_system === 'websocket'" class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <UFormField name="pusher_app_id" label="Pusher App ID">
            <UInput v-model="state.pusher_app_id" placeholder="123456" />
          </UFormField>
          <UFormField name="pusher_key" label="Pusher Key">
            <UInput v-model="state.pusher_key" placeholder="abc-123" />
          </UFormField>
          <UFormField name="pusher_secret" label="Pusher Secret">
            <UInput v-model="state.pusher_secret" type="password" placeholder="••••••••" />
          </UFormField>
          <UFormField name="pusher_cluster" label="Pusher Cluster">
            <UInput v-model="state.pusher_cluster" placeholder="mt1" />
          </UFormField>
        </div>
      </div>

        <div class="flex justify-end pt-6 border-t border-default mt-6">
          <UButton type="submit" label="Save Real-time Config" color="primary" :loading="isSaving" />
        </div>
    </UPageCard>

    <UDivider />

    <!-- Section: Media & Storage -->
    <UPageCard title="Media & Storage Pipeline" description="Configure asset delivery and processing.">
      <div class="space-y-6">
        <UFormField name="storage_driver" label="Storage Driver" description="Choose how the system interacts with storage.">
          <USelectMenu 
            v-model="state.storage_driver" 
            :items="[{ label: 'Cloudflare R2 Binding (Native)', value: 'r2_binding' }, { label: 'S3 Compatible API (Generic)', value: 's3_api' }]" 
            value-attribute="value"
            class="w-full"
          />
        </UFormField>

        <!-- S3 API Configuration -->
        <div v-if="state.storage_driver === 's3_api'" class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <UFormField name="s3_endpoint" label="S3 Endpoint">
            <UInput v-model="state.s3_endpoint" placeholder="https://<account-id>.r2.cloudflarestorage.com" />
          </UFormField>
          <UFormField name="s3_bucket" label="Bucket Name">
            <UInput v-model="state.s3_bucket" placeholder="GoxStream-assets" />
          </UFormField>
          <UFormField name="s3_access_key" label="Access Key ID">
            <UInput v-model="state.s3_access_key" placeholder="••••••••" />
          </UFormField>
          <UFormField name="s3_secret_key" label="Secret Access Key">
            <UInput v-model="state.s3_secret_key" type="password" placeholder="••••••••" />
          </UFormField>
        </div>

        <!-- R2 Binding Help -->
        <UAlert 
          v-if="state.storage_driver === 'r2_binding'"
          icon="i-lucide-info"
          color="primary"
          variant="subtle"
          title="R2 Binding Active"
          description="System will use the native R2 bucket binding (R2_BUCKET) defined in your wrangler.toml or Cloudflare Dashboard. This offers the best performance."
        />

        <UFormField name="r2_public_url" label="Public Asset URL" description="The base URL used to serve public files (CDN).">
          <UInput v-model="state.r2_public_url" placeholder="https://pub-xyz.r2.dev" class="w-full" />
        </UFormField>

        <UFormField name="transcoding_strategy" label="Transcoding Strategy" description="Processing method for video uploads.">
          <USelectMenu 
            v-model="state.transcoding_strategy" 
            :items="[
              { label: 'Client-side (WASM)', value: 'client' }, 
              { label: 'Server-side (API)', value: 'server' },
              { label: 'Direct (No Transcode)', value: 'direct' }
            ]" 
            value-attribute="value"
            class="w-full"
          />
        </UFormField>

        <UFormField name="video_proxy_enabled" label="Enable Video Proxy" description="Serve video files through the server to bypass CORS and hide storage URLs. Disable for better performance/direct CDN access.">
          <UToggle v-model="state.video_proxy_enabled" />
        </UFormField>
      </div>

        <div class="flex justify-end pt-6 border-t border-default mt-6">
          <UButton type="submit" label="Save Storage Config" color="primary" :loading="isSaving" />
        </div>
    </UPageCard>
  </UForm>
</template>
