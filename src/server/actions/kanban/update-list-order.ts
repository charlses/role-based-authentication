'use server'

import * as z from 'zod'
import { UpdateListOrderSchema } from '@/schemas'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'

export const updateListOrder = async (
  values: z.infer<typeof UpdateListOrderSchema>
) => {
  const session = await auth()
  if (session) {
    const validatedFields = UpdateListOrderSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: 'Something went wrong try again later!' }
    }

    const { items, boardId } = validatedFields.data
    let lists

    try {
      const transtaction = items.map((list) =>
        db.kanbanList.update({
          where: {
            id: list.id,
            board: { id: boardId, userId: session.user.id }
          },
          data: { order: list.order }
        })
      )

      lists = await db.$transaction(transtaction)
    } catch (error) {
      return {
        error: 'Failed to reorder'
      }
    }
    revalidatePath(`/boards/${boardId}`)
    return { data: lists, success: 'Kanban list reordered successfully' }
  } else {
    return { error: 'You need to be authenticated to do this action!' }
  }
}
