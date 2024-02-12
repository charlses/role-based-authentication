'use server'

import * as z from 'zod'
import { UpdateCardOrderSchema } from '@/schemas'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'

export const updateCardOrder = async (
  values: z.infer<typeof UpdateCardOrderSchema>
) => {
  const session = await auth()
  if (session) {
    const validatedFields = UpdateCardOrderSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: 'Something went wrong try again later!' }
    }

    const { items, boardId } = validatedFields.data
    let updatedCards

    try {
      const transaction = items.map((card) =>
        db.kanbanListItem.update({
          where: {
            id: card.id,
            list: { board: { id: boardId, userId: session.user.id } }
          },
          data: { order: card.order, listId: card.listId }
        })
      )

      updatedCards = await db.$transaction(transaction)
    } catch (error) {
      return {
        error: 'Failed to reorder cards'
      }
    }
    revalidatePath(`/boards/${boardId}`)
    return {
      data: updatedCards,
      success: 'Kanban cards reordered successfully'
    }
  } else {
    return { error: 'You need to be authenticated to do this action!' }
  }
}
