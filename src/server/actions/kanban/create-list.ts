'use server'

import * as z from 'zod'
import { KanbanListSchema } from '@/schemas'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'

export const createKanbanList = async (
  values: z.infer<typeof KanbanListSchema>
) => {
  const session = await auth()
  if (session) {
    const validatedFields = KanbanListSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: 'Something went wrong try again later!' }
    }

    const { title, boardId } = validatedFields.data

    try {
      const board = await db.kanbanBoard.findUnique({
        where: {
          id: boardId
        }
      })
      if (!board) {
        return { error: 'Board not found!' }
      } else if (board.userId != session.user.id) {
        return { error: 'This board is not yours!' }
      }

      const lastList = await db.kanbanList.findFirst({
        where: {
          boardId: boardId,
          board: {
            userId: session.user.id
          }
        },
        orderBy: { order: 'desc' },
        select: { order: true }
      })
      const newOrder = lastList ? lastList.order + 1 : 1

      const newKanbanList = await db.kanbanList.create({
        data: {
          title,
          boardId,
          order: newOrder
        }
      })
    } catch (error) {
      return {
        error: 'Failed to create a list'
      }
    }
    revalidatePath(`/boards/${boardId}`)
    return { success: 'Kanban list added successfully' }
  } else {
    return { error: 'No user found!' }
  }
}
