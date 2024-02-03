'use server'
import * as z from 'zod'
import { NewPasswordSchema } from '@/schemas'
import { getPasswordResetTokenByToken } from '../../database/password-reset-token'
import { getUserByEmail } from '../../database/user'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

export const setNewPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: 'Missing token' }
  }

  const validatedFields = NewPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid password' }
  }

  const { password, confirmPassword } = validatedFields.data

  if (password !== confirmPassword) {
    return { error: 'Passwords did not match!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'No such token exists!' }
  }

  const tokenHasExpired = new Date(existingToken.expires) < new Date()

  if (tokenHasExpired) {
    return { error: 'The token has expired' }
  }

  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) {
    return { error: 'No such user exists!' }
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword }
  })

  await db.resetPasswordToken.delete({ where: { id: existingToken.id } })

  return { success: 'Password reset successfully!' }
}
