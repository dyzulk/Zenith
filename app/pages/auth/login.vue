<script setup lang="ts">
import { User, Lock, ArrowRight, Play } from 'lucide-vue-next'

const { login } = useAuth()
const username = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  if (!username.value || !password.value) return
  isLoading.value = true
  errorMessage.value = ''
  try {
    await login({
      username: username.value,
      password: password.value
    })
    await navigateTo('/')
  } catch (e: any) {
    errorMessage.value = e.statusMessage || 'Invalid username or password'
  } finally {
    isLoading.value = false
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
      <div class="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <h1 class="text-3xl font-black mb-2 tracking-tight text-center">Welcome Back</h1>
        <p class="text-foreground/40 text-sm text-center mb-8">Login to your account to continue</p>
        
        <div v-if="errorMessage" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium text-center">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-widest text-foreground/60 ml-1">Username</label>
            <div class="relative group">
              <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
              <input 
                v-model="username"
                type="text" 
                placeholder="Your username"
                required
                class="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-widest text-foreground/60 ml-1">Password</label>
            <div class="relative group">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
              <input 
                v-model="password"
                type="password" 
                placeholder="••••••••"
                required
                class="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
              />
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 group"
          >
            <span v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span v-else>Login Now</span>
            <ArrowRight v-if="!isLoading" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div class="mt-8 pt-8 border-t border-white/5 text-center">
          <p class="text-sm text-foreground/30">
            Don't have an account? 
            <NuxtLink to="/auth/register" class="text-primary font-bold hover:underline">Register</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
