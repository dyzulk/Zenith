<script setup lang="ts">
definePageMeta({
  layout: 'studio',
  middleware: 'studio-auth'
})

const state = reactive({
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

async function onSubmit() {
  isLoading.value = true
  try {
    await $fetch('/api/studio/anime/create', {
      method: 'POST',
      body: state
    })
    toast.add({
      title: 'Success',
      description: 'Anime created successfully',
      color: 'success'
    })
    await navigateTo('/studio/anime')
  } catch (e: any) {
    toast.add({
      title: 'Error',
      description: e.statusMessage || 'Failed to create anime',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}

// Auto-generate slug
watch(() => state.title, (newTitle) => {
  if (!state.slug || state.slug === state.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')) {
    state.slug = newTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  }
})
</script>

<template>
  <UDashboardPanel id="anime-create">
    <template #header>
      <UDashboardNavbar title="Add New Anime">
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
      <div class="p-8 max-w-2xl mx-auto">
        <UForm :state="state" @submit="onSubmit" class="space-y-6">
          <UFormField label="Anime Title" name="title" required>
            <UInput v-model="state.title" placeholder="e.g. Solo Leveling" />
          </UFormField>

          <UFormField label="Slug" name="slug" required description="Unique identifier for the URL">
            <UInput v-model="state.slug" placeholder="e.g. solo-leveling" />
          </UFormField>

          <UFormField label="Synopsis" name="synopsis">
            <UTextarea v-model="state.synopsis" :rows="4" placeholder="Enter anime description..." />
          </UFormField>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <UFormField label="Status" name="status">
              <USelectMenu v-model="state.status" :options="statusOptions" class="capitalize" />
            </UFormField>

            <UFormField label="Type" name="type">
              <USelectMenu v-model="state.type" :options="typeOptions" />
            </UFormField>

            <UFormField label="Release Year" name="year">
              <UInput v-model="state.year" type="number" />
            </UFormField>

            <UFormField label="Season" name="season">
              <USelectMenu v-model="state.season" :options="seasonOptions" class="capitalize" />
            </UFormField>
          </div>

          <div class="pt-4 flex justify-end gap-3">
            <UButton
              label="Cancel"
              variant="ghost"
              color="neutral"
              to="/studio/anime"
            />
            <UButton
              type="submit"
              label="Create Anime"
              color="primary"
              :loading="isLoading"
            />
          </div>
        </UForm>
      </div>
    </template>
  </UDashboardPanel>
</template>
