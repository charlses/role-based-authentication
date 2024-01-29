import { db } from '@/lib/db'

export const getVerificationTokenByToken = (token: string) => {
  try {
    const verificationToken = db.verificationToken.findUnique({
      where: { token }
    })
    return verificationToken
  } catch {
    return null
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email }
    })
    return verificationToken
  } catch {
    return null
  }
}
