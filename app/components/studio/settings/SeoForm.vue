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
  site_title: z.string().min(1, 'Title is required'),
  site_description: z.string().optional(),
  site_keywords: z.string().optional(),
  og_title: z.string().optional(),
  og_description: z.string().optional(),
  og_image: z.string().optional(),
  google_site_verification: z.string().optional(),
  bing_site_verification: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  site_title: props.initialData.site_title || '',
  site_description: props.initialData.site_description || '',
  site_keywords: props.initialData.site_keywords || '',
  og_title: props.initialData.og_title || '',
  og_description: props.initialData.og_description || '',
  og_image: props.initialData.og_image || '',
  google_site_verification: props.initialData.google_site_verification || '',
  bing_site_verification: props.initialData.bing_site_verification || ''
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isSaving.value = true
  try {
    const payload = Object.entries(event.data).map(([key, value]) => ({
      key,
      value: value || ''
    }))
    
    await $fetch('/api/studio/settings/bulk', {
      method: 'POST',
      body: { settings: payload }
    })
    
    toast.add({ title: 'Success', description: 'SEO settings updated', color: 'success' })
    emit('save')
  } catch (e) {
    toast.add({ title: 'Error', description: 'Failed to save SEO settings', color: 'error' })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-8">
    <UPageCard title="General SEO" description="Optimize how your site appears in search engines.">
      <template #footer>
        <div class="flex justify-end w-full">
          <UButton type="submit" label="Save SEO Settings" color="primary" :loading="isSaving" />
        </div>
      </template>

      <div class="space-y-4">
        <UFormField name="site_title" label="Site Title" description="Main title for your platform.">
          <UInput v-model="state.site_title" class="w-full" />
        </UFormField>

        <UFormField name="site_description" label="Site Description">
          <UTextarea v-model="state.site_description" class="w-full" :rows="3" />
        </UFormField>

        <UFormField name="site_keywords" label="Keywords" description="Separate with commas.">
          <UInput v-model="state.site_keywords" placeholder="anime, streaming, zenith" class="w-full" />
        </UFormField>
      </div>
    </UPageCard>

    <UPageCard title="Social Media (Open Graph)" description="Customize preview cards for social platforms.">
      <div class="space-y-4">
        <UFormField name="og_title" label="OG Title">
          <UInput v-model="state.og_title" class="w-full" />
        </UFormField>

        <UFormField name="og_description" label="OG Description">
          <UTextarea v-model="state.og_description" class="w-full" :rows="3" />
        </UFormField>

        <UFormField name="og_image" label="OG Image URL">
          <UInput v-model="state.og_image" placeholder="https://..." class="w-full" />
        </UFormField>
      </div>
    </UPageCard>

    <UPageCard title="Webmaster Tools" description="Verify site ownership with search engines.">
      <div class="space-y-4">
        <UFormField name="google_site_verification" label="Google Search Console ID">
          <UInput v-model="state.google_site_verification" placeholder="google-site-verification=..." class="w-full" />
        </UFormField>

        <UFormField name="bing_site_verification" label="Bing Webmaster ID">
          <UInput v-model="state.bing_site_verification" class="w-full" />
        </UFormField>
      </div>
    </UPageCard>
  </UForm>
</template>
