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

interface ListOptions {
  data: KanbanList
  onAddCard: () => void
}

export const ListOptions = ({ data, onAddCard }: ListOptions) => {
  const deleteListWithId = () => {
    DeleteListAction(data.id, data.boardId).then((data) => {
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success(data.success)
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
        <p className='font-bold'>List Actions</p>
        <Separator />
        <Button
          variant='ghost'
          size='sm'
          className='rounded-none w-full h-auto p-2 px-5 justify-between font-normal text-sm'>
          <PlusIcon />
          <p className='font-light'>Add a card...</p>
        </Button>
        //todo: will implement this functionality later on
        {/* <form>
          <input hidden name='id' id='id' value={data.id} />
          <input hidden name='boardId' id='boardId' value={data.boardId} />
          <Button
            variant='ghost'
            size='sm'
            type='submit'
            className='rounded-none w-full h-auto p-2 px-5 justify-between font-normal text-sm'>
            <CopyIcon />
            <p className='font-light'>Copy list..</p>
          </Button>
        </form> */}
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
