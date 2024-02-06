'use client'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { ListWrapper } from './list-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { KanbanListSchema } from '@/schemas'
import { useToast } from '../ui/use-toast'
import { createKanbanList } from '@/server/actions/kanban/create-list'
import {
  CheckCircledIcon,
  Cross1Icon,
  ExclamationTriangleIcon,
  PlusIcon
} from '@radix-ui/react-icons'
import { useState } from 'react'

interface ListFormProps {
  boardId: string
}

export const ListForm = ({ boardId }: ListFormProps) => {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<z.infer<typeof KanbanListSchema>>({
    resolver: zodResolver(KanbanListSchema),
    defaultValues: {
      title: '',
      boardId: boardId
    }
  })
  const onSubmit = (values: z.infer<typeof KanbanListSchema>) => {
    createKanbanList(values).then((data) => {
      if (data.error) {
        toast({
          title: <ExclamationTriangleIcon />,
          variant: 'destructive',
          description: data.error
        })
        stopEditing()
      } else {
        toast({
          title: <CheckCircledIcon />,
          description: data.success
        })
        stopEditing()
      }
    })
  }
  const startEditing = () => {
    setIsEditing(true)
  }
  const stopEditing = () => {
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Form {...form}>
        <form
          className='space-y-4 w-[250px] rounded-md bg-accent p-1 text-small font-light'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Add list title...'
                    type='text'
                    {...field}
                    disabled={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' variant='outline'>
            <PlusIcon className='mr-2' /> Create List
          </Button>
          <Button variant='ghost'>
            <Cross1Icon onClick={stopEditing} />
          </Button>
        </form>
      </Form>
    )
  }

  return (
    <ListWrapper>
      <Button
        className='h-auto w-[240px] text-left p-2'
        variant='outline'
        onClick={startEditing}
      >
        <PlusIcon className='mr-auto h-5 w-5' />
        Create a list
      </Button>
    </ListWrapper>
  )
}
