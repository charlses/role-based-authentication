'use server'

import * as z from 'zod'
import { ForgotPasswordSchema } from '@/schemas'
import { getUserByEmail } from '../database/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'

export const resetPassword = async (
  values: z.infer<typeof ForgotPasswordSchema>
) => {
  const validatedFields = ForgotPasswordSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid email address!' }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'No such email found!' }
  }

  //Todo: Generate a token for reseting a password and send the email!
  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(
    existingUser.name || '',
    passwordResetToken.email,
    passwordResetToken.token
  )

  return { success: 'Reset email has been sent successfully!' }
}
