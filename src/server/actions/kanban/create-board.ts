'use server'
import * as z from 'zod'
import { BoardSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

export const createBoard = async (values: z.infer<typeof BoardSchema>) => {
  const validatedFields = BoardSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Something went wrong try again later!' }
  }

  const { title, userId } = validatedFields.data

  try {
    const newBoard = await db.kanbanBoard.create({
      data: {
        title,
        userId
      }
    })
  } catch (error) {
    return {
      error: 'Something went wrong try again later'
    }
  }
  revalidatePath('/boards')

  return { success: 'Board added successfully' }
}
