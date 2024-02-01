'use server'

import * as z from 'zod'
import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/tokens'
import { getUserByEmail } from '@/server/database/user'
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail'
import { getTwoFactorTokenByEmail } from '../database/two-factor-token'
import { db } from '@/lib/db'
import { getTwoFactorConfirmationByUserId } from '../database/two-factor-confirmation'

export const signInAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields!', comesfrom: 'fields' }
  }
  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Ivalid credentials', comesfrom: 'credentials' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )
    await sendVerificationEmail(
      existingUser.name ?? '',
      verificationToken.email,
      verificationToken.token
    )

    return {
      success: 'Confirmation email sent, please confirm your email to Sign In!'
    }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      //Todo: verify code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
      if (!twoFactorToken) {
        return { error: 'Invalid code!', comesfrom: '2fa' }
      }
      if (twoFactorToken.token !== code) {
        return { error: 'Invalid code!', comesfrom: '2fa' }
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      if (hasExpired) {
        return { error: 'Code has expired', comesfrom: '2fa' }
      }
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      )

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id }
        })
      }
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(
        existingUser.name ?? '',
        twoFactorToken.email,
        twoFactorToken.token
      )
      return { twoFactor: true }
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
    return { success: 'Signed in successfully!' }
  } catch (error) {
    if (error instanceof AuthError)
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    throw error
  }
}
