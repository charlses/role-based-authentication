import NextAuth, { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  role: 'ADMIN' | 'USER'
  token: string
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
    token: ExtendedUser
  }
}
