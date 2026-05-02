<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'studio',
  middleware: 'studio-auth'
})

const route = useRoute()
const id = route.params.id as string
const toast = useToast()
const isLoading = ref(false)

const { 
  genres, 
  fetchGenres, 
  animeStatusOptions, 
  animeTypeOptions, 
  animeSeasonOptions 
} = useStudioData()

onMounted(fetchGenres)

const { data, status, refresh } = await useFetch<{ anime: any; genres: any[] }>(`/api/studio/anime/${id}`)
const anime = computed(() => data.value?.anime)
const animeGenres = computed(() => data.value?.genres || [])

const schema = z.object({
  title: z.string().min(2, 'Judul terlalu pendek'),
  slug: z.string().min(2, 'Slug terlalu pendek').regex(/^[a-z0-9-]+$/, 'Slug tidak valid'),
  synopsis: z.string().optional().nullable(),
  status: z.enum(['ongoing', 'completed', 'upcoming', 'hiatus']),
  type: z.enum(['TV', 'Movie', 'OVA', 'ONA', 'Special']),
  year: z.coerce.number().int().min(1900).max(2100),
  season: z.enum(['winter', 'spring', 'summer', 'fall']),
  poster_key: z.string().optional().nullable(),
  banner_key: z.string().optional().nullable(),
  score: z.coerce.number().min(0).max(10),
  genre_ids: z.array(z.number())
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: '',
  slug: '',
  synopsis: '',
  status: 'ongoing',
  type: 'TV',
  year: 2024,
  season: 'winter',
  poster_key: '',
  banner_key: '',
  score: 0,
  genre_ids: []
})

// Sync state with fetched data
watchEffect(() => {
  if (anime.value) {
    Object.assign(state, {
      title: anime.value.title || '',
      slug: anime.value.slug || '',
      synopsis: anime.value.synopsis || '',
      status: anime.value.status || 'ongoing',
      type: anime.value.type || 'TV',
      year: anime.value.year || 2024,
      season: anime.value.season || 'winter',
      poster_key: anime.value.poster_key || '',
      banner_key: anime.value.banner_key || '',
      score: anime.value.score || 0,
      genre_ids: animeGenres.value.map((g: any) => g.id)
    })
  }
})

