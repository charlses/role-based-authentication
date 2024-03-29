import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required!' }),
  password: z.string().min(1, { message: 'Password is required!' }),
  code: z.optional(z.string())
})

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  lastname: z.string().min(1, { message: 'Surname is required!' }),
  email: z.string().email({ message: 'Enter a valid email!' }),
  password: z.string().min(6, { message: 'Password is required!' })
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email!' })
})

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must include at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: "Passwords don't match!" })
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: "The passwords don't  match",
        path: ['confirmPassword']
      })
    }
  })

export const BoardSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'The title should be at least 3 characters!' }),
  userId: z.string().min(1, { message: 'No user id provided!' })
})

export const UpdateBoardSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'The title should include at least 3 characters' }),
  id: z.string().min(1, { message: 'No id!' }),
  userId: z.string().min(1, { message: 'No user id is provided!' })
})

export const KanbanListSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'The title should be at least 3 characters!' }),
  boardId: z.string().min(1, { message: 'No board id found!' })
})

export const UpdateListSchema = z.object({
  title: z.string().min(3, { message: 'Minimum 3 characters!' }),
  id: z.string().min(1, { message: 'No id!' }),
  boardId: z.string().min(1, { message: 'No board id found!' })
})

export const CopyListSchema = z.object({
  id: z.string(),
  boardId: z.string()
})

export const KanbanListItemSchema = z.object({
  title: z.string().min(1, { message: 'Minimum 1 character!' }),
  listId: z.string().min(1, { message: 'No list found!' })
})

export const UpdateListOrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date()
    })
  ),
  boardId: z.string()
})

export const UpdateCardOrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      listId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date()
    })
  ),
  boardId: z.string()
})
