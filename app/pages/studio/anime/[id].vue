<script setup lang="ts">
definePageMeta({
  layout: 'studio',
  middleware: 'studio-auth'
})

const route = useRoute()
const id = route.params.id as string
const toast = useToast()
const isLoading = ref(false)

const { data, refresh } = await useFetch(`/api/studio/anime/${id}`)
const anime = computed(() => data.value?.anime)

const state = reactive({
  title: '',
  slug: '',
  synopsis: '',
  status: 'ongoing',
  type: 'TV',
  year: 2024,
  season: 'winter',
  poster_key: '',
  banner_key: '',
  score: 0
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
      score: anime.value.score || 0
    })
  }
})

const statusOptions = ['ongoing', 'completed', 'upcoming', 'hiatus']
const typeOptions = ['TV', 'Movie', 'OVA', 'ONA', 'Special']
const seasonOptions = ['winter', 'spring', 'summer', 'fall']

async function onUpdate() {
  isLoading.value = true
  try {
    await $fetch(`/api/studio/anime/${id}`, {
      method: 'PUT',
      body: state
    })
    toast.add({
      title: 'Success',
      description: 'Anime updated successfully',
      color: 'success'
    })
    await refresh()
  } catch (e: any) {
    toast.add({
      title: 'Error',
      description: e.statusMessage || 'Failed to update anime',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}

const tabs = [{
  label: 'General Info',
  icon: 'i-lucide-info'
}, {
  label: 'Episodes',
  icon: 'i-lucide-list-video'
}]
</script>

<template>
  <UDashboardPanel v-if="anime" id="anime-edit">
    <template #header>
      <UDashboardNavbar :title="`Edit: ${state.title}`">
        <template #leading>
          <UButton
            icon="i-lucide-arrow-left"
            variant="ghost"
            color="neutral"
            to="/studio/anime"
          />
        </template>
        <template #right>
          <UButton
            label="View Public Page"
            icon="i-lucide-external-link"
            variant="ghost"
            color="neutral"
            :to="`/anime/${state.slug}`"
            target="_blank"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-8">
        <UTabs :items="tabs" class="w-full">
          <!-- Tab: General Info -->
          <template #content="{ item }">
            <div v-if="item.label === 'General Info'" class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Sidebar: Visuals -->
              <div class="space-y-6">
                <div class="studio-card p-6 rounded-2xl space-y-6">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-primary px-1">Visuals</h3>
                  
                  <UFormField label="Poster Key" name="poster_key" description="R2 path or external URL">
                    <UInput v-model="state.poster_key" placeholder="poster-id.jpg" class="w-full" />
                  </UFormField>
                  <div v-if="state.poster_key" class="aspect-[2/3] rounded-xl overflow-hidden border border-white/10 studio-card">
                    <img :src="state.poster_key.startsWith('http') ? state.poster_key : `/api/r2/${state.poster_key}`" class="w-full h-full object-cover" />
                  </div>

                  <UFormField label="Banner Key" name="banner_key" description="R2 path or external URL">
                    <UInput v-model="state.banner_key" placeholder="banner-id.jpg" class="w-full" />
                  </UFormField>
                  <div v-if="state.banner_key" class="aspect-video rounded-xl overflow-hidden border border-white/10 studio-card">
                    <img :src="state.banner_key.startsWith('http') ? state.banner_key : `/api/r2/${state.banner_key}`" class="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <!-- Main Form -->
              <div class="lg:col-span-2">
                <UForm :state="state" @submit="onUpdate" class="space-y-8">
                  <div class="studio-card p-8 rounded-2xl space-y-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <UFormField label="Anime Title" name="title" required>
                        <UInput v-model="state.title" size="lg" />
                      </UFormField>

                      <UFormField label="Slug" name="slug" required>
                        <UInput v-model="state.slug" size="lg" />
                      </UFormField>
                    </div>

                    <UFormField label="Synopsis" name="synopsis">
                      <UTextarea v-model="state.synopsis" :rows="8" />
                    </UFormField>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <UFormField label="Status">
                        <USelectMenu v-model="state.status" :options="statusOptions" class="capitalize" />
                      </UFormField>
                      <UFormField label="Type">
                        <USelectMenu v-model="state.type" :options="typeOptions" />
                      </UFormField>
                      <UFormField label="Year">
                        <UInput v-model="state.year" type="number" />
                      </UFormField>
                      <UFormField label="Season">
                        <USelectMenu v-model="state.season" :options="seasonOptions" class="capitalize" />
                      </UFormField>
                    </div>

                    <div class="flex justify-end pt-6 border-t border-white/5">
                      <UButton
                        type="submit"
                        label="Save Changes"
                        color="primary"
                        size="xl"
                        class="px-10 font-bold"
                        :loading="isLoading"
                      />
                    </div>
                  </div>
                </UForm>
              </div>
            </div>

            <!-- Tab: Episodes -->
            <div v-else-if="item.label === 'Episodes'" class="mt-8">
              <StudioEpisodeManager :anime-id="id" />
            </div>
          </template>
        </UTabs>
      </div>
    </template>
  </UDashboardPanel>
  <div v-else class="flex items-center justify-center min-h-screen">
    <span class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
  </div>
</template>
