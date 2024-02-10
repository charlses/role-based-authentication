'use server'
import * as z from 'zod'
import { UpdateListSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

export const UpdateListAction = async (
  values: z.infer<typeof UpdateListSchema>
) => {
  const validatedFields = UpdateListSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Something went wrong try again later!' }
  }

  const { title, id, boardId } = validatedFields.data

  try {
    const updatedList = await db.kanbanList.update({
      where: { id, boardId },
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
}
