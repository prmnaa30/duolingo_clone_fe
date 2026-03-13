import { useApi } from '~/composables/useApi'

interface CurriculumResponse {
  id: number
  name: string
  description: string
  order_sequence: number
  units: {
    id: number
    name: string
    order_sequence: number
    status: string
    stars: number
  }[]
}

export const useCurriculumStore = defineStore('curriculum', () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const toast = useToast()
  const $api = useApi()

  // * States * //
  const chapters = ref<CurriculumResponse[]>([])
  const loading = ref(false)

  // * Methods * //
  const fetchChapters = async (forceRefresh: boolean = false) => {
    if (!forceRefresh && chapters.value.length > 0) return

    loading.value = true
    try {
      const response = await $api<{ data: CurriculumResponse[] }>(`${config.public.baseApi}/chapters`, {
        headers: { Authorization: `Bearer ${authStore.token}` },
        onResponseError({ response }) {
          throw new Error(response._data.message || 'Gagal mengambil data')
        }
      })

      chapters.value = response.data
    } catch (error) {
      console.error('Gagal mengambil data chapters: ', error)
      toast.add({
        title: 'Error',
        description: error instanceof Error ? error.message : String(error),
        color: 'error'
      })
    } finally {
      loading.value = false
    }
  }

  return {
    chapters,
    loading,
    fetchChapters
  }
})
