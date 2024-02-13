import NextAuth from 'next-auth'
import authConfig from './auth.config'
import { auth as Auth } from './auth'

const { auth } = NextAuth(authConfig)

import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_ADMIN_REDIRECT,
  userRoutes,
  adminRoutes,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from './routes'

export default auth(async (req) => {
  const { nextUrl, auth } = req
  const isLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname)
  const isUserRoute = userRoutes.includes(nextUrl.pathname)

  const session = await Auth()
  const role = session?.user.role

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (role === 'ADMIN') {
        return Response.redirect(new URL(DEFAULT_ADMIN_REDIRECT, nextUrl))
      } else if (role === 'USER') {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }
    }
    return null
  }

  if (isAdminRoute) {
    if (isLoggedIn) {
      if (role !== 'ADMIN') {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }
      return null
    }
  }
  if (isUserRoute) {
    if (isLoggedIn) {
      if (role !== 'USER' && role === 'ADMIN') {
        return Response.redirect(new URL(DEFAULT_ADMIN_REDIRECT, nextUrl))
      }
      return null
    }
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/sign-in', nextUrl))
  }

  return null
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
