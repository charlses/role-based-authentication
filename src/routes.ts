export const publicRoutes = [
  '/',
  '/about',
  '/our-services',
  '/contact-us',
  '/email-verification'
]

export const authRoutes = [
  '/sign-in',
  '/sign-up',
  '/auth-error',
  '/forgot-password',
  '/new-password'
]

export const userRoutes = [
  '/dashboard',
  '/settings',
  '/boards',
  '/boards/:id',
  '/settings',
  '/projects',
  '/projects/:id'
]

export const adminRoutes = [
  '/admin/dashboard',
  '/admin/settings/',
  '/admin/users',
  '/admin/products',
  '/admin/products/create'
]

export const apiAuthPrefix = '/api'

export const DEFAULT_LOGIN_REDIRECT = '/dashboard'
export const DEFAULT_ADMIN_REDIRECT = '/admin/dashboard'
