<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps<{
  genre?: { id: number; name: string; slug: string }
}>()

const emit = defineEmits(['success'])

const schema = z.object({
  name: z.string().min(2, 'Nama genre terlalu pendek'),
  slug: z.string().min(2, 'Slug terlalu pendek').regex(/^[a-z0-9-]+$/, 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung')
})

type Schema = z.output<typeof schema>

const open = ref(false)
const isLoading = ref(false)
const toast = useToast()

const state = reactive({
  name: props.genre?.name || '',
  slug: props.genre?.slug || ''
})

// Auto-slug logic
watch(() => state.name, (val) => {
  if (!props.genre || !state.slug) {
    state.slug = val.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  try {
    const url = props.genre ? `/api/studio/genres/${props.genre.id}` : '/api/studio/genres'
    const method = props.genre ? 'PUT' : 'POST'
    
    await $fetch(url, {
      method,
      body: event.data
    })
    
    toast.add({
      title: 'Berhasil',
      description: `Genre berhasil ${props.genre ? 'diperbarui' : 'dibuat'}`,
      color: 'success'
    })
    
    open.value = false
    emit('success')
  } catch (e: any) {
    toast.add({
      title: 'Kesalahan',
      description: e.statusMessage || 'Gagal menyimpan genre',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UModal 
    v-model:open="open" 
    :title="genre ? 'Edit Genre' : 'Tambah Genre'" 
    :description="genre ? 'Ubah informasi genre yang sudah ada' : 'Buat genre baru untuk kategori anime'"
  >
    <slot>
      <UButton 
        :label="genre ? 'Edit' : 'Tambah Genre'" 
        :icon="genre ? 'i-lucide-edit' : 'i-lucide-plus'" 
        :color="genre ? 'neutral' : 'primary'" 
        :variant="genre ? 'ghost' : 'solid'"
        :size="genre ? 'xs' : 'sm'"
      />
    </slot>

    <template #body>
      <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-4">
        <UFormField label="Nama Genre" name="name" required>
          <UInput v-model="state.name" placeholder="Contoh: Action, Romance" class="w-full" />
        </UFormField>
        
        <UFormField label="Slug" name="slug" required help="Identifier unik untuk URL">
          <UInput v-model="state.slug" placeholder="contoh-action" class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-3 pt-4">
          <UButton label="Batal" variant="ghost" color="neutral" @click="open = false" />
          <UButton type="submit" :label="genre ? 'Simpan Perubahan' : 'Buat Genre'" color="primary" :loading="isLoading" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
