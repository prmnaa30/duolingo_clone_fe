/* eslint-disable @typescript-eslint/no-explicit-any */
interface GoogleRedirectResponse {
  url: string
}

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload extends LoginPayload {
  name: string
  password_confirmation: string
}

interface User {
  id: number
  name: string
  email: string
  joined_at: Date
  avatar_url: string | null
  stats: {
    energy: number
    gems: number
    streak: number
    xp: number
    next_heart_in: Date | null
    rank: number
  }
}

interface AuthResponse {
  token: string
  user: User
}

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig()
  const BASE_API = config.public.baseApi
  const toast = useToast()

  // * states * //
  const token = useCookie('auth')
  const user = ref<User | null>(null)
  const loading = ref(false)
  const googleLoginUrl = ref<string | null>(null)

  // * getter & setter * //
  const setToken = (newToken: string) => {
    token.value = newToken
  }

  // * methods * //
  const fetchUser = async () => {
    if (!token.value) return

    try {
      const response = await $fetch<{ data: User }>(`${BASE_API}/me`, {
        headers: { authorization: `Bearer ${token.value}` }
      })

      user.value = response.data as User
    } catch (error: any) {
      console.error('Error saat mengambil data user', error)

      if (error.statusCode) {
        token.value = null
        user.value = null

        await navigateTo('/login')
      }

      if (import.meta.client) {
        toast.add({
          title: 'Sesi Berakhir',
          description: 'Data user tidak valid, silahkan login kembali',
          color: 'error'
        })
      }
    }
  }

  const loginWithGoogle = async () => {
    try {
      const response = await $fetch<GoogleRedirectResponse>(`${BASE_API}/auth/google`)

      if (response.url) {
        window.location.href = response.url
      }
    } catch (error) {
      console.error('Google login error: ', error)
      toast.add({
        title: 'Error',
        description: error instanceof Error ? error.message : String(error),
        color: 'error'
      })
    }
  }

  const login = async (payload: LoginPayload) => {
    try {
      loading.value = true

      const response = await $fetch<AuthResponse>(`${BASE_API}/auth/login`, {
        method: 'POST',
        body: payload
      })

      token.value = response.token
      await fetchUser()

      await navigateTo('/learning-map')
    } catch (error) {
      console.error('Login error: ', error)
      toast.add({
        title: 'Error',
        description: error instanceof Error ? error.message : String(error),
        color: 'error'
      })
    } finally {
      loading.value = false
    }
  }

  const register = async (payload: RegisterPayload) => {
    try {
      loading.value = true

      const response = await $fetch<AuthResponse>(`${BASE_API}/auth/register`, {
        method: 'POST',
        body: payload
      })

      token.value = response.token
      user.value = response.user

      await navigateTo('/learning-map')
    } catch (error) {
      console.error('Registrasi error: ', error)
      toast.add({
        title: 'Error',
        description: error instanceof Error ? error.message : String(error),
        color: 'error'
      })
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      loading.value = true

      await $fetch(`${BASE_API}/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` }
      })
    } catch (error) {
      console.warn('Logout error: ', error)
    } finally {
      token.value = null
      user.value = null

      loading.value = false
      navigateTo('/login')
    }
  }

  return {
    token,
    user,
    loading,
    googleLoginUrl,
    setToken,
    fetchUser,
    loginWithGoogle,
    login,
    register,
    logout
  }
})
