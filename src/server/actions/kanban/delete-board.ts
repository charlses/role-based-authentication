'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const deleteBoard = async (id: string) => {
  await db.kanbanBoard.delete({
    where: { id }
  })
  revalidatePath('/boards')
  redirect('/boards')
}
