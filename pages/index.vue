<script setup lang="ts">
definePageMeta({ auth: false })
const { getSession, getCsrfToken, getProviders, data, status, lastRefreshedAt } = useAuth()
// const providers = await getProviders()
const token = await getCsrfToken()
const session = await getSession()
const headers = useRequestHeaders(['cookie']) as HeadersInit
// const { data: token } = await useFetch('/api/auth/token', { headers })

</script>

<template>
  <div>
    <ULandingHero title="Landing Hero" description="description" :links="[]">
      <div
        class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
      </div>

      <template #headline>
        <UBadge variant="subtle" size="lg" class="relative rounded-full font-semibold">
          <NuxtLink to="/" target="_blank" class="focus:outline-none" tabindex="-1">
            <span class="absolute inset-0" aria-hidden="true"></span>تسوق الآن
          </NuxtLink>

          <UIcon name="i-hericons-home" class="ml-1 w-4 h-4 pointer-events-none" />
        </UBadge>
      </template>
    </ULandingHero>

    <ULandingSection class="!pt-0">
      <Placeholder />
    </ULandingSection>

    <ULandingSection>
      <Placeholder />
    </ULandingSection>

    <ULandingSection title="features" description="features description">
      <ClientOnly>
        <UPageGrid>
          <ULandingCard />
          <ULandingCard />
          <ULandingCard />
        </UPageGrid>
      </ClientOnly>
    </ULandingSection>

    <ULandingSection headline="testimonials headline" title="testimonials title" description="testimonials description">
      <UPageColumns class="xl:columns-4">
        <ULandingTestimonial quote="" class="bg-gray-100/50 dark:bg-gray-800/50" />
      </UPageColumns>
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA class="bg-gray-100/50 dark:bg-gray-800/50" />
    </ULandingSection>
  </div>
</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}

.dark {
  .landing-grid {
    background-image:
      linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
</style>
