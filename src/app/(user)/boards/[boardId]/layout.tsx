import { auth } from '@/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { BoardNavBar } from '@/components/kanban/board-nav'

const SingleBoardLayout = async ({
  children,
  params
}: {
  children: React.ReactNode
  params: { boardId: string }
}) => {
  const session = await auth()
  const userId = session?.user.id as string

  const board = await db.kanbanBoard.findUnique({
    where: { id: params.boardId, userId }
  })

  if (!board) {
    notFound()
  }

  return (
    <div className='pt-5'>
      <BoardNavBar data={board} />
      <section className='h-full pl-2'>{children}</section>
    </div>
  )
}

export default SingleBoardLayout
