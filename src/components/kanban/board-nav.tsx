import { KanbanBoard } from '@prisma/client'
import { BoardTitleForm } from './board-title-form'
import { BoardOptions } from './board-options'

interface BoardNavProps {
  data: KanbanBoard
}

export const BoardNavBar = ({ data }: BoardNavProps) => {
  return (
    <div className='w-full md:w-[calc(100%-16rem)] h-16 z-[40] fixed top-16 flex items-center px-4 gap-x-4 bg-accent justify-between '>
      <BoardTitleForm data={data} />
      <BoardOptions id={data.id} />
    </div>
  )
}
