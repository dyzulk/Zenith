<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const isProfileSection = computed(() => route.path.startsWith('/studio/profile'))

const settingsLinks = [[{
  label: 'General Settings',
  icon: 'i-lucide-settings',
  to: '/studio/settings',
  exact: true
}, {
  label: 'Appearance',
  icon: 'i-lucide-palette',
  to: '/studio/settings/appearance'
}, {
  label: 'Core',
  icon: 'i-lucide-cpu',
  to: '/studio/settings/core'
}, {
  label: 'Permissions',
  icon: 'i-lucide-key-round',
  to: '/studio/settings/permissions'
}, {
  label: 'Notifications',
  icon: 'i-lucide-bell',
  to: '/studio/settings/notifications'
}, {
  label: 'Security',
  icon: 'i-lucide-shield',
  to: '/studio/settings/security'
}]] satisfies NavigationMenuItem[][]

const profileLinks = [[{
  label: 'Profile',
  icon: 'i-lucide-user',
  to: '/studio/profile',
  exact: true
}, {
  label: 'Security',
  icon: 'i-lucide-shield',
  to: '/studio/profile/security'
}]] satisfies NavigationMenuItem[][]

const links = computed(() => isProfileSection.value ? profileLinks : settingsLinks)
const title = computed(() => isProfileSection.value ? 'My Profile' : 'Settings')
</script>

<template>
  <NuxtLayout name="studio">
    <UDashboardPanel id="settings" :ui="{ body: 'lg:py-12' }">
      <template #header>
        <UDashboardNavbar :title="title">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>
        </UDashboardNavbar>

        <UDashboardToolbar>
          <UNavigationMenu :items="links" highlight class="-mx-1 flex-1" />
        </UDashboardToolbar>
      </template>

      <template #body>
        <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto">
          <slot />
        </div>
      </template>
    </UDashboardPanel>
  </NuxtLayout>
</template>
