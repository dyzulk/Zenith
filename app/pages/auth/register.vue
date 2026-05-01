<script setup lang="ts">
import { User, Lock, Mail, ArrowRight, Play } from 'lucide-vue-next'

const { register } = useAuth()
const username = ref('')
const displayName = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function handleRegister() {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    await register({
      username: username.value,
      password: password.value,
      displayName: displayName.value
    })
    successMessage.value = 'Registration successful! Redirecting to login...'
    setTimeout(() => {
      navigateTo('/auth/login')
    }, 2000)
  } catch (e: any) {
    errorMessage.value = e.statusMessage || 'Registration failed'
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
      <NuxtLink to="/" class="flex justify-center items-center gap-3 mb-8 group">
        <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-primary/30">
          <Play class="text-white fill-white w-5 h-5" />
        </div>
        <span class="text-2xl font-black tracking-tighter">
          Ani<span class="text-primary">Zenith</span>
        </span>
      </NuxtLink>

      <!-- Register Card -->
      <div class="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <h1 class="text-3xl font-black mb-2 tracking-tight text-center">Create Account</h1>
        <p class="text-foreground/40 text-sm text-center mb-8">Join Zenith and start streaming</p>
        
        <div v-if="errorMessage" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium text-center">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm font-medium text-center">
          {{ successMessage }}
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-widest text-foreground/60 ml-1">Username</label>
            <div class="relative group">
              <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
              <input 
                v-model="username"
                type="text" 
                placeholder="Unique username"
                required
                class="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-widest text-foreground/60 ml-1">Display Name</label>
            <div class="relative group">
              <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
              <input 
                v-model="displayName"
                type="text" 
                placeholder="How others see you"
                required
                class="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
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
                class="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-widest text-foreground/60 ml-1">Confirm Password</label>
            <div class="relative group">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
              <input 
                v-model="confirmPassword"
                type="password" 
                placeholder="••••••••"
                required
                class="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
              />
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 group mt-4"
          >
            <span v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span v-else>Create Account</span>
            <ArrowRight v-if="!isLoading" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div class="mt-8 pt-8 border-t border-white/5 text-center">
          <p class="text-sm text-foreground/30">
            Already have an account? 
            <NuxtLink to="/auth/login" class="text-primary font-bold hover:underline">Login</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
