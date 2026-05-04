<script setup lang="ts">
definePageMeta({
  layout: 'studio-settings',
  middleware: 'auth'
})

const { data, refresh, pending } = await useFetch('/api/studio/apikeys')

const keys = computed(() => data.value?.apiKeys || [])

const managerRef = ref<any>(null)

const handleCreate = () => {
  managerRef.value?.openModal()
}
</script>

<template>
  <div class="space-y-8">
    <UPageHeader
      title="API Keys"
      description="Manage Personal Access Tokens for programmatic access to the GoxStream API via cURL, Postman, or third-party bots."
      class="border-b border-default pb-8"
    >
      <template #links>
        <UButton 
          icon="i-lucide-plus" 
          color="primary" 
          label="Generate new token"
          @click="handleCreate"
        />
      </template>
    </UPageHeader>

    <StudioProfileApiKeysManager 
      ref="managerRef"
      :data="keys" 
      :pending="pending" 
      @refresh="refresh" 
    />
  </div>
</template>
