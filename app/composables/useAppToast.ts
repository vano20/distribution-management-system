import type { ToastProps } from "@nuxt/ui"

export function useAppToast() {
  const toasts = useToast()

  const show = (color: ToastProps['color'], description = '', title = 'Error') => {
    toasts.add({
      title,
      color,
      description,
      duration: 3000,
    })
  }

  return {
    error: (d: string, t: string = 'Error') => show('error', d, t),
    success: (d: string, t: string = 'Success') => show('success', d, t)
  }
}