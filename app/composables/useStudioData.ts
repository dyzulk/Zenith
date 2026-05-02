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

  // Menggunakan ref agar tetap reaktif dan konsisten dengan ekspektasi Nuxt UI v4
  const animeStatusOptions = ref([
    { label: 'Ongoing', value: 'ongoing', color: 'primary' },
    { label: 'Completed', value: 'completed', color: 'success' },
    { label: 'Upcoming', value: 'upcoming', color: 'info' },
    { label: 'Hiatus', value: 'hiatus', color: 'warning' }
  ])

  const animeTypeOptions = ref([
    { label: 'TV Series', value: 'TV' },
    { label: 'Movie', value: 'Movie' },
    { label: 'OVA', value: 'OVA' },
    { label: 'ONA', value: 'ONA' },
    { label: 'Special', value: 'Special' }
  ])

  const animeSeasonOptions = ref([
    { label: 'Winter', value: 'winter' },
    { label: 'Spring', value: 'spring' },
    { label: 'Summer', value: 'summer' },
    { label: 'Fall', value: 'fall' }
  ])

  return {
    genres,
    isLoadingGenres,
    fetchGenres,
    animeStatusOptions,
    animeTypeOptions,
    animeSeasonOptions
  }
}
