<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { Login, type LoginForm } from "~/types/login";

definePageMeta({
  layout: 'login',
  middleware: 'guest'
})

const state = reactive({
  email: '',
  password: '',
  remember: false
})

const authStore = useAuthStore()
const { login } = authStore
const toasts = useAppToast()

const showPassword = ref(false)
const loading = ref(false)

const onSubmit = async (event: FormSubmitEvent<LoginForm>) => {
  loading.value = true

  await new Promise(resolve => setTimeout(resolve, 1500))

  const { error } = login({
    email: state.email,
    password: state.password,
    remember: state.remember
  });

  if (!error) navigateTo('/')

  if (error)
    toasts.error(error)

  loading.value = false
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome to DMS
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>
      </template>

      <UForm :state="state" :schema="Login" @submit="onSubmit">
        <div class="space-y-4">
          <UFormField label="Email" name="email" required>
            <UInput v-model="state.email" type="email" placeholder="you@example.com" icon="i-heroicons-envelope"
              size="lg" :ui="{ root: 'relative inline-flex items-center w-full' }" />
          </UFormField>

          <UFormField label="Password" name="password" required>
            <UInput v-model="state.password" :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password" icon="i-heroicons-lock-closed" size="lg"
              :ui="{ root: 'relative inline-flex items-center w-full' }">
              <template #trailing>
                <UButton :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" variant="ghost"
                  color="neutral" @click="showPassword = !showPassword" />
              </template>
            </UInput>
          </UFormField>

          <div class="flex items-center justify-between">
            <UCheckbox v-model="state.remember" label="Remember me" />
          </div>

          <UButton type="submit" color="primary" size="lg" block :loading="loading">
            Sign In
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>