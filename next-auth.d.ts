import NextAuth, { type DefaultSession } from 'next-auth'

export type ExtendedUser = fefaultSession['user'] & {
  role: 'ADMIN' | 'USER'
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}
