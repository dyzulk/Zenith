<script setup lang="ts">
const props = defineProps<{
  data: any[]
  pending: boolean
}>()

const emit = defineEmits(['refresh'])
const toast = useToast()

// Modal state
const isCreateOpen = ref(false)
const newKeyName = ref('')
const isCreating = ref(false)

// View once token state
const newlyCreatedToken = ref<string | null>(null)

const columns = [{
  key: 'name',
  label: 'Name'
}, {
  key: 'maskedId',
  label: 'Token'
}, {
  key: 'createdAt',
  label: 'Created On'
}, {
  key: 'lastUsed',
  label: 'Last Used'
}, {
  key: 'actions',
  label: ''
}]

const createKey = async () => {
  if (!newKeyName.value.trim()) return
  
  isCreating.value = true
  try {
    const res: any = await $fetch('/api/studio/apikeys/create', {
      method: 'POST',
      body: { name: newKeyName.value }
    })
    
    toast.add({ title: 'Success', description: 'API Key created', color: 'success' })
    newlyCreatedToken.value = res.token
    newKeyName.value = ''
    emit('refresh')
  } catch (e: any) {
    toast.add({ title: 'Error', description: e.statusMessage || 'Failed to create API key', color: 'error' })
  } finally {
    isCreating.value = false
  }
}

const copyToClipboard = async () => {
  if (newlyCreatedToken.value) {
    await navigator.clipboard.writeText(newlyCreatedToken.value)
    toast.add({ title: 'Copied!', description: 'API Key copied to clipboard', color: 'success' })
  }
}

const closeTokenModal = () => {
  isCreateOpen.value = false
  newlyCreatedToken.value = null
}

const isRevoking = ref<string | null>(null)
const revokeKey = async (id: string) => {
  if (!confirm('Are you sure you want to revoke this API key? Any applications using it will lose access immediately.')) return
  
  isRevoking.value = id
  try {
    await $fetch('/api/studio/apikeys/revoke', {
      method: 'POST',
      body: { id }
    })
    toast.add({ title: 'Revoked', description: 'API Key revoked successfully', color: 'success' })
    emit('refresh')
  } catch (e: any) {
    toast.add({ title: 'Error', description: e.statusMessage || 'Failed to revoke API key', color: 'error' })
  } finally {
    isRevoking.value = null
  }
}

// Expose the openModal method so the parent can call it
defineExpose({
  openModal: () => {
    isCreateOpen.value = true
  }
})
</script>

<template>
  <div>
    <UPageCard>
      <UTable 
        :rows="data" 
        :columns="columns"
        :loading="pending"
        class="w-full"
      >
        <template #maskedId-data="{ row }">
          <code class="text-xs bg-bg/50 px-2 py-1 rounded text-muted font-mono">
            {{ row.maskedId }}
          </code>
        </template>
        
        <template #createdAt-data="{ row }">
          <span class="text-sm">{{ new Date(row.createdAt).toLocaleDateString() }}</span>
        </template>

        <template #lastUsed-data="{ row }">
          <span class="text-sm text-muted">
            {{ row.lastUsed && row.lastUsed !== row.createdAt ? new Date(row.lastUsed).toLocaleString() : 'Never used' }}
          </span>
        </template>

        <template #actions-data="{ row }">
          <div class="flex justify-end">
            <UButton 
              color="error" 
              variant="ghost" 
              icon="i-lucide-trash-2" 
              size="xs"
              :loading="isRevoking === row.id"
              @click="revokeKey(row.id)"
            >
              Revoke
            </UButton>
          </div>
        </template>

        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
            <UIcon name="i-lucide-key" class="w-12 h-12 text-muted mb-4" />
            <h3 class="text-lg font-medium">No API Keys Found</h3>
            <p class="text-sm text-muted mt-1 max-w-sm">
              You haven't generated any API keys yet. Generate one to interact with the GoxStream API programmatically.
            </p>
            <UButton 
              icon="i-lucide-plus" 
              color="primary" 
              class="mt-6"
              @click="isCreateOpen = true"
            >
              Generate your first token
            </UButton>
          </div>
        </template>
      </UTable>
    </UPageCard>

    <!-- Create Modal -->
    <UModal v-model="isCreateOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-default' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-default">
              Generate new API key
            </h3>
            <UButton color="neutral" variant="ghost" icon="i-lucide-x" class="-my-1" @click="closeTokenModal" />
          </div>
        </template>

        <div v-if="!newlyCreatedToken" class="space-y-4">
          <p class="text-sm text-muted">
            Give your token a descriptive name so you remember what it's used for (e.g., "Discord Bot", "Postman").
          </p>
          <UFormGroup label="Token Name" required>
            <UInput 
              v-model="newKeyName" 
              placeholder="What's this token for?" 
              autofocus
              @keydown.enter="createKey"
            />
          </UFormGroup>
        </div>

        <div v-else class="space-y-4">
          <UAlert
            icon="i-lucide-alert-triangle"
            color="warning"
            variant="subtle"
            title="Save this token now!"
            description="Make sure to copy your new personal access token now. You won't be able to see it again!"
          />
          
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1">Your new API Key</label>
            <div class="flex gap-2">
              <UInput 
                :model-value="newlyCreatedToken" 
                readonly 
                class="flex-1 font-mono text-sm"
              />
              <UButton 
                color="primary" 
                icon="i-lucide-copy" 
                @click="copyToClipboard"
              >
                Copy
              </UButton>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton 
              v-if="!newlyCreatedToken"
              color="neutral" 
              variant="ghost" 
              @click="closeTokenModal"
            >
              Cancel
            </UButton>
            <UButton 
              v-if="!newlyCreatedToken"
              color="primary" 
              :loading="isCreating"
              :disabled="!newKeyName.trim()"
              @click="createKey"
            >
              Generate Token
            </UButton>
            <UButton 
              v-else
              color="primary" 
              @click="closeTokenModal"
            >
              I have saved it, Close
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
