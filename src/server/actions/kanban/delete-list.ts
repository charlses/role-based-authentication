'use server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const DeleteListAction = async (id: string, boardId: string) => {
  try {
    await db.kanbanList.delete({
      where: { id, boardId }
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
}
