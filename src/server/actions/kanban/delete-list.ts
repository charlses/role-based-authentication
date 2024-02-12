'use server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'

export const DeleteListAction = async (id: string, boardId: string) => {
  const session = await auth()
  if (session) {
    try {
      await db.kanbanList.delete({
        where: {
          id,
          boardId,
          board: {
            userId: session.user.id
          }
        }
      })
      revalidatePath(`/boards/${boardId}`)
      return {
        success: 'List deleted successfully'
      }
    } catch (err) {
      return {
        error: 'Something went wrong try again later'
      }
    }
  } else {
    return { Error: 'No user found!' }
  }
}
