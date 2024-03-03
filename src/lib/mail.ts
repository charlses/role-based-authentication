import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = 'https://charlses.com'

export const sendVerificationEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const confirmLink = `${domain}/email-verification?token=${token}`

  await resend.emails.send({
    from: 'no_reply@techphoenix.dev',
    to: email,
    subject: 'Verification email',
    html: `<h1>Hi ${name}</h1><p>Please click the link below to verify your email:</p><a href="${confirmLink}">Confirm</a>`
  })
}

export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const resetLink = `${domain}/new-password?token=${token}`

  await resend.emails.send({
    from: 'no_reply@techphoenix.dev',
    to: email,
    subject: 'Password reset email',
    html: `<h1>Hi ${name}</h1><p>Please click the link below to reset your password:</p><a href="${resetLink}">Reset Password</a>`
  })
}

export const sendTwoFactorTokenEmail = async (
  name: string,
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: 'no_reply@techphoenix.dev',
    to: email,
    subject: 'Two factor authentication',
    html: `<h1>Hi ${name}</h1> <p>your 2FA code: ${token}</p>`
  })
}
