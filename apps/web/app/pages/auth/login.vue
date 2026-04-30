<script setup lang="ts">
import { Mail, ArrowRight, Play, Facebook } from 'lucide-vue-next'

const { login, signInWithOAuth } = useAuth()
const config = useRuntimeConfig()
const email = ref('')
const isLoading = ref(false)
const isSent = ref(false)

const googleEnabled = computed(() => config.public.googleEnabled)
const facebookEnabled = computed(() => config.public.facebookEnabled)

async function handleLogin() {
  if (!email.value) return
  isLoading.value = true
  try {
    await login(email.value)
    isSent.value = true
  } catch (e: any) {
    alert(e.message)
  } finally {
    isLoading.value = false
  }
}

async function handleSocialLogin(provider: 'google' | 'facebook') {
  try {
    await signInWithOAuth(provider)
  } catch (e: any) {
    alert(e.message)
  }
}

definePageMeta({
  layout: false
})
</script>

<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
    <!-- Ambient Background -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -mr-64 -mt-64 animate-pulse"></div>
    <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full -ml-64 -mb-64"></div>

    <div class="w-full max-w-md relative z-10">
      <!-- Logo -->
      <NuxtLink to="/" class="flex justify-center items-center gap-3 mb-12 group">
        <div class="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-primary/30">
          <Play class="text-white fill-white w-6 h-6" />
        </div>
        <span class="text-3xl font-black tracking-tighter">
          Ani<span class="text-primary">Zenith</span>
        </span>
      </NuxtLink>

      <!-- Login Card -->
      <div class="glass-panel rounded-3xl p-8 md:p-10 border-white/5 relative overflow-hidden">
        <div v-if="!isSent">
          <h1 class="text-3xl font-black mb-2 tracking-tight">Welcome Back</h1>
          <p class="text-foreground/40 text-sm mb-8">Enter your email to receive a magic link.</p>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-foreground/60 ml-1">Email Address</label>
              <div class="relative group">
                <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                <input 
                  v-model="email"
                  type="email" 
                  placeholder="name@example.com"
                  required
                  class="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
                />
              </div>
            </div>

            <button 
              type="submit" 
              :disabled="isLoading"
              class="btn-premium w-full flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:hover:scale-100"
            >
              <span v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span v-else>Send Magic Link</span>
              <ArrowRight v-if="!isLoading" class="w-4 h-4" />
            </button>
          </form>

          <div v-if="googleEnabled || facebookEnabled" class="mt-8 pt-8 border-t border-white/5">
            <p class="text-center text-xs text-foreground/30 mb-6 font-bold uppercase tracking-widest">Or continue with</p>
            <div class="grid grid-cols-1 gap-4">
              <!-- Google Button -->
              <button 
                v-if="googleEnabled"
                @click="handleSocialLogin('google')"
                class="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl py-4 transition-all group"
              >
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span class="text-sm font-bold">Google</span>
              </button>

              <!-- Facebook Button -->
              <button 
                v-if="facebookEnabled"
                @click="handleSocialLogin('facebook')"
                class="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl py-4 transition-all group"
              >
                <Facebook class="w-5 h-5 group-hover:scale-110 transition-transform fill-blue-600 text-blue-600" />
                <span class="text-sm font-bold">Facebook</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Success State -->
        <div v-else class="text-center py-10 space-y-6 animate-fade-in">
          <div class="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail class="w-10 h-10 text-primary" />
          </div>
          <h2 class="text-3xl font-black tracking-tight">Check your email</h2>
          <p class="text-foreground/50 leading-relaxed">
            We've sent a magic link to <br /><span class="text-foreground font-bold">{{ email }}</span>.
          </p>
          <button @click="isSent = false" class="text-sm font-bold text-primary hover:underline">
            Try another email
          </button>
        </div>
      </div>

      <p class="mt-8 text-center text-sm text-foreground/30">
        Don't have an account? <NuxtLink to="/auth/login" class="text-primary font-bold hover:underline">Join the community</NuxtLink>
      </p>
    </div>
  </div>
</template>
