'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export const deleteBoard = async (id: string) => {
  const session = await auth()
  if (session) {
    try {
      await db.kanbanBoard.delete({
        where: { id, userId: session.user.id }
      })
    } catch (error) {
      return {
        error: 'Error deleting board!'
      }
    }
    revalidatePath('/boards')
    redirect('/boards')
  } else {
    return { error: 'You need to be authenticated to do this action!' }
  }
}
