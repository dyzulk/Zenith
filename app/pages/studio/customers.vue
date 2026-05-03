<script setup lang="ts">
import type { User } from '~/types/studio'

definePageMeta({
  layout: 'studio',
  middleware: 'studio-auth'
})

const { data, status } = await useFetch<User[]>('/api/customers', {
  lazy: true
})
</script>

<template>
  <UDashboardPanel id="customers">
    <template #header>
      <UDashboardNavbar title="Customers">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <StudioCustomersAddModal />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <StudioCustomersCustomerList 
        :data="data || []" 
        :status="status" 
      />
    </template>
  </UDashboardPanel>
</template>