async function onUpdate(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  try {
    await $fetch(`/api/studio/anime/${id}`, {
      method: 'PUT',
      body: event.data
    })
    toast.add({
      title: 'Berhasil',
      description: 'Perubahan telah disimpan',
      color: 'success'
    })
    await refresh()
  } catch (e: any) {
    toast.add({
      title: 'Kesalahan',
      description: e.statusMessage || 'Gagal menyimpan perubahan',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}

const isGeneratingSeo = ref(false)
async function generateSeo() {
  if (!state.title) {
    toast.add({ title: 'Judul Diperlukan', description: 'Silakan masukkan judul anime terlebih dahulu.', color: 'warning' })
    return
  }
  isGeneratingSeo.value = true
  try {
    const res: any = await $fetch(`/api/studio/anime/${id}/seo-generate`, {
      method: 'POST',
      body: {
        title: state.title,
        type: state.type,
        genres: genres.value.filter((g: any) => state.genre_ids?.includes(g.id)).map((g: any) => g.name)
      }
    })
    if (res.synopsis) {
      state.synopsis = res.synopsis
      toast.add({ title: 'Berhasil', description: 'Sinopsis SEO telah dihasilkan via AI', color: 'success' })
    }
  } catch (e: any) {
    toast.add({ title: 'Kesalahan', description: e.statusMessage || 'Gagal menghasilkan teks via AI', color: 'error' })
  } finally {
    isGeneratingSeo.value = false
  }
}

const tabs = [{ label: 'Informasi Umum', icon: 'i-lucide-info', slot: 'general' }, { label: 'Manajemen Episode', icon: 'i-lucide-list-video', slot: 'episodes' }]
</script>

<template>
  <UDashboardPanel id="anime-edit">
    <template #header>
      <UDashboardNavbar :title="status === 'pending' ? 'Memuat...' : `Edit: ${state.title}`">
        <template #leading>
          <UButton icon="i-lucide-arrow-left" variant="ghost" color="neutral" to="/studio/anime" />
        </template>
        <template #right>
          <UButton label="Lihat di Situs" icon="i-lucide-external-link" variant="ghost" color="neutral" :to="`/anime/${state.slug}`" target="_blank" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UTabs :items="tabs" class="w-full" :ui="{ list: 'px-4 border-b border-default' }">
        <template #general>
          <div class="p-4 lg:p-8">
            <UForm :schema="schema" :state="state" @submit="onUpdate" class="pb-24">
              <UPageCard title="Detail Anime" description="Perbarui informasi teknis dan metadata anime." variant="naked" orientation="horizontal" class="mb-4">
                <div class="flex items-center gap-3 lg:ms-auto">
                  <UButton type="submit" label="Simpan Perubahan" color="primary" :loading="isLoading" />
                </div>
              </UPageCard>

              <UPageCard variant="subtle" class="flex flex-col gap-6">
                <UFormField name="title" label="Judul Anime" required class="flex max-sm:flex-col justify-between items-start gap-4" :ui="{ container: 'w-full max-w-md' }">
                  <UInput v-model="state.title" class="w-full" />
                </UFormField>

                <USeparator />

                <UFormField name="slug" label="URL Slug" required class="flex max-sm:flex-col justify-between items-start gap-4" :ui="{ container: 'w-full max-w-md' }">
                  <UInput v-model="state.slug" class="w-full" />
                </UFormField>

                <USeparator />

                <UFormField name="synopsis" label="Sinopsis (SEO)" class="flex max-sm:flex-col justify-between items-start gap-4" :ui="{ container: 'w-full max-w-md' }">
                  <template #hint>
                    <UButton icon="i-lucide-sparkles" label="AI Generate" size="xs" color="primary" variant="soft" :loading="isGeneratingSeo" @click="generateSeo" />
                  </template>
                  <UTextarea v-model="state.synopsis" :rows="6" class="w-full" placeholder="Masukkan deskripsi anime..." />
                </UFormField>

                <USeparator />

                <UFormField name="genre_ids" label="Genre" description="Pilih satu atau lebih kategori" class="flex max-sm:flex-col justify-between items-start gap-4" :ui="{ container: 'w-full max-w-md' }">
                  <USelectMenu
                    v-model="state.genre_ids"
                    :items="genres"
                    value-key="id"
                    label-key="name"
                    multiple
                    searchable
                    placeholder="Pilih genre..."
                    class="w-full"
                  >
                    <template #default="{ modelValue }">
                      <div v-if="modelValue?.length" class="flex flex-wrap gap-1">
                        <UBadge v-for="id in modelValue" :key="id" :label="genres.find(g => g.id === id)?.name || id" size="xs" variant="subtle" color="primary" />
                      </div>
                      <span v-else class="text-muted">Pilih genre...</span>
                    </template>
                  </USelectMenu>
                </UFormField>

                <USeparator />

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <UFormField name="status" label="Status" required>
                    <USelectMenu v-model="state.status" :items="animeStatusOptions" value-key="value" label-key="label" searchable class="w-full capitalize" />
                  </UFormField>
                  <UFormField name="type" label="Tipe" required>
                    <USelectMenu v-model="state.type" :items="animeTypeOptions" value-key="value" label-key="label" searchable class="w-full" />
                  </UFormField>
                  <UFormField name="year" label="Tahun" required>
                    <UInput v-model="state.year" type="number" class="w-full" />
                  </UFormField>
                  <UFormField name="season" label="Musim" required>
                    <USelectMenu v-model="state.season" :items="animeSeasonOptions" value-key="value" label-key="label" searchable class="w-full capitalize" />
                  </UFormField>
                </div>

                <USeparator />

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                  <div class="space-y-4">
                    <StudioImageUpload 
                      v-model="state.poster_key" 
                      label="Poster" 
                      description="Aspek Rasio 2:3 (Portrait). Digunakan pada kartu anime dan hasil pencarian."
                      :aspect-ratio="2/3"
                      :max-resolution="{ width: 800, height: 1200 }"
                      :path-prefix="`anime/${id}`"
                    />
                  </div>
                  <div class="space-y-4">
                    <StudioImageUpload 
                      v-model="state.banner_key" 
                      label="Banner" 
                      description="Aspek Rasio 16:9 (Landscape). Digunakan sebagai latar belakang halaman detail."
                      :aspect-ratio="16/9"
                      :max-resolution="{ width: 1920, height: 1080 }"
                      :path-prefix="`anime/${id}`"
                    />
                  </div>
                </div>
              </UPageCard>
            </UForm>
          </div>
        </template>

        <template #episodes>
          <div class="p-4 lg:p-8">
            <StudioEpisodeManager :anime-id="id" />
          </div>
        </template>
      </UTabs>
    </template>
  </UDashboardPanel>
</template>
