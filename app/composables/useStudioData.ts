export const useStudioData = () => {
  const genres = useState<any[]>('studio-genres', () => [])
  const isLoadingGenres = ref(false)

  const fetchGenres = async () => {
    if (genres.value.length > 0) return
    isLoadingGenres.value = true
    try {
      const data: any = await $fetch('/api/studio/genres')
      genres.value = data.genres || []
    } catch (e) {
      console.error('Gagal mengambil genre:', e)
    } finally {
      isLoadingGenres.value = false
    }
  }

  const animeStatusOptions = useState<any[]>('studio-status-options', () => [])
  const animeTypeOptions = useState<any[]>('studio-type-options', () => [])
  const animeSeasonOptions = useState<any[]>('studio-season-options', () => [])
  const isLoadingOptions = ref(false)

  const fetchOptions = async () => {
    if (animeStatusOptions.value.length > 0) return
    isLoadingOptions.value = true
    try {
      const data: any = await $fetch('/api/data/options')
      animeStatusOptions.value = data.statuses || []
      animeTypeOptions.value = data.types || []
      animeSeasonOptions.value = data.seasons || []
    } catch (e) {
      console.error('Gagal mengambil options:', e)
    } finally {
      isLoadingOptions.value = false
    }
  }

  return {
    genres,
    isLoadingGenres,
    fetchGenres,
    animeStatusOptions,
    animeTypeOptions,
    animeSeasonOptions,
    fetchOptions,
    isLoadingOptions
  }
}
