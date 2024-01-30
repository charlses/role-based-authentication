'use server'

import { LoginSchema } from '@/schemas'
import * as z from 'zod'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { generateVerificationToken } from '@/lib/tokens'
import { getUserByEmail } from '@/server/database/user'
import { sendVerificationEmail } from '@/lib/mail'

export const signInAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }
  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Ivalid credentials' }
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
