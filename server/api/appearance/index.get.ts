import { DEFAULT_APPEARANCE } from '../../../shared/utils/constants/appearance'

export default defineEventHandler(async (event) => {
  const [
    site_logo_light,
    site_logo_dark,
    site_favicon,
    ui_primary,
    ui_neutral,
    ui_animations_str,
    ui_card_style
  ] = await Promise.all([
    getSiteSetting(event, 'site_logo_light', DEFAULT_APPEARANCE.SITE_LOGO_LIGHT),
    getSiteSetting(event, 'site_logo_dark', DEFAULT_APPEARANCE.SITE_LOGO_DARK),
    getSiteSetting(event, 'site_favicon', DEFAULT_APPEARANCE.SITE_FAVICON),
    getSiteSetting(event, 'ui_primary', DEFAULT_APPEARANCE.UI_PRIMARY),
    getSiteSetting(event, 'ui_neutral', DEFAULT_APPEARANCE.UI_NEUTRAL),
    getSiteSetting(event, 'ui_animations', String(DEFAULT_APPEARANCE.UI_ANIMATIONS)),
    getSiteSetting(event, 'ui_card_style', DEFAULT_APPEARANCE.UI_CARD_STYLE)
  ])

  return {
    site_logo_light,
    site_logo_dark,
    site_favicon,
    ui_primary,
    ui_neutral,
    ui_animations: ui_animations_str !== 'false',
    ui_card_style
  }
})
