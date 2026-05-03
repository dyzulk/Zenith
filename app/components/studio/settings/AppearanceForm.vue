<script setup lang="ts">
const props = defineProps<{
  initialData: Record<string, string>
}>()

const emit = defineEmits(['save'])

const toast = useToast()
const isSaving = ref(false)

const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
const neutrals = ['slate', 'gray', 'zinc', 'neutral', 'stone']

const state = reactive({
  // Branding Assets
  site_logo_light: props.initialData.site_logo_light || '',
  site_logo_dark: props.initialData.site_logo_dark || '',
  site_favicon: props.initialData.site_favicon || '',
  
  // UI Colors
  ui_primary: props.initialData.ui_primary || 'green',
  ui_neutral: props.initialData.ui_neutral || 'zinc',
  
  // Layout & Style
  ui_radius: props.initialData.ui_radius || '0.5',
  ui_animations: props.initialData.ui_animations === 'false' ? false : true,
  ui_card_style: props.initialData.ui_card_style || 'bordered'
})

const onSave = async () => {
  isSaving.value = true
  try {
    await $fetch('/api/studio/settings/appearance', {
      method: 'POST',
      body: state
    })
    
    toast.add({ title: 'Success', description: 'Appearance and branding updated', color: 'success' })
    emit('save')
  } catch (e) {
    toast.add({ title: 'Error', description: 'Failed to save appearance settings', color: 'error' })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="space-y-12">
    <!-- Section: Site Branding -->
    <UPageCard title="Site Branding" description="Manage your site's visual identity assets.">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField label="Logo (Light Mode)" description="Visible on light backgrounds.">
          <UInput v-model="state.site_logo_light" placeholder="/logo-light.png" class="w-full" />
        </UFormField>

        <UFormField label="Logo (Dark Mode)" description="Visible on dark backgrounds.">
          <UInput v-model="state.site_logo_dark" placeholder="/logo-dark.png" class="w-full" />
        </UFormField>

        <UFormField label="Favicon" description="Recommended: 32x32px ICO or PNG.">
          <UInput v-model="state.site_favicon" placeholder="/favicon.ico" class="w-full" />
        </UFormField>
      </div>
    </UPageCard>

    <UDivider />

    <!-- Section: Color Palette -->
    <UPageCard title="Color Palette" description="Choose the main colors for the site interface.">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UFormField label="Primary Color" description="Used for buttons, links, and highlights.">
          <USelectMenu v-model="state.ui_primary" :items="colors" class="w-full">
            <template #leading>
              <div class="size-3 rounded-full" :class="`bg-${state.ui_primary}-500`" />
            </template>
          </USelectMenu>
        </UFormField>

        <UFormField label="Neutral Color" description="Used for backgrounds, borders, and text.">
          <USelectMenu v-model="state.ui_neutral" :items="neutrals" class="w-full">
            <template #leading>
              <div class="size-3 rounded-full" :class="`bg-${state.ui_neutral}-500`" />
            </template>
          </USelectMenu>
        </UFormField>
      </div>
    </UPageCard>

    <UDivider />

    <!-- Section: Layout & Style -->
    <UPageCard title="Layout & Style" description="Fine-tune the look and feel of components.">
      <template #footer>
        <div class="flex justify-end w-full">
          <UButton label="Save Changes" color="primary" :loading="isSaving" @click="onSave" />
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UFormField label="Border Radius" description="Control how rounded the corners are.">
          <div class="flex items-center gap-4 w-full">
            <URange v-model="state.ui_radius" :min="0" :max="1.5" :step="0.1" class="flex-1" />
            <span class="text-sm font-mono w-12 text-right">{{ state.ui_radius }}rem</span>
          </div>
        </UFormField>

        <UFormField label="Card Style" description="Choose between a flat or bordered look.">
          <USelectMenu 
            v-model="state.ui_card_style" 
            :items="[{ label: 'Bordered', value: 'bordered' }, { label: 'Flat', value: 'flat' }]" 
            value-attribute="value"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Animations" description="Enable smooth transitions and micro-interactions.">
          <USwitch v-model="state.ui_animations" />
        </UFormField>
      </div>
    </UPageCard>
  </div>
</template>
