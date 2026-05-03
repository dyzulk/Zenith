<script setup lang="ts">
import type { User } from '~/types/studio'

definePageMeta({
  layout: 'studio',
  middleware: 'auth'
})

const { data, status } = await useFetch<User[]>('/api/studio/users', {
  lazy: true
})
</script>

<template>
  <UDashboardPanel id="users">
    <template #header>
      <UDashboardNavbar title="Users">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <StudioUsersAddModal />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <StudioUsersUserList 
        :data="data || []" 
        :status="status" 
      />
    </template>
  </UDashboardPanel>
</template>

