export const useBrowseData = () => {
  const genres = useState<any[]>('browse-genres', () => [])
  const statuses = useState<any[]>('browse-statuses', () => [])
  const types = useState<any[]>('browse-types', () => [])
  const seasons = useState<any[]>('browse-seasons', () => [])
  const isLoading = ref(false)

  const fetchOptions = async () => {
    if (genres.value.length > 0) return
    isLoading.value = true
    try {
      const data: any = await $fetch('/api/data/options')
      genres.value = data.genres || []
      statuses.value = data.statuses || []
      types.value = data.types || []
      seasons.value = data.seasons || []
    } catch (e) {
      console.error('Gagal mengambil opsi filter:', e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    genres,
    statuses,
    types,
    seasons,
    isLoading,
    fetchOptions
  }
}
