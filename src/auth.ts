import NextAuth, { Session } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { getUserById } from '@/server/database/user'
import { getTwoFactorConfirmationByUserId } from './server/database/two-factor-confirmation'

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
    async signIn({ user, account, profile }) {
      //allows users with Oauth providers to access the page
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id ?? '')

      //prevents signing in non existing users
      if (!existingUser) {
        return false
      }
      //prevents signing in without email verification
      if (!existingUser.emailVerified) return false

      //* Added two factor authentication

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        )

        if (!twoFactorConfirmation) return false

        //Delete two factor confirmation for next sign-in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        })
      }

      //Todo: in middleware and in here add Admin dashboard, protected from

      return true
    },

    async jwt({ token, user }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      if (existingUser) {
        token.role = existingUser.role
      }
      return { ...token, ...user }
    },
    async session({ token, session }: { session: Session; token?: any }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})
