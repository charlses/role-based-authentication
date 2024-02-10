'use server'

import * as z from 'zod'
import { KanbanListItemSchema } from '@/schemas'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const createCard = async (
  values: z.infer<typeof KanbanListItemSchema>
) => {
  const validatedFields = KanbanListItemSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Something went wrong try again later!' }
  }

  const { title, listId } = validatedFields.data

  try {
    const list = await db.kanbanList.findUnique({
      where: {
        id: listId
      }
    })
    if (!list) {
      return { error: 'List not found!' }
    }

    const lastListItem = await db.kanbanListItem.findFirst({
      where: { listId: listId },
      orderBy: { order: 'desc' },
      select: { order: true }
    })
    const newOrder = lastListItem ? lastListItem.order + 1 : 1

    const newKanbanListItem = await db.kanbanListItem.create({
      data: {
        title,
        listId,
        order: newOrder
      }
    })
    revalidatePath(`/boards/${list.boardId}`)
  } catch (error) {
    return {
      error: 'Failed to create new card!'
    }
  }
  return { success: 'New card created successfully!' }
}
