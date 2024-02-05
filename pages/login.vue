<script setup lang="ts">
const { signIn } = useAuth()

definePageMeta({
  layout: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})

useSeoMeta({
  title: 'Login'
})

const fields = [{
  name: 'username',
  type: 'text',
  label: 'اسم المستخدم',
  placeholder: 'بريد الكترونى',
}, {
  name: 'password',
  label: 'كلمة المرور',
  type: 'password',
  placeholder: 'كلمة المرور'
}]

const validate = (state: any) => {
  const errors = []
  if (!state.username) errors.push({ path: 'username', message: 'ادخل بريد صحيح' })
  if (!state.password) errors.push({ path: 'password', message: 'ادخل كلمة المرور' })
  return errors
}

const providers = [{
  label: 'تسجيل الدخول بـ Github',
  icon: 'i-simple-icons-github',
  color: 'white' as const,
  click: () => {
    console.log('Redirect to GitHub')
  }
}]

async function onSubmit(data: { username: string, password: string }) {
  await signIn('credentials', { username: data.username, password: data.password, redirect: true, callbackUrl: '/', })
}
</script>

<template>
  <ClientOnly>
    <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
      <ULandingCard>
        <UAuthForm divider="أو" :fields="fields" :validate="validate" :providers="providers" title="تسجيل الدخول للحساب"
          :align="'top'" icon="i-heroicons-lock-closed" :ui="{ base: 'text-center', footer: 'text-center' }"
          :submit-button="{ trailingIcon: 'i-heroicons-arrow-left-20-solid', label: 'تسجيل الدخول' }" @submit="onSubmit">
          <template #description>
            ليس لديك حساب؟ <NuxtLink to="/signup" class="text-primary font-medium">انشاء حساب</NuxtLink>.
          </template>

          <template #password-hint>
            <NuxtLink to="/" class="text-primary font-medium">نسيت كلمة المرور؟</NuxtLink>
          </template>

          <template #footer>
            بمجرد تسجيل الدخول توافق على <NuxtLink to="/" class="text-primary font-medium">شروط الخدمة</NuxtLink>.
          </template>
        </UAuthForm>
      </ULandingCard>
    </UCard>
  </ClientOnly>
</template>
