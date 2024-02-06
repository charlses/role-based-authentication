'use server'
import { db } from '@/lib/db'

export const findBoards = async (userId: string) => {
  const boards = await db.kanbanBoard.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return boards
}
