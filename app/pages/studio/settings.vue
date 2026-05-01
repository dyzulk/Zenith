<script setup lang="ts">
definePageMeta({
  layout: 'studio',
  middleware: 'studio-auth'
})

const links = [
  [{
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
    icon: 'i-lucide-lock',
    to: '/studio/settings/security'
  }]
]
</script>

<template>
  <UDashboardPanel id="settings">
    <template #header>
      <UDashboardNavbar title="Settings">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="p-8">
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>
