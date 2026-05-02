<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const fileRef = ref<HTMLInputElement>()

const profileSchema = z.object({
  name: z.string().min(2, 'Too short'),
  email: z.string().email('Invalid email'),
  username: z.string().min(2, 'Too short'),
  avatar: z.string().optional(),
  bio: z.string().optional()
})

type ProfileSchema = z.output<typeof profileSchema>

const { data: userProfile, refresh } = await useFetch<any>('/api/auth/me')

const profile = reactive<Partial<ProfileSchema>>({
  name: '',
  email: '',
  username: '',
  avatar: undefined,
  bio: undefined
})

watchEffect(() => {
  if (userProfile.value?.user) {
    const u = userProfile.value.user
    Object.assign(profile, {
      name: u.displayName || u.username,
      email: u.email || '', // Email might not be in profile but in auth
      username: u.username,
      avatar: u.avatarUrl,
      bio: ''
    })
  }
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<ProfileSchema>) {
  try {
    await $fetch('/api/studio/profile', {
      method: 'PUT',
      body: event.data
    })
    toast.add({
      title: 'Berhasil',
      description: 'Profil Anda telah diperbarui.',
      icon: 'i-lucide-check',
      color: 'success'
    })
    await refresh()
  } catch (e: any) {
    toast.add({
      title: 'Gagal',
      description: e.statusMessage || 'Gagal memperbarui profil.',
      color: 'error'
    })
  }
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) {
    return
  }

  profile.avatar = URL.createObjectURL(input.files[0]!)
}

function onFileClick() {
  fileRef.value?.click()
}
</script>

<template>
  <UForm
    id="settings"
    :schema="profileSchema"
    :state="profile"
    @submit="onSubmit"
  >
    <UPageCard
      title="Profile"
      description="These informations will be displayed publicly."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        form="settings"
        label="Save changes"
        color="neutral"
        type="submit"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <UPageCard variant="subtle">
      <UFormField
        name="name"
        label="Name"
        description="Will appear on receipts, invoices, and other communication."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
        :ui="{ container: 'w-full max-w-md' }"
      >
        <UInput
          v-model="profile.name"
          autocomplete="off"
          class="w-full"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="email"
        label="Email"
        description="Used to sign in, for email receipts and product updates."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
        :ui="{ container: 'w-full max-w-md' }"
      >
        <UInput
          v-model="profile.email"
          type="email"
          autocomplete="off"
          class="w-full"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="username"
        label="Username"
        description="Your unique username for logging in and your profile URL."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
        :ui="{ container: 'w-full max-w-md' }"
      >
        <UInput
          v-model="profile.username"
          type="username"
          autocomplete="off"
          class="w-full"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="avatar"
        label="Avatar"
        description="Rasio 1:1. WebP sangat disarankan."
        class="flex max-sm:flex-col justify-between sm:items-center gap-4"
      >
        <StudioImageUpload 
          v-model="profile.avatar" 
          label="Avatar" 
          description="Foto profil Anda"
          :aspect-ratio="1"
          :max-resolution="{ width: 400, height: 400 }"
          path-prefix="avatars"
          class="w-32"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="bio"
        label="Bio"
        description="Brief description for your profile. URLs are hyperlinked."
        class="flex max-sm:flex-col justify-between items-start gap-4"
        :ui="{ container: 'w-full max-w-md' }"
      >
        <UTextarea
          v-model="profile.bio"
          :rows="5"
          autoresize
          class="w-full"
        />
      </UFormField>
    </UPageCard>
  </UForm>
</template>
