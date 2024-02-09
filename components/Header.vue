<script setup lang="ts">

const links = [
  { label: 'من نحن', to: '/docs' },
  { label: 'الاسعار', to: '/pricing' },
  { label: 'الاخبار', to: '/blog' }
]

const { status, data, signOut} = useAuth()

const logout = async () => await signOut()
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      Express
      <UBadge label="TM" variant="subtle" class="mb-0.5" />
    </template>

    <template #right>
      <UColorModeButton />
      <p v-if="status === 'authenticated'">
        مرحباً "{{ data?.user?.name }}"
      </p>
      <UButton v-if="status === 'unauthenticated'" label="دخول" color="primary" to="/login" variant="soft" />
      <UButton v-else label="خروج" color="red" variant="link" @click="logout" />
    </template>

    <template #panel>
      <UNavigationTree :links="links" default-open />
    </template>
  </UHeader>
</template>
