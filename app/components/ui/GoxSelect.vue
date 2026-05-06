<script setup lang="ts">
import { ChevronDown, Search, Check } from 'lucide-vue-next'
import { gsap } from 'gsap'

interface Props {
  items: any[]
  valueKey?: string
  labelKey?: string
  searchable?: boolean
  placeholder?: string
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  valueKey: '',
  labelKey: '',
  searchable: false,
  placeholder: 'Select...',
  multiple: false
})

const modelValue = defineModel<any>()
const isOpen = ref(false)
const searchQuery = ref('')
const selectRef = ref<HTMLElement | null>(null)

// Get label and value from item
const getLabel = (item: any) => props.labelKey && typeof item === 'object' ? item[props.labelKey] : item
const getValue = (item: any) => props.valueKey && typeof item === 'object' ? item[props.valueKey] : item

// Filter items based on search query
const filteredItems = computed(() => {
  if (!props.searchable || !searchQuery.value) return props.items
  
  const query = searchQuery.value.toLowerCase()
  return props.items.filter(item => {
    const label = String(getLabel(item)).toLowerCase()
    return label.includes(query)
  })
})

const isSelected = (item: any) => {
  const val = getValue(item)
  if (props.multiple) {
    return Array.isArray(modelValue.value) && modelValue.value.includes(val)
  }
  return modelValue.value === val
}

const selectedLabel = computed(() => {
  if (props.multiple) {
    const len = Array.isArray(modelValue.value) ? modelValue.value.length : 0
    return len > 0 ? `${len} Selected` : props.placeholder
  }
  
  if (!modelValue.value) return props.placeholder
  const item = props.items.find(item => getValue(item) === modelValue.value)
  return item ? getLabel(item) : props.placeholder
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
  }
}

const selectItem = (item: any) => {
  const val = getValue(item)
  if (props.multiple) {
    let arr = Array.isArray(modelValue.value) ? [...modelValue.value] : []
    const index = arr.indexOf(val)
    if (index > -1) {
      arr.splice(index, 1) // deselect
    } else {
      arr.push(val) // select
    }
    modelValue.value = arr
  } else {
    // Single select toggle deselect
    if (modelValue.value === val) {
      modelValue.value = ''
    } else {
      modelValue.value = val
    }
    isOpen.value = false
  }
}

// Click outside to close
const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// GSAP Animations
const onEnter = (el: Element, done: () => void) => {
  gsap.fromTo(el, 
    { opacity: 0, y: -10, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out', onComplete: done }
  )
}

const onLeave = (el: Element, done: () => void) => {
  gsap.to(el, { 
    opacity: 0, y: -10, scale: 0.95, duration: 0.15, ease: 'power2.in', onComplete: done 
  })
}
</script>

<template>
  <div class="relative w-full" ref="selectRef">
    <!-- Trigger Button -->
    <button 
      type="button"
      @click="toggleDropdown"
      class="w-full flex items-center justify-between bg-surface-gox border border-border-gox rounded-xl p-3 text-xs font-black uppercase transition-all hover:border-primary/50 focus:outline-none focus:border-primary"
      :class="[isOpen ? 'border-primary ring-1 ring-primary/20' : '', (props.multiple ? !(modelValue?.length) : !modelValue) ? 'text-muted' : 'text-foreground']"
    >
      <span class="truncate">{{ selectedLabel }}</span>
      <ChevronDown 
        class="w-4 h-4 text-muted transition-transform duration-300" 
        :class="isOpen ? 'rotate-180' : ''" 
      />
    </button>

    <!-- Dropdown Panel -->
    <Transition
      @enter="onEnter"
      @leave="onLeave"
      :css="false"
    >
      <div 
        v-show="isOpen"
        class="absolute z-50 w-full mt-2 bg-surface-gox/90 backdrop-blur-xl border border-border-gox rounded-xl shadow-2xl overflow-hidden flex flex-col"
      >
        <!-- Search Input -->
        <div v-if="searchable" class="p-3 border-b border-border-gox/50 relative">
          <Search class="absolute left-6 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search..."
            class="w-full bg-black/20 rounded-lg py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted/50"
            @click.stop
          />
        </div>

        <!-- Options List -->
        <ul class="max-h-60 overflow-y-auto py-1 scrollbar-hide">
          <li 
            v-if="filteredItems.length === 0"
            class="px-4 py-3 text-xs text-muted text-center italic"
          >
            No results found
          </li>
          
          <li 
            v-for="(item, index) in filteredItems" 
            :key="index"
            @click="selectItem(item)"
            class="px-4 py-2.5 text-xs font-bold uppercase cursor-pointer flex items-center justify-between transition-colors hover:bg-primary/10 hover:text-primary"
            :class="isSelected(item) ? 'bg-primary/5 text-primary' : 'text-muted'"
          >
            <span class="truncate">{{ getLabel(item) }}</span>
            <Check v-if="isSelected(item)" class="w-3.5 h-3.5" />
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
