/**
 * Generates a URL-friendly slug from a string.
 * @param text The input string
 * @returns The slugified string
 */
export const strSlug = (text: string): string => {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

/**
 * Limits a string to a certain number of characters and appends a suffix if truncated.
 * @param text The input string
 * @param length Maximum length (default 100)
 * @param suffix Suffix to append if truncated (default '...')
 * @returns The truncated string
 */
export const strLimit = (text: string, length = 100, suffix = '...'): string => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length).trim() + suffix
}

/**
 * Returns a human-readable relative time string (e.g. "2 hours ago").
 * @param date Input date (string or Date object)
 * @returns Relative time string
 */
export const timeAgo = (date: string | Date | null | undefined): string => {
  if (!date) return '-'
  
  const target = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Baru saja'
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} jam yang lalu`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) return `${diffInDays} hari yang lalu`
  
  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) return `${diffInMonths} bulan yang lalu`
  
  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} tahun yang lalu`
}
