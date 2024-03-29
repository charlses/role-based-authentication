'use client'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Popover } from '../ui/popover'
import { Button } from '../ui/button'
import {
  CopyIcon,
  DotsVerticalIcon,
  PlusIcon,
  TrashIcon
} from '@radix-ui/react-icons'
import { DeleteListAction } from '@/server/actions/kanban/delete-list'
import { KanbanList } from '@prisma/client'
import { toast } from 'sonner'
import { Separator } from '../ui/separator'
import { useState } from 'react'

interface ListOptions {
  data: KanbanList
  onAddCard: () => void
}

export const ListOptions = ({ data, onAddCard }: ListOptions) => {
  const [open, setOpen] = useState(false)
  const deleteListWithId = () => {
    DeleteListAction(data.id, data.boardId).then((data) => {
      if (data.error) {
        toast.error(data.error)
      }
      if (data.success) {
        toast.success(data.success)
        setOpen(false)
      }
    })
  }
  const handleAddCard = () => {
    onAddCard()
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className='items-end'>
        <Button variant='ghost' size='sm' className='h-auto w-autp p-2'>
          <DotsVerticalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-background flex flex-col justify-center p-3 border rounded-md h-[full] mr-2 space-y-2'>
        <p className='font-bold'>List Actions</p>
        <Separator />
        <Button
          variant='ghost'
          size='sm'
          className='rounded-none w-full h-auto p-2 px-5 justify-between font-normal text-sm'
          onClick={handleAddCard}>
          <PlusIcon />
          <p className='font-light'>Add a card...</p>
        </Button>
        <Separator />
        <Button
          variant='ghost'
          size='sm'
          className='rounded-none w-full h-auto p-2 px-5 justify-between font-normal text-sm'
          onClick={deleteListWithId}>
          <TrashIcon className='mr-4' />
          <p className='font-light'>Delete this list</p>
        </Button>
      </PopoverContent>
    </Popover>
  )
}
