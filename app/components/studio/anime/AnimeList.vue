<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel } from '@tanstack/table-core'
import { upperFirst } from 'scule'

const props = defineProps<{
  data: any[]
  status: string
}>()

const emit = defineEmits(['refresh'])

const { 
  genres, 
  fetchGenres, 
  animeStatusOptions, 
  animeTypeOptions 
} = useStudioData()

// Load data genre saat komponen dimuat
onMounted(fetchGenres)

const UCheckbox = resolveComponent('UCheckbox')
const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const columns: TableColumn<any>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (v: any) => table.toggleAllPageRowsSelected(!!v)
      }),
    cell: ({ row }) => h(UCheckbox, { 'modelValue': row.getIsSelected(), 'onUpdate:modelValue': (v: any) => row.toggleSelected(!!v) })
  },
  { accessorKey: 'id', header: 'ID', size: 60 },
  {
    accessorKey: 'title',
    header: 'Anime',
    cell: ({ row }) => h('div', { class: 'flex flex-col' }, [
      h('span', { class: 'font-bold text-foreground' }, row.original.title),
      h('span', { class: 'text-xs text-muted font-mono' }, row.original.slug)
    ])
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const opt = animeStatusOptions.find(o => o.value === row.original.status)
      return h(UBadge, { label: row.original.status, color: (opt?.color as any) || 'neutral', variant: 'subtle', size: 'sm', class: 'capitalize font-bold' })
    }
  },
  { accessorKey: 'type', header: 'Tipe' },
  { accessorKey: 'year', header: 'Tahun' },
  {
    id: 'actions',
    cell: ({ row }) => h('div', { class: 'flex justify-end gap-2' }, [
      h(UButton, { icon: 'i-lucide-edit', variant: 'ghost', color: 'neutral', size: 'xs', to: `/studio/anime/${row.original.id}` }),
      h(UButton, { icon: 'i-lucide-external-link', variant: 'ghost', color: 'neutral', size: 'xs', to: `/anime/${row.original.slug}`, target: '_blank' })
    ])
  }
]

const search = ref('')
const table = useTemplateRef('table')
const rowSelection = ref({})
const columnVisibility = ref({})
const pagination = ref({ pageIndex: 0, pageSize: 10 })

// --- LOGIKA FILTER ADVANCED ---
const activeFilters = ref<any[]>([])
const isFilterOpen = ref(false)

const filterableColumns = [
  { label: 'Judul', value: 'title', type: 'string' },
  { label: 'Genre', value: 'genres', type: 'dynamic-enum', options: genres },
  { label: 'Status', value: 'status', type: 'enum', options: animeStatusOptions },
  { label: 'Tipe', value: 'type', type: 'enum', options: animeTypeOptions },
  { label: 'Tahun', value: 'year', type: 'number' }
]

const operators: any = {
  string: [
    { label: 'Berisi', value: 'contains' },
    { label: 'Sama dengan', value: 'equals' }
  ],
  number: [
    { label: 'Sama dengan', value: 'equals' },
    { label: 'Lebih besar dari', value: 'gt' },
    { label: 'Lebih kecil dari', value: 'lt' }
  ],
  enum: [
    { label: 'Adalah', value: 'is' },
    { label: 'Bukan', value: 'isNot' }
  ],
  'dynamic-enum': [
    { label: 'Termasuk', value: 'includes' },
    { label: 'Tidak termasuk', value: 'notIncludes' }
  ]
}

function addFilter() {
  activeFilters.value.push({ column: 'title', operator: 'contains', value: '' })
}

const filteredData = computed(() => {
  let result = props.data
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter((a: any) => a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q))
  }
  if (activeFilters.value.length > 0) {
    result = result.filter((item: any) => {
      return activeFilters.value.every(f => {
        const val = item[f.column]
        if (!f.value && f.value !== 0) return true
        
        // Penanganan khusus untuk array genre
        if (f.column === 'genres') {
          const itemGenreIds = val.map((g: any) => g.id)
          return f.operator === 'includes' ? itemGenreIds.includes(f.value) : !itemGenreIds.includes(f.value)
        }

        switch (f.operator) {
          case 'contains': return String(val).toLowerCase().includes(String(f.value).toLowerCase())
          case 'equals': return String(val).toLowerCase() === String(f.value).toLowerCase()
          case 'gt': return Number(val) > Number(f.value)
          case 'lt': return Number(val) < Number(f.value)
          case 'is': return val === f.value
          case 'isNot': return val !== f.value
          default: return true
        }
      })
    })
  }
  return result
})

const selectedRows = computed(() => table.value?.tableApi?.getFilteredSelectedRowModel().rows || [])

function exportCSV() {
  const dataToExport = filteredData.value.map(a => ({ ID: a.id, Title: a.title, Status: a.status, Type: a.type, Year: a.year }))
  const headers = Object.keys(dataToExport[0]).join(',')
  const rows = dataToExport.map(obj => Object.values(obj).join(','))
  const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows.join("\n")
  const link = document.createElement("a")
  link.setAttribute("href", encodeURI(csvContent))
  link.setAttribute("download", "anime_list.csv")
  link.click()
}
</script>

