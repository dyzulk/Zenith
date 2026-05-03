<script setup lang="ts">
definePageMeta({
  layout: 'studio-settings',
  middleware: 'studio-auth'
})

const toast = useToast()
const { data, refresh } = await useFetch('/api/studio/roles')

const roles = computed(() => data.value?.roles || [])
const availablePermissions = computed(() => data.value?.availablePermissions || [])

const isSaving = ref<string | null>(null)

const togglePermission = async (roleId: string, permissionId: string) => {
  const role = roles.value.find(r => r.id === roleId)
  if (!role) return

  let newPermissions = [...role.permissions]
  if (newPermissions.includes(permissionId)) {
    newPermissions = newPermissions.filter(p => p !== permissionId)
  } else {
    newPermissions.push(permissionId)
  }

  isSaving.value = roleId
  try {
    await $fetch('/api/studio/roles/update', {
      method: 'POST',
      body: { roleId, permissions: newPermissions }
    })
    toast.add({ title: 'Success', description: `Permissions for ${role.name} updated`, color: 'success' })
    await refresh()
  } catch (e) {
    toast.add({ title: 'Error', description: 'Failed to update permissions', color: 'error' })
  } finally {
    isSaving.value = null
  }
}

const hasPermission = (role: any, permissionId: string) => {
  return role.permissions.includes(permissionId)
}

// Group permissions by category (prefix before :)
const groupedPermissions = computed(() => {
  const groups: Record<string, any[]> = {}
  availablePermissions.value.forEach(p => {
    const category = p.id.split(':')[0]
    if (!groups[category]) groups[category] = []
    groups[category].push(p)
  })
  return groups
})
</script>

<template>
  <div class="space-y-8">
    <UPageHeader
      title="Roles & Permissions"
      description="Manage granular access control for your studio staff."
      class="border-b border-default pb-8"
    />

    <div v-for="role in roles" :key="role.id" class="relative">
      <UPageCard 
        :title="role.name" 
        :description="role.description || 'No description'"
        class="overflow-hidden"
      >
        <template #footer>
           <div class="flex items-center gap-2 text-xs text-muted">
            <UIcon name="i-lucide-info" class="w-4 h-4" />
            Changes are saved automatically.
          </div>
        </template>

        <div class="space-y-6">
          <div v-for="(perms, category) in groupedPermissions" :key="category" class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold uppercase tracking-wider text-primary/60">{{ category }}</span>
              <div class="h-px flex-1 bg-primary/10"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div 
                v-for="perm in perms" 
                :key="perm.id"
                class="flex items-center justify-between p-3 rounded-lg border border-default bg-background/50 hover:bg-background transition-colors group"
              >
                <div class="flex flex-col">
                  <span class="text-sm font-medium">{{ perm.name }}</span>
                  <span class="text-[10px] text-muted">{{ perm.id }}</span>
                </div>
                
                <UToggle 
                  :model-value="hasPermission(role, perm.id)"
                  :loading="isSaving === role.id"
                  :disabled="role.id === 'superadmin'"
                  @update:model-value="togglePermission(role.id, perm.id)"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="role.id === 'superadmin'" class="absolute inset-0 z-10 bg-background/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
          <div class="bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase px-2 py-1 rounded-full backdrop-blur-md">
            Superadmin Access Locked
          </div>
        </div>
      </UPageCard>
    </div>
  </div>
</template>
