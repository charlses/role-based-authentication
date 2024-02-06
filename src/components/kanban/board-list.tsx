import { Button } from '@/components/ui/button'
import { deleteBoard } from '@/server/actions/kanban/delete-board'
import Link from 'next/link'

interface BoardProps {
  title: string
  id: string
  userId: string
  createdAt: Date
}

export const Boards = ({ title, id, userId }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id)
  return (
    <Link href={`/boards/${id}`} className=''>
      <Button variant='outline' size='lg'>
        {title}
      </Button>
    </Link>
  )
}
