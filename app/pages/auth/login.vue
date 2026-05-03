<script setup lang="ts">
import { User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-vue-next'

const { login } = useAuth()
const username = ref('')
const password = ref('')
const showPassword = ref(false)
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
    errorMessage.value = e.statusMessage || 'Access denied. Check your credentials.'
  } finally {
    isLoading.value = false
  }
}

definePageMeta({
  layout: false
})
</script>

<template>
  <AuthLayout>
    <div v-if="errorMessage" class="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[9px] font-black uppercase tracking-widest text-center animate-shake">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div class="space-y-1.5">
        <label class="text-[9px] font-black uppercase tracking-widest text-muted ml-1">Username</label>
        <div class="relative group">
          <User class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
          <input 
            v-model="username"
            type="text" 
            placeholder="Enter your username"
            required
            class="w-full bg-surface-zenith border border-border-zenith rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-primary/50 focus:bg-primary/5 transition-all text-sm font-bold"
          />
        </div>
      </div>

      <div class="space-y-1.5">
        <label class="text-[9px] font-black uppercase tracking-widest text-muted ml-1">Password</label>
        <div class="relative group">
          <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
          <input 
            v-model="password"
            :type="showPassword ? 'text' : 'password'" 
            placeholder="••••••••"
            required
            class="w-full bg-surface-zenith border border-border-zenith rounded-xl py-3.5 pl-11 pr-11 outline-none focus:border-primary/50 focus:bg-primary/5 transition-all text-sm font-bold"
          />
          <button 
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
          >
            <component :is="showPassword ? EyeOff : Eye" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between px-1 pt-1">
        <NuxtLink to="#" class="text-[9px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-4">Forgot Password?</NuxtLink>
      </div>

      <button 
        type="submit" 
        :disabled="isLoading"
        class="w-full btn-premium py-4 group"
      >
        <span v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        <span v-else>Continue Watching</span>
        <ArrowRight v-if="!isLoading" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      <AuthSocialLogin />
    </form>

    <template #footer>
      <div class="text-center">
        <p class="text-[10px] font-black text-muted uppercase tracking-tight">
          New here? 
          <NuxtLink to="/auth/register" class="text-primary hover:underline ml-1">Join the Library</NuxtLink>
        </p>
      </div>
    </template>
  </AuthLayout>
</template>