<template>
  <div class="space-y-4">
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-3 flex-1 min-w-[300px]">
        <UInput v-model="search" icon="i-lucide-search" placeholder="Cari anime..." class="max-w-xs w-full" />
        
        <UPopover v-model:open="isFilterOpen">
          <UButton label="Filter" icon="i-lucide-filter" color="neutral" variant="outline" :class="{ 'border-primary ring-1 ring-primary': activeFilters.length > 0 }">
            <template #trailing v-if="activeFilters.length > 0">
              <UBadge :label="activeFilters.length" size="xs" color="primary" class="rounded-full" />
            </template>
          </UButton>
          <template #content>
            <div class="p-4 w-80 space-y-4">
              <div class="flex items-center justify-between border-b border-default pb-2">
                <span class="text-xs font-black uppercase tracking-widest text-muted">Filter Lanjutan</span>
                <UButton label="Reset" variant="ghost" size="xs" color="neutral" @click="activeFilters = []" />
              </div>
              <div v-for="(filter, index) in activeFilters" :key="index" class="space-y-2 pb-4 border-b border-default last:border-0 last:pb-0">
                <div class="flex items-center justify-between gap-2">
                  <USelectMenu v-model="filter.column" :options="filterableColumns" value-attribute="value" class="flex-1" size="xs" @update:model-value="filter.value = ''; filter.operator = (filterableColumns.find(c => c.value === filter.column)?.type === 'dynamic-enum' ? 'includes' : 'equals')" />
                  <UButton icon="i-lucide-x" color="error" variant="ghost" size="xs" @click="activeFilters.splice(index, 1)" />
                </div>
                <div class="flex gap-2">
                  <USelectMenu v-model="filter.operator" :options="operators[filterableColumns.find(c => c.value === filter.column)?.type || 'string']" value-attribute="value" class="w-1/2" size="xs" />
                  
                  <!-- Dropdown Dinamis Berdasarkan Kolom -->
                  <USelectMenu 
                    v-if="['enum', 'dynamic-enum'].includes(filterableColumns.find(c => c.value === filter.column)?.type || '')"
                    v-model="filter.value"
                    :options="filterableColumns.find(c => c.value === filter.column)?.options"
                    :value-attribute="filterableColumns.find(c => c.value === filter.column)?.type === 'dynamic-enum' ? 'id' : 'value'"
                    :option-attribute="filterableColumns.find(c => c.value === filter.column)?.type === 'dynamic-enum' ? 'name' : 'label'"
                    class="w-1/2"
                    size="xs"
                    searchable
                    placeholder="Pilih..."
                  />
                  <UInput v-else v-model="filter.value" :type="filterableColumns.find(c => c.value === filter.column)?.type === 'number' ? 'number' : 'text'" placeholder="Nilai..." class="w-1/2" size="xs" />
                </div>
              </div>
              <UButton label="Tambah Filter" icon="i-lucide-plus" block variant="soft" size="xs" @click="addFilter" />
            </div>
          </template>
        </UPopover>

        <USelect v-model="pagination.pageSize" :items="[10, 25, 50, 100]" class="w-20" />
      </div>

      <div class="flex items-center gap-2">
        <UButton v-if="selectedRows.length > 0" label="Hapus Terpilih" icon="i-lucide-trash" color="error" variant="subtle" @click="emit('refresh')">
          <template #trailing><UKbd>{{ selectedRows.length }}</UKbd></template>
        </UButton>
        <UButton label="Ekspor CSV" icon="i-lucide-download" color="neutral" variant="outline" @click="exportCSV" />
        <UDropdownMenu
          :items="table?.tableApi?.getAllColumns().filter((c: any) => c.getCanHide()).map((c: any) => ({
            label: upperFirst(c.id), type: 'checkbox' as const, checked: c.getIsVisible(),
            onUpdateChecked(v: boolean) { table?.tableApi?.getColumn(c.id)?.toggleVisibility(!!v) },
            onSelect(e?: Event) { e?.preventDefault() }
          }))"
          :content="{ align: 'end' }"
        >
          <UButton label="Tampilan" color="neutral" variant="outline" icon="i-lucide-settings-2" />
        </UDropdownMenu>
      </div>
    </div>

    <!-- Tabel -->
    <UTable
      ref="table"
      v-model:pagination="pagination"
      v-model:row-selection="rowSelection"
      v-model:column-visibility="columnVisibility"
      :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
      :data="filteredData"
      :columns="columns"
      :loading="status === 'pending'"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r text-[10px] font-black uppercase tracking-widest text-foreground/40',
        td: 'border-b border-default py-3 px-4',
        separator: 'h-0'
      }"
    >
      <template #loading-state>
        <div class="flex flex-col gap-4 p-4">
          <div v-for="i in 5" :key="i" class="flex items-center gap-4 animate-pulse">
            <div class="size-4 bg-muted rounded" /><div class="h-4 bg-muted rounded w-48" /><div class="h-4 bg-muted rounded w-24 ml-auto" /><div class="h-4 bg-muted rounded w-16" />
          </div>
        </div>
      </template>
    </UTable>

    <!-- Footer Paginasi -->
    <div class="flex items-center justify-between gap-3 border-t border-default pt-4">
      <div class="text-sm text-muted">
        Menampilkan <span class="font-bold text-foreground">{{ pagination.pageIndex * pagination.pageSize + 1 }} - {{ Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length) }}</span>
        dari <span class="font-bold text-foreground">{{ filteredData.length }}</span> data
      </div>
      <UPagination v-if="filteredData.length > pagination.pageSize" :default-page="pagination.pageIndex + 1" :items-per-page="Number(pagination.pageSize)" :total="filteredData.length" @update:page="(p) => pagination.pageIndex = p - 1" />
    </div>
  </div>
</template>
