<script setup lang="ts">
declare const FFmpeg: any
declare const FFmpegUtil: any
let fetchFile: any, toBlobURL: any;
if (typeof FFmpegUtil !== 'undefined') {
  fetchFile = FFmpegUtil.fetchFile;
  toBlobURL = FFmpegUtil.toBlobURL;
}
import { Loader2, Zap, Check, AlertCircle, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  episodeId: string
  animeId: string
}>()

const emit = defineEmits(['processed'])

const ffmpeg = new FFmpeg.FFmpeg()
const loading = ref(false)
const progress = ref(0)
const status = ref('')
const error = ref<string | null>(null)
const isLoaded = ref(false)

const qualities = [
  { label: '1080p', value: '1080', bitRate: '4000k' },
  { label: '720p', value: '720', bitRate: '2500k' },
  { label: '480p', value: '480', bitRate: '1200k' },
  { label: '360p', value: '360', bitRate: '800k' }
]

const selectedQualities = ref(['360p', '720p'])
const inputFile = ref<File | null>(null)

async function loadFFmpeg() {
  if (isLoaded.value) return
  status.value = 'Loading FFmpeg Core (WASM)...'
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  })
  isLoaded.value = true
}

ffmpeg.on('log', ({ message }) => {
  // console.log(message)
  // Extract progress if possible or just show logs
})

ffmpeg.on('progress', ({ progress: p }) => {
  progress.value = Math.round(p * 100)
})

async function handleFileSelect(e: any) {
  const file = e.target.files[0]
  if (file) inputFile.value = file
}

async function startTranscode() {
  if (!inputFile.value) return
  loading.value = true
  error.value = null
  
  try {
    await loadFFmpeg()
    
    const inputName = 'input.mp4'
    await ffmpeg.writeFile(inputName, await fetchFile(inputFile.value))
    
    for (const qLabel of selectedQualities.value) {
      const q = qualities.find(item => item.label === qLabel)
      if (!q) continue
      
      status.value = `Processing ${qLabel}...`
      progress.value = 0
      
      const outputDir = `hls_${q.value}`
      await ffmpeg.createDir(outputDir)
      
      // FFmpeg command for HLS segmenting
      await ffmpeg.exec([
        '-i', inputName,
        '-vf', `scale=-2:${q.value}`,
        '-c:v', 'libx264',
        '-b:v', q.bitRate,
        '-c:a', 'aac',
        '-b:a', '128k',
        '-f', 'hls',
        '-hls_time', '10',
        '-hls_list_size', '0',
        '-hls_segment_filename', `${outputDir}/seg_%03d.ts`,
        `${outputDir}/playlist.m3u8`
      ])
      
      status.value = `Uploading ${qLabel} to R2...`
      
      // List files in the output directory and upload
      const files = await ffmpeg.listDir(outputDir)
      for (const f of files) {
        if (f.isDir) continue
        const fileData = await ffmpeg.readFile(`${outputDir}/${f.name}`)
        const blob = new Blob([fileData], { type: f.name.endsWith('.ts') ? 'video/MP2T' : 'application/x-mpegURL' })
        
        // Use Storage upload helper
        const storagePath = `anime/${props.animeId}/episodes/${props.episodeId}/${qLabel}/${f.name}`
        await uploadToStorage(blob, storagePath)
      }
      
      // Register source in DB
      await $fetch(`/api/studio/episode/${props.episodeId}/sources`, {
        method: 'POST',
        body: {
          sources: [{
            quality: qLabel,
            format: 'hls',
            file_key: `anime/${props.animeId}/episodes/${props.episodeId}/${qLabel}/playlist.m3u8`,
            is_primary: qLabel === '720p'
          }]
        }
      })
    }
    
    status.value = 'Complete!'
    emit('processed')
  } catch (err: any) {
    console.error(err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function uploadToStorage(blob: Blob, path: string) {
  // Get signed URL
  const { url }: any = await $fetch('/api/storage/sign-upload', {
    method: 'POST',
    body: { path, contentType: blob.type }
  })
  
  await fetch(url, {
    method: 'PUT',
    body: blob,
    headers: { 'Content-Type': blob.type }
  })
}
</script>

<template>
  <div class="studio-card p-6 rounded-2xl border border-white/5 space-y-6">
    <div class="flex items-center gap-3 mb-2">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Zap class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-black text-sm uppercase tracking-widest">WASM Transcoder</h3>
        <p class="text-[10px] text-white/40 font-bold uppercase">Browser-based HLS Pipeline</p>
      </div>
    </div>

    <div v-if="!loading && !status" class="space-y-6">
      <div class="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:border-primary/50 transition-colors relative">
        <input type="file" accept="video/mp4" class="absolute inset-0 opacity-0 cursor-pointer" @change="handleFileSelect" />
        <div v-if="inputFile" class="space-y-2">
          <p class="text-sm font-bold text-primary">{{ inputFile.name }}</p>
          <p class="text-[10px] text-white/40">{{ (inputFile.size / 1024 / 1024).toFixed(2) }} MB</p>
        </div>
        <div v-else class="space-y-2">
          <p class="text-sm font-bold">Drop MP4 here or click to browse</p>
          <p class="text-[10px] text-white/40 uppercase tracking-widest">Max 2GB recommended for WASM</p>
        </div>
      </div>

      <div class="space-y-3">
        <label class="text-[10px] font-black uppercase tracking-widest text-white/40">Target Qualities</label>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="q in qualities" 
            :key="q.label"
            @click="selectedQualities.includes(q.label) ? selectedQualities = selectedQualities.filter(i => i !== q.label) : selectedQualities.push(q.label)"
            class="px-4 py-2 rounded-xl text-xs font-bold border transition-all"
            :class="selectedQualities.includes(q.label) ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/5 text-white/40 hover:text-white'"
          >
            {{ q.label }}
          </button>
        </div>
      </div>

      <UButton 
        block 
        size="xl" 
        color="primary" 
        :disabled="!inputFile || selectedQualities.length === 0"
        @click="startTranscode"
        class="font-black"
      >
        Start HLS Processing
      </UButton>
    </div>

    <div v-else class="py-10 flex flex-col items-center text-center space-y-6">
      <div class="relative w-24 h-24">
        <Loader2 class="w-full h-full text-primary animate-spin opacity-20" />
        <div class="absolute inset-0 flex items-center justify-center font-black text-xl italic">
          {{ progress }}%
        </div>
      </div>
      
      <div class="space-y-2">
        <p class="font-bold text-sm text-primary animate-pulse">{{ status }}</p>
        <p class="text-[10px] text-white/40 uppercase tracking-[0.2em]">Don't close this tab during processing</p>
      </div>

      <div v-if="error" class="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex gap-3 text-left">
        <AlertCircle class="w-5 h-5 text-red-500 shrink-0" />
        <p class="text-xs text-red-400 leading-relaxed font-bold">{{ error }}</p>
      </div>
    </div>
  </div>
</template>
