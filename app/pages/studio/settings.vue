<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

definePageMeta({
  layout: 'studio',
  middleware: 'studio-auth'
})

const links = [[{
  label: 'Profile',
  icon: 'i-lucide-user',
  to: '/studio/settings',
  exact: true
}, {
  label: 'Site Management',
  icon: 'i-lucide-globe',
  to: '/studio/settings/site'
}, {
  label: 'Members',
  icon: 'i-lucide-users',
  to: '/studio/settings/members'
}, {
  label: 'Notifications',
  icon: 'i-lucide-bell',
  to: '/studio/settings/notifications'
}, {
  label: 'Security',
  icon: 'i-lucide-shield',
  to: '/studio/settings/security'
}]] satisfies NavigationMenuItem[][]
</script>

<template>
  <UDashboardPanel id="settings" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <UDashboardNavbar title="Settings">
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
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>
