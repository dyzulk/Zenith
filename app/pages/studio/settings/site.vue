<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast()
const isLoading = ref(true)
const isSaving = ref(false)

const schema = z.object({
  comment_system: z.enum(['polling', 'websocket'])
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  comment_system: 'polling'
})

const fetchSettings = async () => {
  isLoading.value = true
  try {
    const data: any = await $fetch('/api/studio/settings')
    if (data.settings?.comment_system) {
      state.comment_system = data.settings.comment_system
    }
  } catch (e) {
    toast.add({ title: 'Kesalahan', description: 'Gagal memuat pengaturan', color: 'error' })
  } finally {
    isLoading.value = false
  }
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isSaving.value = true
  try {
    await $fetch('/api/studio/settings', {
      method: 'POST',
      body: {
        key: 'comment_system',
        value: event.data.comment_system
      }
    })
    toast.add({ title: 'Berhasil', description: 'Pengaturan situs telah diperbarui', color: 'success' })
  } catch (e) {
    toast.add({ title: 'Kesalahan', description: 'Gagal menyimpan perubahan', color: 'error' })
  } finally {
    isSaving.value = false
  }
}

onMounted(fetchSettings)

const commentOptions = [
  { 
    label: 'HTTP Polling', 
    value: 'polling', 
    description: 'Mengambil komentar baru setiap 10 detik. Hemat sumber daya, cocok untuk Free Tier.' 
  },
  { 
    label: 'Real-time (WebSocket)', 
    value: 'websocket', 
    description: 'Update instan via WebSockets. Memerlukan infrastruktur berbayar (Durable Objects).' 
  }
]
</script>

<template>
  <div class="w-full h-full">
    <div v-if="isLoading" class="flex items-center justify-center py-24">
      <UIcon name="i-lucide-loader-2" class="size-8 text-primary animate-spin" />
    </div>

    <UForm v-else :schema="schema" :state="state" @submit="onSubmit">
      <UPageCard
        title="Manajemen Situs"
        description="Konfigurasi global untuk platform ZenithStream."
        variant="naked"
        orientation="horizontal"
        class="mb-4"
      >
        <UButton 
          type="submit"
          label="Simpan Perubahan" 
          color="primary" 
          :loading="isSaving"
          class="w-fit lg:ms-auto"
        />
      </UPageCard>

      <UPageCard variant="subtle">
        <UFormField
          name="comment_system"
          label="Sistem Komentar"
          description="Pilih metode pengiriman pesan real-time untuk player."
          class="flex max-sm:flex-col justify-between items-start gap-4"
          :ui="{ container: 'w-full max-w-md' }"
        >
          <div class="grid grid-cols-1 gap-4 w-full">
            <button 
              v-for="option in commentOptions"
              :key="option.value"
              type="button"
              @click="state.comment_system = (option.value as any)"
              class="p-4 rounded-xl border transition-all text-left space-y-1 group"
              :class="state.comment_system === option.value ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-default hover:bg-elevated/50'"
            >
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold" :class="state.comment_system === option.value ? 'text-primary' : 'text-foreground'">{{ option.label }}</span>
                <UIcon v-if="state.comment_system === option.value" name="i-lucide-check-circle-2" class="size-4 text-primary" />
              </div>
              <p class="text-[11px] text-muted leading-relaxed">
                {{ option.description }}
              </p>
            </button>
          </div>
        </UFormField>
      </UPageCard>
    </UForm>
  </div>
</template>
