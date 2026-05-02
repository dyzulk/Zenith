<script setup lang="ts">
const toast = useToast()
const isLoading = ref(true)
const isSaving = ref(false)

const settings = reactive({
  comment_system: 'polling'
})

const fetchSettings = async () => {
  isLoading.value = true
  try {
    const data: any = await $fetch('/api/studio/settings')
    if (data.settings.comment_system) {
      settings.comment_system = data.settings.comment_system
    }
  } catch (e) {
    toast.add({ title: 'Error', description: 'Failed to load settings', color: 'error' })
  } finally {
    isLoading.value = false
  }
}

const saveSetting = async (key: keyof typeof settings) => {
  isSaving.value = true
  try {
    await $fetch('/api/studio/settings', {
      method: 'POST',
      body: {
        key,
        value: settings[key]
      }
    })
    toast.add({ title: 'Success', description: 'Settings updated', color: 'success' })
  } catch (e) {
    toast.add({ title: 'Error', description: 'Failed to save', color: 'error' })
  } finally {
    isSaving.value = false
  }
}

onMounted(fetchSettings)
</script>

<template>
  <div class="space-y-8 max-w-4xl">
    <UPageCard
      title="Site Management"
      description="Global configurations for the Zenith platform."
      variant="naked"
      orientation="horizontal"
    >
       <UButton 
        label="Save Changes" 
        color="neutral" 
        :loading="isSaving"
        @click="saveSetting('comment_system')"
      />
    </UPageCard>

    <UPageCard variant="subtle">
      <div v-if="isLoading" class="flex justify-center py-10">
        <UIcon name="i-lucide-loader-2" class="w-8 h-8 text-primary animate-spin" />
      </div>
      
      <div v-else class="space-y-8">
        <div class="space-y-4">
          <label class="text-sm font-bold flex items-center gap-2">
            <UIcon name="i-lucide-message-square" class="w-4 h-4 text-primary" />
            Comment System
          </label>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              @click="settings.comment_system = 'polling'"
              class="p-4 rounded-xl border transition-all text-left space-y-2"
              :class="settings.comment_system === 'polling' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-default hover:bg-elevated/50'"
            >
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold">HTTP Polling</h4>
                <UIcon v-if="settings.comment_system === 'polling'" name="i-lucide-check-circle-2" class="w-4 h-4 text-primary" />
              </div>
              <p class="text-[11px] text-muted leading-relaxed">
                Fetches new comments every 10s. Works on Free Tier.
              </p>
            </button>

            <button 
              @click="settings.comment_system = 'websocket'"
              class="p-4 rounded-xl border transition-all text-left space-y-2"
              :class="settings.comment_system === 'websocket' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-default hover:bg-elevated/50'"
            >
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold">Real-time (DO)</h4>
                <UIcon v-if="settings.comment_system === 'websocket'" name="i-lucide-check-circle-2" class="w-4 h-4 text-primary" />
              </div>
              <p class="text-[11px] text-muted leading-relaxed">
                Instant updates via WebSockets. Requires Paid Plan.
              </p>
            </button>
          </div>
        </div>
      </div>
    </UPageCard>
  </div>
</template>
