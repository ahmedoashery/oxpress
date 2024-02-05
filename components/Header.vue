<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [
  { label: 'من نحن', to: '/docs' },
  { label: 'الاسعار', to: '/pricing' },
  { label: 'الاخبار', to: '/blog' }
]

const { status, data, signOut } = useAuth()

const logout = async () => await signOut({redirect: true})
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
        Logged in as "{{ data?.user?.name }}"
      </p>
      <UButton v-if="status !== 'authenticated'" label="دخول" color="primary" to="/login" variant="soft" />
      <UButton v-else label="خروج" color="red" variant="soft" @click="logout" />
      <UButton label="انشاء حساب" icon="i-heroicons-arrow-left-20-solid" trailing color="black" to="/signup"
        variant="link" class="hidden lg:flex" />
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>
