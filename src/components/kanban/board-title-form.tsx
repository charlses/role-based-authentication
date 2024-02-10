'use client'

import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { KanbanBoard } from '@prisma/client'
import { useState, useTransition } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { UpdateBoardSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateBoard } from '@/server/actions/kanban/update-board'
import { toast } from 'sonner'

interface BoardTitleProps {
  data: KanbanBoard
}

export const BoardTitleForm = ({ data }: BoardTitleProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof UpdateBoardSchema>>({
    resolver: zodResolver(UpdateBoardSchema),
    defaultValues: {
      id: data.id,
      title: data.title,
      userId: data.userId
    }
  })

  const disableEditing = () => {
    setIsEditing(false)
  }
  const enableEditing = () => {
    setIsEditing(true)
  }

  const onSubmit = (values: z.infer<typeof UpdateBoardSchema>) => {
    startTransition(() => {
      updateBoard(values).then((data) => {
        if (data.error) {
          toast.error(data.error)

          disableEditing()
        }

        if (data.success) {
          toast.success(data.success)
          disableEditing()
        }
      })
    })
  }

  if (isEditing) {
    return (
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex items-center gap-x-2'>
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </form>
    )
  }

  return (
    <Button
      variant='ghost'
      className='font-bold text-lg h-auto w-auto p-1 px-2'
      onClick={enableEditing}>
      {data.title}
    </Button>
  )
}
