import { auth } from '@/auth'
import { db } from '@/lib/db'
import { ListContainer } from '@/components/kanban/list-container'

interface BoardIdPageProps {
  params: {
    boardId: string
  }
}

const SingleBoardPage = async ({ params }: BoardIdPageProps) => {
  const session = await auth()

  const lists = await db.kanbanList.findMany({
    where: { boardId: params.boardId, board: { userId: session?.user.id } },
    include: { kanbanListItem: { orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' }
  })
  return (
    <div className='pt-10 h-full overflow-x-auto'>
      <ListContainer boardId={params.boardId} data={lists} />
    </div>
  )
}

export default SingleBoardPage
