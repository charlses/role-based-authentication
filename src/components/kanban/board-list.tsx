import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getUserById } from '@/server/database/user'
import { BoardOptions } from './board-options'

interface BoardProps {
  title: string
  id: string
  userId: string
  createdAt: Date
}

export const Boards = async ({ title, id, userId, createdAt }: BoardProps) => {
  const user = await getUserById(userId)

  return (
    <Card className='max-w-xs'>
      <CardHeader className='flex-col pt-3'>
        <div className='flex items-center justify-between text-sm'>
          <ActivityIcon className='w-4 h-4' />
          <BoardOptions id={id} />
        </div>
        <CardTitle className='text-base'>{title}</CardTitle>
        <CardDescription className='text-xs'>
          Created by: {user?.name}
        </CardDescription>
      </CardHeader>
      <CardContent className='border-t pt-4'>
        <Link href={`/boards/${id}`}>
          <Button size='sm' variant='outline'>
            View Board
          </Button>
        </Link>
      </CardContent>
      <CardFooter className='text-xs items-start space-y-1'>
        <div className='flex items-center space-x-2'>
          <ActivityIcon className='w-4 h-4' />
          <span className='font-medium'>Crated at:</span>
          <span> {new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
    </svg>
  )
}
