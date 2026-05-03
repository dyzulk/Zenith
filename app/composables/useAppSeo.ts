import { DEFAULT_SEO } from '~/shared/utils/constants/seo'

export const useAppSeo = () => {
  const { data: seoSettings } = useFetch<typeof DEFAULT_SEO>('/api/seo', {
    key: 'app-seo-settings',
    default: () => ({
      site_title: DEFAULT_SEO.SITE_TITLE,
      site_description: DEFAULT_SEO.SITE_DESCRIPTION,
      site_keywords: DEFAULT_SEO.SITE_KEYWORDS,
      og_title: DEFAULT_SEO.OG_TITLE,
      og_description: DEFAULT_SEO.OG_DESCRIPTION,
      og_image: DEFAULT_SEO.OG_IMAGE,
      google_site_verification: DEFAULT_SEO.GOOGLE_SITE_VERIFICATION,
      bing_site_verification: DEFAULT_SEO.BING_SITE_VERIFICATION
    })
  })

  // Set standard meta
  useSeoMeta({
    title: () => seoSettings.value?.site_title ?? DEFAULT_SEO.SITE_TITLE,
    titleTemplate: (titleChunk) => {
      const siteTitle = seoSettings.value?.site_title ?? DEFAULT_SEO.SITE_TITLE;
      return titleChunk && titleChunk !== siteTitle 
        ? `${titleChunk} - ${siteTitle}`
        : siteTitle;
    },
    description: () => seoSettings.value?.site_description ?? DEFAULT_SEO.SITE_DESCRIPTION,
    ogTitle: () => seoSettings.value?.og_title || seoSettings.value?.site_title || DEFAULT_SEO.OG_TITLE,
    ogDescription: () => seoSettings.value?.og_description || seoSettings.value?.site_description || DEFAULT_SEO.OG_DESCRIPTION,
    ogImage: () => seoSettings.value?.og_image ?? DEFAULT_SEO.OG_IMAGE,
  })

  // Set keywords and verifications using useHead
  useHead({
    meta: [
      { name: 'keywords', content: () => seoSettings.value?.site_keywords ?? DEFAULT_SEO.SITE_KEYWORDS },
      { name: 'google-site-verification', content: () => seoSettings.value?.google_site_verification ?? DEFAULT_SEO.GOOGLE_SITE_VERIFICATION },
      { name: 'msvalidate.01', content: () => seoSettings.value?.bing_site_verification ?? DEFAULT_SEO.BING_SITE_VERIFICATION }
    ].filter(m => m.content()) // filter empty tags if needed, though getters make this tricky. Nuxt useHead handles empty gracefully.
  })

  return { seoSettings }
}
