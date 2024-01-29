// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  /**
   * Extend the built-in user type, for example by adding custom properties
   */
  interface User extends DefaultUser {
    role?: string
    token?: string
  }

  /**
   * Extend the built-in session type
   */
  interface Session {
    user?: User & DefaultSession['user']
    token?: User & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the built-in JWT type
   */
  interface JWT {
    role?: string
    token?: string
  }
}
