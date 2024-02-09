<script setup lang="ts">
const { signIn } = useAuth()
definePageMeta({
    layout: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/dashboard',
    }
})

useHead({
    title: 'Login Page',
})

const tabs = [
    {
        label: 'تسجيل الدخول',
        slot: 'login',
    },
    {
        label: 'حساب جديد',
        slot: 'register',
    },
]

const loginForm = ref({
    email: 'ahmedoashery@gmail.com',
    password: '123',
})
const registerForm = ref({
    email: 'ahmedoashery@gmail.com',
    password: '123',
})
const hidden = ref(true)


const toast = useToast()

const onError = (err: any) => {
    toast.add({
        color: 'red',
        title: 'Error',
        description: err?.data.message ?? err?.message ?? err,
    })
}

const login = async (data: { email: string, password: string }) => {
    data = { email: loginForm.value.email, password: loginForm.value.password }
    await signIn("credentials", data).catch(onError)
}

const register = async (data: { email: string, password: string }) => {
    data = { email: loginForm.value.email, password: loginForm.value.password }
    await $fetch('/api/user/register', {
        method: 'POST',
        body: data,
    }).catch(onError)
}
</script>

<template>
    <ClientOnly>
        <UContainer :ui="{ constrained: 'max-w-xl' }">
            <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur shadow-lg">
                <UTabs class="p-4" :items="tabs">
                    <template #login="{ item }">
                        <UForm :state="loginForm" @submit="login">
                            <UCard>
                                <template #header>
                                    <div class="flex">
                                        <UIcon class="w-12 h-12 mr-2 bg-primary" name="i-heroicons-user" />
                                        <div>
                                            <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                                {{ item.label }}
                                            </p>
                                            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                تسجيل الدخول للحساب.
                                            </p>
                                        </div>
                                    </div>
                                </template>

                                <UFormGroup label="اسم المستخدم" name="email" class="mb-3" required>
                                    <UInput v-model="loginForm.email" placeholder="user@gmail.com"
                                        icon="i-heroicons-envelope" />
                                </UFormGroup>
                                <UFormGroup label="كلمة المرور" name="password" required>
                                    <UInput v-model="loginForm.password" placeholder="password"
                                        icon="i-heroicons-lock-closed" :type="hidden ? 'password' : 'text'"
                                        :ui="{ icon: { trailing: { pointer: '' } } }">
                                        <template #trailing>
                                            <UButton :icon="hidden ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                                                variant="link" :padded="false" @click="hidden = !hidden" />
                                        </template>
                                    </UInput>
                                </UFormGroup>

                                <template #footer>
                                    <UButton class="w-full justify-center" type="submit">
                                        دخول
                                    </UButton>
                                </template>
                            </UCard>
                        </UForm>
                    </template>
                    <template #register="{ item }">
                        <UForm :state="registerForm" @submit="register">
                            <UCard>
                                <template #header>
                                    <div class="flex">
                                        <UIcon class="w-12 h-12 mr-2 bg-cyan-400" name="i-heroicons-user-plus" />
                                        <div>
                                            <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                                {{ item.label }}
                                            </p>
                                            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                تسجيل حساب جديد
                                            </p>
                                        </div>
                                    </div>
                                </template>

                                <UFormGroup label="البريد الالكترونى" name="email" class="mb-3" required>
                                    <UInput v-model="registerForm.email" placeholder="example@domain.com"
                                        icon="i-heroicons-envelope" />
                                </UFormGroup>
                                <UFormGroup label="كلمة المرور" name="password" required>
                                    <UInput v-model="registerForm.password" placeholder="password"
                                        icon="i-heroicons-lock-closed" :type="hidden ? 'password' : 'text'"
                                        :ui="{ icon: { trailing: { pointer: '' } } }">
                                        <template #trailing>
                                            <UButton :icon="hidden ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                                                variant="link" :padded="false" @click="hidden = !hidden" />
                                        </template>
                                    </UInput>
                                </UFormGroup>

                                <template #footer>
                                    <UButton class="w-full justify-center" type="submit" color="cyan">
                                        تسجيل
                                    </UButton>
                                </template>
                            </UCard>
                        </UForm>
                    </template>
                </UTabs>
            </UCard>
        </UContainer>
    </ClientOnly>
</template>