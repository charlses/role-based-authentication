'use server'

import * as z from 'zod'
import { RegisterSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const signUp = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Something went wrong try again later!' }
  }

  const { name, lastname, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await db.user.findUnique({
    where: {
      email
    }
  })
  if (existingUser) {
    return { error: 'An account with this email exists!' }
  }

  await db.user.create({
    data: {
      name,
      lastname,
      email,
      password: hashedPassword
    }
  })

  const verificationToken = await generateVerificationToken(email)

  // TODO: Send verification token email
  await sendVerificationEmail(
    name,
    verificationToken.email,
    verificationToken.token
  )
  return { success: 'Please verify your email before logging in!' }
}
