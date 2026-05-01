<script setup lang="ts">
definePageMeta({
  layout: 'studio',
  middleware: 'studio-auth'
})

const { data, refresh } = await useFetch('/api/studio/genres')
const genres = computed(() => data.value?.genres || [])

const search = ref('')
const filteredGenres = computed(() => {
  if (!search.value) return genres.value
  return genres.value.filter((g: any) => 
    g.name.toLowerCase().includes(search.value.toLowerCase()) ||
    g.slug.toLowerCase().includes(search.value.toLowerCase())
  )
})

const isModalOpen = ref(false)
const isEditing = ref(false)
const isLoading = ref(false)
const toast = useToast()

const state = reactive({
  id: null as number | null,
  name: '',
  slug: ''
})

function openAddModal() {
  isEditing.value = false
  state.id = null
  state.name = ''
  state.slug = ''
  isModalOpen.value = true
}

function openEditModal(genre: any) {
  isEditing.value = true
  state.id = genre.id
  state.name = genre.name
  state.slug = genre.slug
  isModalOpen.value = true
}

async function onSubmit() {
  isLoading.value = true
  try {
    const url = isEditing.value ? `/api/studio/genres/${state.id}` : '/api/studio/genres'
    const method = isEditing.value ? 'PUT' : 'POST'
    
    await $fetch(url, {
      method,
      body: { name: state.name, slug: state.slug }
    })
    
    toast.add({
      title: 'Success',
      description: `Genre ${isEditing.value ? 'updated' : 'created'} successfully`,
      color: 'success'
    })
    
    isModalOpen.value = false
    await refresh()
  } catch (e: any) {
    toast.add({
      title: 'Error',
      description: e.statusMessage || 'Action failed',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}

async function deleteGenre(id: number) {
  if (!confirm('Are you sure you want to delete this genre?')) return
  
  try {
    await $fetch(`/api/studio/genres/${id}`, { method: 'DELETE' })
    toast.add({ title: 'Deleted', description: 'Genre removed', color: 'success' })
    await refresh()
  } catch (e: any) {
    toast.add({ title: 'Error', description: 'Failed to delete', color: 'error' })
  }
}

// Auto-slug
watch(() => state.name, (val) => {
  if (!isEditing.value || !state.slug) {
    state.slug = val.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
  }
})

const columns = [
  { accessorKey: 'id', header: 'ID', size: 80 },
  { accessorKey: 'name', header: 'GENRE NAME' },
  { accessorKey: 'slug', header: 'SLUG' },
  { accessorKey: 'anime_count', header: 'ANIME COUNT', size: 150 },
  { id: 'actions', size: 120 }
]
</script>

<template>
  <UDashboardPanel id="genres">
    <template #header>
      <UDashboardNavbar title="Genre Management">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <UModal v-model:open="isModalOpen" :title="isEditing ? 'Edit Genre' : 'Create New Genre'">
            <UButton 
              label="Add Genre" 
              icon="i-lucide-plus" 
              color="primary" 
              size="sm" 
              @click="openAddModal"
            />

            <template #body>
              <UForm :state="state" @submit="onSubmit" class="space-y-6">
                <UFormField label="Genre Name" required>
                  <UInput v-model="state.name" placeholder="e.g. Action" size="lg" />
                </UFormField>
                
                <UFormField label="Slug" description="URL-friendly identifier">
                  <UInput v-model="state.slug" placeholder="e.g. action" size="lg" />
                </UFormField>

                <div class="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <UButton label="Cancel" variant="ghost" color="neutral" @click="isModalOpen = false" />
                  <UButton type="submit" :label="isEditing ? 'Update Genre' : 'Create Genre'" color="primary" :loading="isLoading" class="px-6" />
                </div>
              </UForm>
            </template>
          </UModal>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <div class="flex items-center justify-between gap-4">
          <UInput 
            v-model="search" 
            icon="i-lucide-search" 
            placeholder="Search genres..." 
            class="max-w-sm"
          />
        </div>

        <div class="studio-card rounded-2xl overflow-hidden">
          <UTable :data="filteredGenres" :columns="columns" :ui="{ th: 'text-[10px] font-black uppercase tracking-widest text-foreground/40 px-4 py-4', td: 'px-4 py-4 border-b border-default' }">
            <template #id-cell="{ row }">
              <span class="text-xs font-bold text-foreground/50">#{{ row.original.id }}</span>
            </template>

            <template #name-cell="{ row }">
              <span class="text-sm font-black text-foreground">{{ row.original.name }}</span>
            </template>

            <template #slug-cell="{ row }">
              <code class="text-[10px] bg-foreground/5 px-2 py-1 rounded text-primary font-bold">{{ row.original.slug }}</code>
            </template>

            <template #anime_count-cell="{ row }">
              <UBadge :label="`${row.original.anime_count} Anime`" variant="subtle" color="neutral" size="sm" class="font-black" />
            </template>

            <template #actions-cell="{ row }">
              <div class="flex justify-end gap-2">
                <UButton
                  icon="i-lucide-edit"
                  variant="ghost"
                  color="neutral"
                  size="xs"
                  @click="openEditModal(row.original)"
                />
                <UButton
                  icon="i-lucide-trash"
                  variant="ghost"
                  color="error"
                  size="xs"
                  @click="deleteGenre(row.original.id)"
                />
              </div>
            </template>
          </UTable>

          <div v-if="filteredGenres.length === 0" class="py-24 text-center">
            <UIcon name="i-lucide-tags" class="size-12 text-foreground/10 mb-4 mx-auto" />
            <p class="text-foreground/40 text-sm font-bold uppercase tracking-widest">No genres found</p>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
