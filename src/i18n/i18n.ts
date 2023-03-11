import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import COMMON_EN from 'src/locales/en/common.json'
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import PROFILE_EN from 'src/locales/en/profile.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'
import COMMON_VI from 'src/locales/vi/common.json'
import PROFILE_VI from 'src/locales/vi/profile.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    common: COMMON_EN,
    home: HOME_EN,
    product: PRODUCT_EN,
    profile: PROFILE_EN
  },
  vi: {
    common: COMMON_VI,
    home: HOME_VI,
    product: PRODUCT_VI,
    profile: PROFILE_VI
  }
} as const

export const defaultNS = 'common' as const

use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'home', 'product'],
  defaultNS: defaultNS,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
