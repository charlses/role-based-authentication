'use server'
import * as z from 'zod'
import { UpdateListSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

import { auth } from '@/auth'

export const UpdateListAction = async (
  values: z.infer<typeof UpdateListSchema>
) => {
  const session = await auth()
  if (session) {
    const validatedFields = UpdateListSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: 'Something went wrong try again later!' }
    }

    const { title, id, boardId } = validatedFields.data

    try {
      const updatedList = await db.kanbanList.update({
        where: { id, boardId, board: { userId: session.user.id } },
        data: {
          title
        }
      })
    } catch (error) {
      return {
        error: 'Something went wrong try again later'
      }
    }
    revalidatePath(`/boards/${boardId}`)

    return { success: 'List updated successfully' }
  } else {
    return { error: 'You need to be authenticated to do this action' }
  }
}
