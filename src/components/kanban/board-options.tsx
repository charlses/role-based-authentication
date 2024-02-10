'use client'

import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Popover } from '../ui/popover'
import { Button } from '../ui/button'
import { DotsVerticalIcon, TrashIcon } from '@radix-ui/react-icons'
import { deleteBoard } from '@/server/actions/kanban/delete-board'
import { toast } from 'sonner'
import { Separator } from '../ui/separator'

interface BoardOptionProps {
  id: string
}

export const BoardOptions = ({ id }: BoardOptionProps) => {
  const deleteBoardWithId = () => {
    deleteBoard(id).then((data?) => {
      if (data?.error) {
        toast.error(data.error)
      } else {
        toast.success('Board deleted successfully')
      }
    })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' size='sm' className='h-auto w-autp p-2'>
          <DotsVerticalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-background flex flex-col justify-center p-3 border rounded-md space-y-2'>
        <p className='font-bold'>Board actions</p>
        <Separator />

        <Button
          variant='ghost'
          size='sm'
          onClick={deleteBoardWithId}
          className='rounded-none w-full h-auto p-2 px-5 justify-between font-normal text-sm'>
          <p className='font-light '>Delete this board</p>
          <TrashIcon className='ml-3' />
        </Button>
      </PopoverContent>
    </Popover>
  )
}
