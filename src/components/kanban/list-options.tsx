'use client'

import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Popover } from '../ui/popover'
import { Button } from '../ui/button'
import {
  CheckCircledIcon,
  DotsVerticalIcon,
  ExclamationTriangleIcon,
  TrashIcon
} from '@radix-ui/react-icons'
import { DeleteListAction } from '@/server/actions/kanban/delete-list'
import { KanbanList } from '@prisma/client'
import { useToast } from '../ui/use-toast'

interface ListOptions {
  data: KanbanList
}

export const ListOptions = ({ data }: ListOptions) => {
  const { toast } = useToast()
  const deleteListWithId = () => {
    DeleteListAction(data.id, data.boardId).then((data) => {
      if (data.error) {
        toast({
          title: <ExclamationTriangleIcon />,
          variant: 'destructive',
          description: data.error
        })
      } else {
        toast({
          title: <CheckCircledIcon />,
          description: data.success
        })
      }
    })
  }
  return (
    <Popover>
      <PopoverTrigger asChild className='items-end'>
        <Button variant='ghost' size='sm' className='h-auto w-autp p-2'>
          <DotsVerticalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-background flex flex-col justify-center p-3 border rounded-md h-[full] mr-2 space-y-2'>
        <div>
          <h3 className='text-md font-normal text-accent-foreground'>
            List Actions
          </h3>
          <hr />
        </div>
        <div className='inline-flex'>
          <p className='text-sm font-light mr-2'>Delete This List</p>
          <Button
            variant='ghost'
            size='sm'
            className='h-auto ml-2 hover:bg-destructive'
            onClick={deleteListWithId}>
            <TrashIcon className='' />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
