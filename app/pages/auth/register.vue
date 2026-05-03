<script setup lang="ts">
import { User, Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-vue-next'

const { register } = useAuth()
const username = ref('')
const displayName = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function handleRegister() {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
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
    successMessage.value = 'Profile created! Redirecting...'
    setTimeout(() => {
      navigateTo('/auth/login')
    }, 2000)
  } catch (e: any) {
    errorMessage.value = e.statusMessage || 'Registration failed.'
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
    <div v-if="errorMessage" class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-[9px] font-black uppercase tracking-widest text-center">
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-[9px] font-black uppercase tracking-widest text-center">
      {{ successMessage }}
    </div>

    <form @submit.prevent="handleRegister" class="space-y-2.5">
      <div class="space-y-1">
        <label class="text-[8px] font-black uppercase tracking-widest text-muted ml-1">Username</label>
        <div class="relative group">
          <User class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted group-focus-within:text-primary transition-colors" />
          <input 
            v-model="username"
            type="text" 
            placeholder="Unique username"
            required
            class="w-full bg-surface-zenith border border-border-zenith rounded-lg py-2.5 pl-10 pr-4 outline-none focus:border-primary transition-all text-xs font-bold"
          />
        </div>
      </div>

      <div class="space-y-1">
        <label class="text-[8px] font-black uppercase tracking-widest text-muted ml-1">Display Name</label>
        <div class="relative group">
          <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted group-focus-within:text-primary transition-colors" />
          <input 
            v-model="displayName"
            type="text" 
            placeholder="How others see you"
            required
            class="w-full bg-surface-zenith border border-border-zenith rounded-lg py-2.5 pl-10 pr-4 outline-none focus:border-primary transition-all text-xs font-bold"
          />
        </div>
      </div>

      <div class="space-y-1">
        <label class="text-[8px] font-black uppercase tracking-widest text-muted ml-1">Password</label>
        <div class="relative group">
          <Lock class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted group-focus-within:text-primary transition-colors" />
          <input 
            v-model="password"
            :type="showPassword ? 'text' : 'password'" 
            placeholder="••••••••"
            required
            class="w-full bg-surface-zenith border border-border-zenith rounded-lg py-2.5 pl-10 pr-10 outline-none focus:border-primary transition-all text-xs font-bold"
          />
          <button 
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
          >
            <component :is="showPassword ? EyeOff : Eye" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div class="space-y-1">
        <label class="text-[8px] font-black uppercase tracking-widest text-muted ml-1">Confirm Password</label>
        <div class="relative group">
          <Lock class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted group-focus-within:text-primary transition-colors" />
          <input 
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'" 
            placeholder="••••••••"
            required
            class="w-full bg-surface-zenith border border-border-zenith rounded-lg py-2.5 pl-10 pr-4 outline-none focus:border-primary transition-all text-xs font-bold"
          />
        </div>
      </div>

      <button 
        type="submit" 
        :disabled="isLoading"
        class="w-full bg-primary hover:bg-accent text-white py-3 rounded-lg font-black uppercase tracking-widest text-[10px] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-1"
      >
        <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        <span v-else>Start Your Journey</span>
        <ArrowRight v-if="!isLoading" class="w-3.5 h-3.5" />
      </button>

      <AuthSocialLogin />
    </form>

    <template #footer>
      <div class="text-center">
        <p class="text-[10px] font-black text-muted uppercase tracking-tight">
          Already a member? 
          <NuxtLink to="/auth/login" class="text-primary hover:underline ml-1">Sign In</NuxtLink>
        </p>
      </div>
    </template>
  </AuthLayout>
</template>
