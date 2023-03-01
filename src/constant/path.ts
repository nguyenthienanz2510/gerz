const path = {
  home: '/',
  login: '/login',
  register: '/register',
  profile: '/profile',
  logout: '/logout',
  cart: '/cart',
  productDetail: '/:productSlug'
} as const

export default path
