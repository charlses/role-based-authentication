'use server'

import * as z from 'zod'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { UpdateBoardSchema } from '@/schemas'
import { auth } from '@/auth'

export const updateBoard = async (
  values: z.infer<typeof UpdateBoardSchema>
) => {
  const session = await auth()
  if (session) {
    const validatedFields = UpdateBoardSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: 'Failed to validate fields!' }
    }

    const { id, title, userId } = validatedFields.data
    if (userId !== session.user.id) {
      return { error: 'This is not your board to update!' }
    }

    try {
      const updatedBoard = await db.kanbanBoard.update({
        where: { id, userId },
        data: {
          title
        }
      })
    } catch (error) {
      return {
        error: 'Something went wrong try again later'
      }
    }
    revalidatePath('/boards')

    return { success: 'Board updated successfully!' }
  } else {
    return { error: 'You need to be authenticated to do this action!' }
  }
}
