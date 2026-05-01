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
          <UFormGroup label="Anime Title" name="title" required>
            <UInput v-model="state.title" placeholder="e.g. Solo Leveling" />
          </UFormGroup>

          <UFormGroup label="Slug" name="slug" required help="Unique identifier for the URL">
            <UInput v-model="state.slug" placeholder="e.g. solo-leveling" />
          </UFormGroup>

          <UFormGroup label="Synopsis" name="synopsis">
            <UTextarea v-model="state.synopsis" :rows="4" placeholder="Enter anime description..." />
          </UFormGroup>

          <div class="grid grid-cols-2 gap-4">
            <UFormGroup label="Status" name="status">
              <USelect v-model="state.status" :options="statusOptions" class="capitalize" />
            </UFormGroup>

            <UFormGroup label="Type" name="type">
              <USelect v-model="state.type" :options="typeOptions" />
            </UFormGroup>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <UFormGroup label="Release Year" name="year">
              <UInput v-model="state.year" type="number" />
            </UFormGroup>

            <UFormGroup label="Season" name="season">
              <USelect v-model="state.season" :options="seasonOptions" class="capitalize" />
            </UFormGroup>
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
