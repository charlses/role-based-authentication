import { getVerificationTokenByEmail } from '@/server/database/verification-token'
import { v4 as uuidv4 } from 'uuid'
import { db } from '@/lib/db'
import { getPasswordResetTokenByEmail } from '@/server/database/password-reset-token'

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)
  if (existingToken) {
    await db.resetPasswordToken.delete({
      where: { id: existingToken.id }
    })
  }

  const resetToken = await db.resetPasswordToken.create({
    data: {
      email,
      token,
      expires
    }
  })
  return resetToken
}

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken
}
