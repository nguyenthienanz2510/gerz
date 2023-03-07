const path = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  cart: '/cart',
  productDetail: '/:productSlug',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/change-password',
  historyPurchase: '/user/history-purchase'
} as const

export default path
