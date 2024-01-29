import NextAuth, { Session } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { getUserById } from '@/server/database/user'
import { UserRole } from '@prisma/client'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/sign-in',
    error: '/auth-error'
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id ?? '')
    //   if (!existingUser) {
    //     return false
    //   }
    //   return true
    // },
    async session({ token, session }: { session: Session; token?: any }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})
