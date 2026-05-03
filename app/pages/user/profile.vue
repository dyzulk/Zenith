<script setup lang="ts">
import { User, Mail, Shield, LogOut, Camera, History, Bookmark, Settings, Check, CreditCard } from 'lucide-vue-next'
const { user, logout } = useAuth()
const { getAvatar } = useZenithImage()

definePageMeta({
  middleware: 'auth'
})

const stats = [
  { label: 'Watched', value: '124', icon: History },
  { label: 'Watchlist', value: '32', icon: Bookmark },
  { label: 'XP Points', value: '1,250', icon: Star },
]
</script>

<template>
  <div class="is-zenith min-h-screen pt-32 pb-24" v-if="user">
    <div class="container mx-auto px-6 max-w-5xl space-y-12">
      <!-- Profile Header -->
      <div class="relative animate-reveal-up">
        <div class="h-64 rounded-[3rem] bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-border-zenith relative overflow-hidden">
           <div class="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
           <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 blur-[120px]"></div>
        </div>

        <div class="px-12 -mt-20 flex flex-col md:flex-row items-end gap-8 relative z-10">
          <div class="relative group">
            <div class="w-40 h-40 rounded-[2.5rem] bg-surface-zenith border-4 border-background overflow-hidden shadow-2xl">
              <img :src="getAvatar(user)" class="w-full h-full object-cover transition-transform group-hover:scale-110" />
            </div>
            <button class="absolute bottom-2 right-2 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all border-4 border-background">
              <Camera class="w-5 h-5" />
            </button>
          </div>

          <div class="flex-1 pb-4 space-y-2">
            <div class="flex items-center gap-3">
              <h1 class="text-5xl font-black tracking-tighter uppercase">{{ user.username }}</h1>
              <span class="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest">{{ user.role }}</span>
            </div>
            <div class="flex items-center gap-6 text-muted font-bold text-sm italic">
              <span class="flex items-center gap-2"><Mail class="w-4 h-4" /> {{ user.email }}</span>
              <span class="flex items-center gap-2"><Clock class="w-4 h-4" /> Joined {{ new Date().getFullYear() }}</span>
            </div>
          </div>

          <div class="pb-4">
            <button @click="logout" class="flex items-center gap-3 px-8 py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
              <LogOut class="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-reveal-up" style="animation-delay: 0.1s">
        <div v-for="stat in stats" :key="stat.label" class="glass-panel p-8 rounded-[2.5rem] border border-border-zenith flex items-center justify-between">
           <div class="space-y-1">
             <p class="text-xs font-black uppercase tracking-widest text-muted">{{ stat.label }}</p>
             <h3 class="text-3xl font-black text-foreground">{{ stat.value }}</h3>
           </div>
           <div class="w-12 h-12 rounded-2xl bg-surface-zenith flex items-center justify-center">
             <component :is="stat.icon" class="w-6 h-6 text-primary" />
           </div>
        </div>
      </div>

      <!-- Main Content Tabs -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-reveal-up" style="animation-delay: 0.2s">
        <!-- Settings Sidebar -->
        <div class="space-y-4">
           <h3 class="text-xs font-black uppercase tracking-[0.3em] text-muted mb-6">Account Control</h3>
           <button class="w-full flex items-center gap-4 p-5 rounded-2xl bg-surface-zenith border border-primary/30 text-primary shadow-xl shadow-primary/5 transition-all">
             <User class="w-5 h-5" />
             <span class="text-sm font-black uppercase tracking-widest">Personal Info</span>
             <Check class="w-4 h-4 ml-auto" />
           </button>
           <button class="w-full flex items-center gap-4 p-5 rounded-2xl bg-transparent border border-border-zenith text-muted hover:border-primary/20 hover:text-foreground transition-all">
             <Shield class="w-5 h-5" />
             <span class="text-sm font-black uppercase tracking-widest">Security</span>
           </button>
           <button class="w-full flex items-center gap-4 p-5 rounded-2xl bg-transparent border border-border-zenith text-muted hover:border-primary/20 hover:text-foreground transition-all">
             <CreditCard class="w-5 h-5" />
             <span class="text-sm font-black uppercase tracking-widest">Subscription</span>
           </button>
           <button class="w-full flex items-center gap-4 p-5 rounded-2xl bg-transparent border border-border-zenith text-muted hover:border-primary/20 hover:text-foreground transition-all">
             <Settings class="w-5 h-5" />
             <span class="text-sm font-black uppercase tracking-widest">Preferences</span>
           </button>
        </div>

        <!-- Forms / Display -->
        <div class="lg:col-span-2 space-y-8">
           <div class="glass-panel p-10 rounded-[3rem] border border-border-zenith space-y-8">
              <h4 class="text-2xl font-black uppercase tracking-tight">Personal Information</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-2">
                   <label class="text-[10px] font-black uppercase tracking-widest text-muted">Username</label>
                   <input type="text" :value="user.username" disabled class="w-full bg-surface-zenith border border-border-zenith rounded-xl p-4 text-sm font-bold opacity-60" />
                 </div>
                 <div class="space-y-2">
                   <label class="text-[10px] font-black uppercase tracking-widest text-muted">Email Address</label>
                   <input type="email" :value="user.email" disabled class="w-full bg-surface-zenith border border-border-zenith rounded-xl p-4 text-sm font-bold opacity-60" />
                 </div>
                 <div class="md:col-span-2 space-y-2">
                   <label class="text-[10px] font-black uppercase tracking-widest text-muted">Bio / Status</label>
                   <textarea placeholder="Write something about yourself..." class="w-full bg-surface-zenith border border-border-zenith rounded-xl p-4 text-sm focus:outline-none focus:border-primary transition-all resize-none h-32"></textarea>
                 </div>
              </div>

              <div class="pt-6 border-t border-border-zenith flex justify-end">
                <button class="btn-premium px-10 py-4 text-[10px]">
                  Update Profile
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>
