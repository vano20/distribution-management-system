import { defineStore } from 'pinia'
import type { LoginForm } from '~/types/login'
import type { User } from '~/types/user'

const profile: Record<string, User> = {
  ['admin@gmail.com']: {
    password: 'Random1234',
    fullName: 'Admin Pusat',
    roleId: 1
  },
  ['regional@gmail.com']: {
    password: 'Random1234',
    fullName: 'Admin regional',
    roleId: 2
  }
}

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(false)
  const userProfile = ref<User | null>(null)
  const rememberMe = ref(false)

  const login = (loginForm: LoginForm): { error: string } => {
    const loginStateCookie = useCookie('is-logged-in')
    const userProfileCookie = useCookie('user-profile')
    let error = ''
    const selectedProfile = profile[loginForm.email]

    if (!selectedProfile || selectedProfile.password !== loginForm.password) error = 'Data user tidak ditemukan'

    if (!error) {
      isLogin.value = true
      userProfile.value = selectedProfile ?? null
      rememberMe.value = loginForm.remember
      loginStateCookie.value = '1'
      userProfileCookie.value = JSON.stringify(selectedProfile)
    }

    return { error }
  }

  const logout = () => {
    const loginStateCookie = useCookie('is-logged-in')
    const userProfileCookie = useCookie('user-profile')

    isLogin.value = false
    userProfile.value = null

    loginStateCookie.value = ''
    userProfileCookie.value = ''
  }

  return {
    login,
    logout,

    isLogin,
    userProfile
  }
},
  {
    persist: {
      pick: ['isLogin', 'userProfile']
    }
  })