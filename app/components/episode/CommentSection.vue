<script setup lang="ts">
import { Send, MessageSquare, AlertTriangle, Eye, EyeOff, Loader2 } from 'lucide-vue-next'
const { getAvatar } = useGoxImage()
import type PusherType from 'pusher-js'
declare const Pusher: any // Reference global Pusher from CDN

const props = defineProps<{
  episodeId: string
}>()

const config = useRuntimeConfig()
const { user } = useAuth()
const comments = ref<any[]>([])
const commentBody = ref('')
const isSpoiler = ref(false)
const isLoading = ref(true)
const isPosting = ref(false)

// Real-time Status
const isRealtimeActive = ref(false)

// Pusher Setup
let pusher: PusherType | null = null
let channel: any = null

const initPusher = () => {
  if (!config.public.pusherKey) return

  pusher = new Pusher(config.public.pusherKey as string, {
    cluster: config.public.pusherCluster as string,
  })

  channel = pusher.subscribe(`episode-${props.episodeId}`)
  
  channel.bind('comment_received', (data: any) => {
    // Only add if not already in list (avoid double if posted by self)
    const exists = comments.value.some(c => c.id === data.id)
    if (!exists) {
      comments.value.unshift(data)
    }
  })

  pusher.connection.bind('connected', () => {
    isRealtimeActive.value = true
  })

  pusher.connection.bind('disconnected', () => {
    isRealtimeActive.value = false
  })
}

const fetchInitialComments = async () => {
  isLoading.value = true
  try {
    initPusher()
    
    const response: any = await $fetch(`/api/anime/episode/${props.episodeId}/comments`)
    comments.value = response.comments || []
  } catch (e) {
    console.error('Failed to initialize comments')
  } finally {
    isLoading.value = false
  }
}

const postComment = async () => {
  if (!commentBody.value.trim() || !user.value) return
  isPosting.value = true

  const payloadData = {
    body: commentBody.value.trim(),
    is_spoiler: isSpoiler.value
  }

  try {
    const response: any = await $fetch(`/api/anime/episode/${props.episodeId}/comments`, {
      method: 'POST',
      body: payloadData
    })
    
    if (response.success) {
      // Add to local list immediately for better UX
      const exists = comments.value.some(c => c.id === response.comment.id)
      if (!exists) {
        comments.value.unshift(response.comment)
      }
      commentBody.value = ''
      isSpoiler.value = false
    }
  } catch (e) {
    console.error('Failed to post comment')
  } finally {
    isPosting.value = false
  }
}

// Spoiler management
const visibleSpoilers = ref<Set<string>>(new Set())
const toggleSpoiler = (id: string) => {
  if (visibleSpoilers.value.has(id)) visibleSpoilers.value.delete(id)
  else visibleSpoilers.value.add(id)
}

onUnmounted(() => {
  if (pusher) {
    pusher.unsubscribe(`episode-${props.episodeId}`)
    pusher.disconnect()
  }
})

onMounted(fetchInitialComments)
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <MessageSquare class="w-6 h-6 text-primary" />
        <h3 class="text-xl font-black tracking-tighter uppercase">Discussion</h3>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full" :class="isRealtimeActive ? 'bg-success animate-pulse' : 'bg-red-500'"></div>
        <span class="text-[10px] font-black uppercase tracking-widest opacity-40">
          {{ isRealtimeActive ? 'Real-time Active' : 'Connecting...' }}
        </span>
      </div>
    </div>

    <!-- Input Area -->
    <div v-if="user" class="glass-panel p-6 rounded-2xl border border-border-gox space-y-4">
      <div class="flex gap-4">
        <div class="w-10 h-10 rounded-full bg-primary flex-shrink-0 overflow-hidden border border-border-gox">
          <img :src="getAvatar(user)" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 space-y-3">
          <textarea 
            v-model="commentBody"
            rows="3"
            class="w-full bg-surface-gox border border-border-gox rounded-xl p-4 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none text-foreground"
            placeholder="Share your thoughts..."
          ></textarea>
          
          <div class="flex items-center justify-between">
            <button 
              @click="isSpoiler = !isSpoiler"
              class="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-[10px] font-black uppercase tracking-widest"
              :class="isSpoiler ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-surface-gox border-border-gox text-muted hover:text-foreground'"
            >
              <AlertTriangle class="w-3 h-3" />
              Spoiler
            </button>

            <button 
              @click="postComment"
              :disabled="!commentBody.trim() || isPosting"
              class="px-6 py-2 bg-primary text-white rounded-lg font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all flex items-center gap-2"
            >
              Post <Send v-if="!isPosting" class="w-3 h-3" /><Loader2 v-else class="w-3 h-3 animate-spin" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="p-8 text-center glass-panel rounded-2xl border border-border-gox">
      <p class="text-sm text-muted font-bold mb-4">Please login to join the discussion</p>
      <NuxtLink to="/auth/login" class="px-6 py-2 bg-foreground text-background rounded-lg font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Sign In</NuxtLink>
    </div>

    <!-- Comments List -->
    <div v-if="isLoading" class="flex flex-col items-center py-12 gap-4">
      <Loader2 class="w-8 h-8 text-primary animate-spin" />
      <span class="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Loading conversations...</span>
    </div>

    <div v-else-if="comments.length" class="space-y-6">
      <transition-group 
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div 
          v-for="comment in comments" 
          :key="comment.id"
          class="flex gap-4 group"
        >
          <div class="w-10 h-10 rounded-full bg-surface-gox flex-shrink-0 overflow-hidden border border-border-gox">
            <img :src="getAvatar(comment.user)" class="w-full h-full object-cover" />
          </div>
          
          <div class="flex-1 space-y-1">
            <div class="flex items-center gap-3">
              <span class="text-xs font-black text-foreground">{{ comment.user?.username }}</span>
              <span v-if="comment.user?.role === 'admin'" class="text-[8px] font-black bg-primary/20 text-primary px-1.5 py-0.5 rounded uppercase">Staff</span>
              <span class="text-[9px] text-muted font-mono">{{ useTimeAgo(comment.created_at).value }}</span>
            </div>
            
            <div class="relative">
              <div 
                class="text-sm leading-relaxed text-foreground/80 transition-all duration-300"
                :class="{ 'blur-md select-none pointer-events-none': comment.is_spoiler && !visibleSpoilers.has(comment.id) }"
              >
                {{ comment.body }}
              </div>
              
              <!-- Spoiler Overlay -->
              <div 
                v-if="comment.is_spoiler && !visibleSpoilers.has(comment.id)"
                class="absolute inset-0 flex items-center justify-center cursor-pointer group/spoiler"
                @click="toggleSpoiler(comment.id)"
              >
                <div class="px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 group-hover/spoiler:bg-red-500 group-hover/spoiler:text-white transition-all">
                  <EyeOff class="w-3 h-3" /> Reveal Spoiler
                </div>
              </div>
              
              <button 
                v-if="comment.is_spoiler && visibleSpoilers.has(comment.id)"
                @click="toggleSpoiler(comment.id)"
                class="mt-2 text-[8px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors flex items-center gap-1"
              >
                <Eye class="w-2 h-2" /> Hide Spoiler
              </button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <div v-else class="py-20 text-center opacity-20 flex flex-col items-center gap-4">
      <MessageSquare class="w-12 h-12" />
      <p class="text-xs font-black uppercase tracking-[0.4em]">Be the first to comment</p>
    </div>
  </div>
</template>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
}
</style>
