<script setup lang="ts">
definePageMeta({
  layout: 'studio',
  middleware: 'studio-auth'
})

const toast = useToast()
const isLoading = ref(true)
const isSaving = ref(false)

const settings = reactive({
  comment_system: 'polling'
})

const tabs = [{
  label: 'Site Management',
  icon: 'i-lucide-globe'
}, {
  label: 'Preferences',
  icon: 'i-lucide-sliders-horizontal'
}]

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
  <UDashboardPanel id="settings">
    <template #header>
      <UDashboardNavbar title="Studio Settings" />
    </template>

    <template #body>
      <div class="p-8">
        <div v-if="isLoading" class="flex justify-center py-20">
          <UIcon name="i-lucide-loader-2" class="w-12 h-12 text-primary animate-spin" />
        </div>

        <UTabs v-else :items="tabs" class="w-full">
          <template #content="{ item }">
            <!-- Tab: Site Management -->
            <div v-if="item.label === 'Site Management'" class="mt-8 space-y-8 max-w-4xl">
              <section class="studio-card p-8 rounded-3xl border border-white/5 space-y-8 relative overflow-hidden">
                <div class="absolute top-0 right-0 p-8 opacity-5">
                  <UIcon name="i-lucide-message-square" class="w-24 h-24" />
                </div>

                <div class="space-y-2">
                  <h3 class="text-xl font-bold">Comment System</h3>
                  <p class="text-sm text-foreground/50">Choose how users interact in the discussion section.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    @click="settings.comment_system = 'polling'"
                    class="p-6 rounded-2xl border transition-all text-left space-y-3"
                    :class="settings.comment_system === 'polling' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-white/5 hover:bg-white/5'"
                  >
                    <div class="flex items-center justify-between">
                      <div class="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                        <UIcon name="i-lucide-refresh-cw" class="w-5 h-5 text-white/40" />
                      </div>
                      <UIcon v-if="settings.comment_system === 'polling'" name="i-lucide-check-circle-2" class="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 class="font-bold">HTTP Polling</h4>
                      <p class="text-[11px] text-foreground/40 leading-relaxed">
                        Safe for Free Tier. Fetches new comments every 10 seconds. No additional Cloudflare costs.
                      </p>
                    </div>
                  </button>

                  <button 
                    @click="settings.comment_system = 'websocket'"
                    class="p-6 rounded-2xl border transition-all text-left space-y-3"
                    :class="settings.comment_system === 'websocket' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-white/5 hover:bg-white/5'"
                  >
                    <div class="flex items-center justify-between">
                      <div class="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                        <UIcon name="i-lucide-zap" class="w-5 h-5 text-primary" />
                      </div>
                      <UIcon v-if="settings.comment_system === 'websocket'" name="i-lucide-check-circle-2" class="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 class="font-bold">Real-time (Durable Objects)</h4>
                      <p class="text-[11px] text-foreground/40 leading-relaxed">
                        Premium experience. Requires Cloudflare Paid Plan ($5/mo). Instant delivery via WebSockets.
                      </p>
                    </div>
                  </button>
                </div>

                <div class="pt-6 flex justify-end border-t border-white/5">
                  <UButton 
                    label="Save Changes" 
                    color="primary" 
                    size="lg" 
                    class="font-bold px-8"
                    :loading="isSaving"
                    @click="saveSetting('comment_system')"
                  />
                </div>
              </section>

              <!-- Future Settings -->
              <div class="p-8 border-2 border-dashed border-white/5 rounded-3xl text-center opacity-30">
                <p class="text-xs font-black uppercase tracking-widest">More Site Settings Coming Soon</p>
              </div>
            </div>

            <!-- Tab: Preferences -->
            <div v-else-if="item.label === 'Preferences'" class="mt-8 space-y-8 max-w-4xl">
              <div class="studio-card p-8 rounded-3xl border border-white/5 text-center py-20">
                <UIcon name="i-lucide-sliders-horizontal" class="w-12 h-12 text-foreground/20 mb-4 mx-auto" />
                <h4 class="font-bold">Studio Preferences</h4>
                <p class="text-sm text-foreground/40 mt-2">Manage your studio theme and notification settings here.</p>
              </div>
            </div>
          </template>
        </UTabs>
      </div>
    </template>
  </UDashboardPanel>
</template>
