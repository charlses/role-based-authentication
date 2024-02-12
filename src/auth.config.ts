import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { LoginSchema } from './schemas'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from './server/database/user'

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials)

        if (validateFields.success) {
          const { email, password } = validateFields.data

          const user = await getUserByEmail(email)
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return { ...user, password: '', role: user.role }
        }
        return null
      }
    })
  ]
} satisfies NextAuthConfig
