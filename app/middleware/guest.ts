export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  if (auth.isLogin) {
    return navigateTo('/')
  }
})
