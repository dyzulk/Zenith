import { DEFAULT_APPEARANCE } from '../../shared/utils/constants/appearance'

export const useAppAppearance = () => {
  const appConfig = useAppConfig()
  
  const { data: appearanceSettings } = useFetch<typeof DEFAULT_APPEARANCE & {
    ui_animations: boolean;
  }>('/api/appearance', {
    key: 'app-appearance-settings',
    default: () => ({
      site_logo_light: DEFAULT_APPEARANCE.SITE_LOGO_LIGHT,
      site_logo_dark: DEFAULT_APPEARANCE.SITE_LOGO_DARK,
      site_favicon: DEFAULT_APPEARANCE.SITE_FAVICON,
      ui_primary: DEFAULT_APPEARANCE.UI_PRIMARY,
      ui_neutral: DEFAULT_APPEARANCE.UI_NEUTRAL,
      ui_animations: DEFAULT_APPEARANCE.UI_ANIMATIONS,
      ui_card_style: DEFAULT_APPEARANCE.UI_CARD_STYLE
    })
  })

  // Apply colors to Nuxt UI appConfig dynamically
  watchEffect(() => {
    if (appearanceSettings.value) {
      if (appearanceSettings.value.ui_primary) {
        appConfig.ui.colors.primary = appearanceSettings.value.ui_primary
      }
      if (appearanceSettings.value.ui_neutral) {
        appConfig.ui.colors.neutral = appearanceSettings.value.ui_neutral
      }
    }
  })

  // Set Favicon using useHead
  useHead({
    link: [
      {
        rel: 'icon',
        href: () => appearanceSettings.value?.site_favicon || '/favicon.ico'
      }
    ]
  })

  return { appearanceSettings }
}
