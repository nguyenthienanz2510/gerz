import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_DETAILS_EN from 'src/locales/en/productDetail.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_DETAILS_VI from 'src/locales/vi/productDetail.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    home: HOME_EN,
    product_detail: PRODUCT_DETAILS_EN
  },
  vi: {
    home: HOME_VI,
    product_detail: PRODUCT_DETAILS_VI
  }
} as const

export const defaultNS = 'home' as const

use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: ['home', 'product_detail'],
  defaultNS: defaultNS,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
