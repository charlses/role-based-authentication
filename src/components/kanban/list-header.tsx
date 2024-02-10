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
import {
  CheckCircledIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons'
import { useToast } from '../ui/use-toast'
import { useState } from 'react'
import { Button } from '../ui/button'

import { ListOptions } from './list-options'

type ListHeader = {
  data: KanbanList
}

export const ListHeader = ({ data }: ListHeader) => {
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof UpdateListSchema>>({
    resolver: zodResolver(UpdateListSchema),
    defaultValues: {
      id: data.id,
      title: data.title,
      boardId: data.boardId
    }
  })

  const onSubmit = (values: z.infer<typeof UpdateListSchema>) => {
    UpdateListAction(values).then((data) => {
      if (data.error) {
        toast({
          title: <ExclamationTriangleIcon />,
          variant: 'destructive',
          description: data.error
        })
        setIsEditing(false)
      }
      if (data.success) {
        toast({
          title: (
            <div className='inline-flex text-green-400 space-x-1'>
              <CheckCircledIcon className='mt-1' />
              <p>{data.success}!</p>
            </div>
          )
        })
        setIsEditing(false)
      }
    })
  }

  if (isEditing) {
    return (
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
                    disabled={false}
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
    <div className='flex justify-between items-center'>
      <Button
        variant='ghost'
        onClick={() => {
          setIsEditing(true)
        }}>
        {data.title}
      </Button>
      <ListOptions data={data} />
    </div>
  )
}
