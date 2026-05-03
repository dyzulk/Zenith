export const useAppSeo = async () => {
  const { data: seoSettings } = await useFetch('/api/seo', {
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
    title: seoSettings.value.site_title,
    titleTemplate: (titleChunk) => {
      return titleChunk && titleChunk !== seoSettings.value.site_title 
        ? `${titleChunk} - ${seoSettings.value.site_title}`
        : seoSettings.value.site_title;
    },
    description: seoSettings.value.site_description,
    ogTitle: seoSettings.value.og_title || seoSettings.value.site_title,
    ogDescription: seoSettings.value.og_description || seoSettings.value.site_description,
    ogImage: seoSettings.value.og_image,
  })

  // Set keywords and verifications using useHead
  const meta: any[] = []
  
  if (seoSettings.value.site_keywords) {
    meta.push({ name: 'keywords', content: seoSettings.value.site_keywords })
  }
  
  if (seoSettings.value.google_site_verification) {
    meta.push({ name: 'google-site-verification', content: seoSettings.value.google_site_verification })
  }
  
  if (seoSettings.value.bing_site_verification) {
    meta.push({ name: 'msvalidate.01', content: seoSettings.value.bing_site_verification })
  }

  if (meta.length > 0) {
    useHead({
      meta
    })
  }

  return { seoSettings }
}
