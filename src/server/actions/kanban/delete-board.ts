'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const deleteBoard = async (id: string) => {
  try {
    await db.kanbanBoard.delete({
      where: { id }
    })
  } catch (error) {
    return {
      error: 'Error deleting board!'
    }
  }
  revalidatePath('/boards')
  redirect('/boards')
}
