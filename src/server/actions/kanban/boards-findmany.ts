'use server'
import { db } from '@/lib/db'
import { auth } from '@/auth'

export const findBoards = async (userId: string) => {
  const session = await auth()
  if (session && userId === session.user.id) {
    const boards = await db.kanbanBoard.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return boards
  }
}
