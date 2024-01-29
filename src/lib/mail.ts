import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const confirmLink = `http://localhost:3000/email-verification?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verification email',
    html: `<h1>Hi ${name}</h1><p>Please click the link below to verify your email:</p><a href="${confirmLink}">Confirm</a>`
  })
}
