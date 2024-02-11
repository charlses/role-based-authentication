'use client'
import { KanbanList } from '@prisma/client'
import { UpdateListAction } from '@/server/actions/kanban/update-list'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { UpdateListSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { ListOptions } from './list-options'
import { toast } from 'sonner'

type ListHeader = {
  data: KanbanList
  onAddCard: () => void
}

export const ListHeader = ({ data, onAddCard }: ListHeader) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof UpdateListSchema>>({
    resolver: zodResolver(UpdateListSchema),
    defaultValues: {
      id: data.id,
      title: data.title,
      boardId: data.boardId
    }
  })

  const onSubmit = (values: z.infer<typeof UpdateListSchema>) => {
    startTransition(() => {
      UpdateListAction(values).then((data) => {
        if (data.error) {
          toast.error(data.error)
          setIsEditing(false)
        }
        if (data.success) {
          toast.success(data.success)
          form.reset()
          setIsEditing(false)
        }
      })
    })
  }

  if (isEditing) {
    return (
      <div className='flex justify-between items-center shrink-0'>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form {...form}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='New Board'
                      type='text'
                      {...field}
                      disabled={isPending}
                      className='active:bg-blend-lighten'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </form>
      </div>
    )
  }

  return (
    <div className='flex justify-between items-center shrink-0'>
      <Button
        variant='ghost'
        disabled={isPending}
        onClick={() => {
          setIsEditing(true)
        }}>
        {data.title}
      </Button>
      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  )
}
