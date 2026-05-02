<script setup lang="ts">
import { Upload, X, Crop, Image as ImageIcon, Loader2, CheckCircle2 } from 'lucide-vue-next'

const props = defineProps<{
  modelValue?: string | null
  label?: string
  description?: string
  aspectRatio?: number // e.g. 2/3 or 16/9
  maxResolution?: { width: number; height: number }
  pathPrefix?: string // e.g. 'anime/123'
}>()

const emit = defineEmits(['update:modelValue'])

const toast = useToast()
const fileInput = ref<HTMLInputElement | null>(null)
const isCropping = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)
const rawImage = ref<string | null>(null)
const croppedImage = ref<string | null>(null)

// Canvas references
const canvasRef = ref<HTMLCanvasElement | null>(null)
const imageObj = ref<HTMLImageElement | null>(null)

// Cropper state
const cropState = reactive({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  zoom: 1
})

function onFileSelect(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    toast.add({ title: 'Format Salah', description: 'Silakan pilih file gambar.', color: 'error' })
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    rawImage.value = event.target?.result as string
    isCropping.value = true
    nextTick(initCropper)
  }
  reader.readAsDataURL(file)
}

function initCropper() {
  if (!rawImage.value) return
  const img = new Image()
  img.onload = () => {
    imageObj.value = img
    // Default crop: center and fill aspect ratio
    const imgRatio = img.width / img.height
    const targetRatio = props.aspectRatio || 1
    
    if (imgRatio > targetRatio) {
      cropState.height = img.height
      cropState.width = img.height * targetRatio
      cropState.x = (img.width - cropState.width) / 2
      cropState.y = 0
    } else {
      cropState.width = img.width
      cropState.height = img.width / targetRatio
      cropState.x = 0
      cropState.y = (img.height - cropState.height) / 2
    }
    drawPreview()
  }
  img.src = rawImage.value
}

function drawPreview() {
  const canvas = canvasRef.value
  const img = imageObj.value
  if (!canvas || !img) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = props.maxResolution?.width || 800
  canvas.height = props.maxResolution?.height || (canvas.width / (props.aspectRatio || 1))

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(
    img,
    cropState.x, cropState.y, cropState.width, cropState.height,
    0, 0, canvas.width, canvas.height
  )
}

async function handleCrop() {
  const canvas = canvasRef.value
  if (!canvas) return

  isUploading.value = true
  isCropping.value = false

  try {
    // Convert to WebP Blob
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/webp', 0.8)
    })

    if (!blob) throw new Error('Gagal memproses gambar')

    // Generate unique filename
    const filename = `${props.pathPrefix ? props.pathPrefix + '/' : ''}${Date.now()}.webp`

    // Get signed URL
    const { url, headers }: any = await $fetch('/api/r2/sign-upload', {
      method: 'POST',
      body: { path: filename, contentType: 'image/webp' }
    })

    // Upload to R2
    await fetch(url, {
      method: 'PUT',
      body: blob,
      headers: { ...headers, 'Content-Type': 'image/webp' }
    })

    emit('update:modelValue', filename)
    croppedImage.value = URL.createObjectURL(blob)
    toast.add({ title: 'Berhasil', description: 'Gambar telah diunggah.', color: 'success' })
  } catch (e: any) {
    toast.add({ title: 'Gagal Upload', description: e.message, color: 'error' })
  } finally {
    isUploading.value = false
    rawImage.value = null
  }
}

function removeImage() {
  emit('update:modelValue', null)
  croppedImage.value = null
  if (fileInput.value) fileInput.value.value = ''
}

const displayImage = computed(() => {
  if (croppedImage.value) return croppedImage.value
  if (props.modelValue) {
    return props.modelValue.startsWith('http') ? props.modelValue : `/api/r2/${props.modelValue}`
  }
  return null
})
</script>

<template>
  <div class="space-y-2">
    <div v-if="label" class="flex items-center justify-between">
      <label class="text-xs font-black uppercase tracking-widest text-foreground/50">{{ label }}</label>
      <UButton v-if="displayImage" icon="i-lucide-trash-2" variant="ghost" color="error" size="xs" @click="removeImage" />
    </div>

    <div 
      class="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-default hover:border-primary/50 transition-all bg-elevated/30"
      :class="[aspectRatio === 16/9 ? 'aspect-video' : 'aspect-[2/3]']"
      @click="fileInput?.click()"
    >
      <!-- Preview Image -->
      <img v-if="displayImage" :src="displayImage" class="w-full h-full object-cover transition-transform group-hover:scale-105" />
      
      <!-- Overlay / Empty State -->
      <div 
        v-if="!displayImage || isUploading" 
        class="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center"
        :class="{ 'bg-background/60 backdrop-blur-sm': isUploading }"
      >
        <template v-if="isUploading">
          <Loader2 class="size-8 text-primary animate-spin" />
          <p class="text-xs font-bold uppercase tracking-widest">Optimizing...</p>
        </template>
        <template v-else>
          <div class="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
            <Upload class="size-6" />
          </div>
          <p class="text-sm font-black uppercase tracking-tight">Upload {{ label || 'Image' }}</p>
          <p v-if="description" class="text-[10px] text-foreground/40 font-bold uppercase leading-relaxed max-w-[180px]">
            {{ description }}
          </p>
        </template>
      </div>

      <!-- Hover Edit Overlay -->
      <div v-if="displayImage && !isUploading" class="absolute inset-0 bg-background/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
        <div class="flex items-center gap-2 bg-background/80 px-4 py-2 rounded-full border border-default shadow-xl">
          <ImageIcon class="size-4 text-primary" />
          <span class="text-xs font-black uppercase tracking-widest">Change Image</span>
        </div>
      </div>

      <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="onFileSelect" />
    </div>

    <!-- Cropper Modal -->
    <UModal v-model:open="isCropping" :title="`Crop ${label || 'Image'}`">
      <template #body>
        <div class="space-y-6">
          <div class="relative bg-black rounded-xl overflow-hidden border border-default aspect-video flex items-center justify-center">
            <canvas ref="canvasRef" class="max-w-full max-h-full object-contain" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase text-muted">X Position</label>
              <URange v-model="cropState.x" :min="0" :max="imageObj?.width || 100" @update:model-value="drawPreview" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase text-muted">Y Position</label>
              <URange v-model="cropState.y" :min="0" :max="imageObj?.height || 100" @update:model-value="drawPreview" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase text-muted">Crop Width</label>
              <URange v-model="cropState.width" :min="100" :max="imageObj?.width || 100" @update:model-value="drawPreview" />
            </div>
            <div class="space-y-2 text-center flex flex-col justify-end">
               <p class="text-[10px] text-primary font-bold uppercase tracking-widest">Auto-Locked Ratio: {{ aspectRatio === 16/9 ? '16:9' : '2:3' }}</p>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-default">
            <UButton label="Cancel" variant="ghost" color="neutral" @click="isCropping = false" />
            <UButton label="Crop & Upload" icon="i-lucide-check" color="primary" @click="handleCrop" />
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
