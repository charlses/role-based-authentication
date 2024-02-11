import { auth } from '@/auth'
import { findBoards } from '@/server/actions/kanban/boards-findmany'
import { Boards } from '@/components/kanban/board-list'
import { BoardForm } from '@/components/kanban/new-board-form'
import { CrumpledPaperIcon } from '@radix-ui/react-icons'

const KanbanPage = async () => {
  const session = await auth()

  const userId = session?.user.id as string
  const boards = await findBoards(userId)
  return (
    <div className='space-y-4 px-4'>
      <section className='display flex justify-between items-center'>
        <h2>
          <CrumpledPaperIcon className='inline' /> Your boards
        </h2>
        <BoardForm userId={userId} />
      </section>
      <section className='flex flex-wrap gap-8'>
        {boards.map((board) => (
          <Boards
            key={board.id}
            title={board.title}
            id={board.id}
            userId={board.userId}
            createdAt={board.createdAt}
          />
        ))}
      </section>
    </div>
  )
}

export default KanbanPage
