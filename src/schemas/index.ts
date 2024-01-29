import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required!' }),
  password: z.string().min(1, { message: 'Password is required!' })
})

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  lastname: z.string().min(1, { message: 'Surname is required!' }),
  email: z.string().email({ message: 'Enter a valid email!' }),
  password: z.string().min(6, { message: 'Password is required!' })
})
