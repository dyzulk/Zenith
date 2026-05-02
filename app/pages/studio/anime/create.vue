<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'studio',
  middleware: 'studio-auth'
})

const schema = z.object({
  title: z.string().min(2, 'Judul terlalu pendek'),
  slug: z.string().min(2, 'Slug terlalu pendek').regex(/^[a-z0-9-]+$/, 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung'),
  synopsis: z.string().optional(),
  status: z.enum(['ongoing', 'completed', 'upcoming', 'hiatus']),
  type: z.enum(['TV', 'Movie', 'OVA', 'ONA', 'Special']),
  year: z.coerce.number().int().min(1900).max(2100),
  season: z.enum(['winter', 'spring', 'summer', 'fall'])
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: '',
  slug: '',
  synopsis: '',
  status: 'ongoing',
  type: 'TV',
  year: new Date().getFullYear(),
  season: 'winter'
})

const statusOptions = ['ongoing', 'completed', 'upcoming', 'hiatus']
const typeOptions = ['TV', 'Movie', 'OVA', 'ONA', 'Special']
const seasonOptions = ['winter', 'spring', 'summer', 'fall']

const isLoading = ref(false)
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  try {
    await $fetch('/api/studio/anime/create', {
      method: 'POST',
      body: event.data
    })
    toast.add({
      title: 'Berhasil',
      description: 'Anime berhasil ditambahkan ke database',
      color: 'success'
    })
    await navigateTo('/studio/anime')
  } catch (e: any) {
    toast.add({
      title: 'Kesalahan',
      description: e.statusMessage || 'Gagal menyimpan anime',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}

// Auto-generate slug
watch(() => state.title, (newTitle) => {
  if (newTitle && (!state.slug || state.slug === state.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''))) {
    state.slug = newTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  }
})
</script>

<template>
  <UDashboardPanel id="anime-create">
    <template #header>
      <UDashboardNavbar title="Tambah Anime Baru">
        <template #leading>
          <UButton
            icon="i-lucide-arrow-left"
            variant="ghost"
            color="neutral"
            to="/studio/anime"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        @submit="onSubmit"
        class="pb-24"
      >
        <UPageCard
          title="Informasi Dasar"
          description="Lengkapi detail utama anime untuk ditampilkan di situs."
          variant="naked"
          orientation="horizontal"
          class="mb-4"
        >
          <div class="flex items-center gap-3 lg:ms-auto">
            <UButton
              label="Batal"
              variant="ghost"
              color="neutral"
              to="/studio/anime"
            />
            <UButton
              type="submit"
              label="Buat Anime"
              color="primary"
              :loading="isLoading"
            />
          </div>
        </UPageCard>

        <UPageCard variant="subtle" class="flex flex-col gap-6">
          <UFormField
            name="title"
            label="Judul Anime"
            description="Nama resmi anime yang akan muncul sebagai judul utama."
            required
            class="flex max-sm:flex-col justify-between items-start gap-4"
            :ui="{ container: 'w-full max-w-md' }"
          >
            <UInput v-model="state.title" class="w-full" placeholder="Contoh: Solo Leveling" />
          </UFormField>

          <USeparator />

          <UFormField
            name="slug"
            label="URL Slug"
            description="Identifier unik yang digunakan dalam URL situs."
            required
            class="flex max-sm:flex-col justify-between items-start gap-4"
            :ui="{ container: 'w-full max-w-md' }"
          >
            <UInput v-model="state.slug" class="w-full" placeholder="contoh-solo-leveling" />
          </UFormField>

          <USeparator />

          <UFormField
            name="synopsis"
            label="Sinopsis"
            description="Deskripsi singkat mengenai jalan cerita anime ini."
            class="flex max-sm:flex-col justify-between items-start gap-4"
            :ui="{ container: 'w-full max-w-md' }"
          >
            <UTextarea v-model="state.synopsis" :rows="6" class="w-full" placeholder="Masukkan deskripsi anime..." />
          </UFormField>

          <USeparator />

          <UFormField
            name="status"
            label="Status Rilis"
            description="Kondisi penayangan anime saat ini."
            required
            class="flex max-sm:flex-col justify-between items-start gap-4"
            :ui="{ container: 'w-full max-w-md' }"
          >
            <USelectMenu v-model="state.status" :options="statusOptions" class="w-full capitalize" />
          </UFormField>

          <USeparator />

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UFormField
              name="type"
              label="Tipe"
              required
            >
              <USelectMenu v-model="state.type" :options="typeOptions" class="w-full" />
            </UFormField>

            <UFormField
              name="year"
              label="Tahun Rilis"
              required
            >
              <UInput v-model="state.year" type="number" class="w-full" />
            </UFormField>

            <UFormField
              name="season"
              label="Musim"
              required
            >
              <USelectMenu v-model="state.season" :options="seasonOptions" class="w-full capitalize" />
            </UFormField>
          </div>
        </UPageCard>
      </UForm>
    </template>
  </UDashboardPanel>
</template>
