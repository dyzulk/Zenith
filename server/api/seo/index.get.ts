import { DEFAULT_SEO } from '~/shared/utils/constants/seo'

export default defineEventHandler(async (event) => {
  const [
    site_title,
    site_description,
    site_keywords,
    og_title,
    og_description,
    og_image,
    google_site_verification,
    bing_site_verification
  ] = await Promise.all([
    getSiteSetting(event, 'site_title', DEFAULT_SEO.SITE_TITLE),
    getSiteSetting(event, 'site_description', DEFAULT_SEO.SITE_DESCRIPTION),
    getSiteSetting(event, 'site_keywords', DEFAULT_SEO.SITE_KEYWORDS),
    getSiteSetting(event, 'og_title', DEFAULT_SEO.OG_TITLE),
    getSiteSetting(event, 'og_description', DEFAULT_SEO.OG_DESCRIPTION),
    getSiteSetting(event, 'og_image', DEFAULT_SEO.OG_IMAGE),
    getSiteSetting(event, 'google_site_verification', DEFAULT_SEO.GOOGLE_SITE_VERIFICATION),
    getSiteSetting(event, 'bing_site_verification', DEFAULT_SEO.BING_SITE_VERIFICATION)
  ])

  return {
    site_title,
    site_description,
    site_keywords,
    og_title,
    og_description,
    og_image,
    google_site_verification,
    bing_site_verification
  }
})
