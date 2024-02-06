'use client'

import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Popover } from '../ui/popover'
import { Button } from '../ui/button'
import { DotsVerticalIcon, TrashIcon } from '@radix-ui/react-icons'
import { deleteBoard } from '@/server/actions/kanban/delete-board'

interface BoardOptionProps {
  id: string
}

export const BoardOptions = ({ id }: BoardOptionProps) => {
  const deleteBoardWithId = () => {
    deleteBoard(id)
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' size='sm' className='h-auto w-autp p-2'>
          <DotsVerticalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-background flex flex-col justify-center p-3 border rounded-md h-[full] mr-2 space-y-2'>
        <div>
          <h3 className='text-md font-normal text-accent-foreground'>
            Board actions
          </h3>
          <hr />
        </div>
        <div className='inline-flex'>
          <p className='text-sm font-light mr-2'>Delete this board</p>
          <Button
            variant='ghost'
            size='sm'
            className='h-auto ml-2 hover:bg-destructive'
            onClick={deleteBoardWithId}
          >
            <TrashIcon className='' />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
