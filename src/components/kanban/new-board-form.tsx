'use client'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { BoardSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createBoard } from '@/server/actions/kanban/create-board'
import { useState, useTransition } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { PlusIcon } from '@radix-ui/react-icons'

export const BoardForm = ({ userId }: { userId: string | '' }) => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof BoardSchema>>({
    resolver: zodResolver(BoardSchema),
    defaultValues: {
      title: '',
      userId: userId
    }
  })

  const onSubmit = (values: z.infer<typeof BoardSchema>) => {
    startTransition(() => {
      createBoard(values).then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          toast.success(data.success)
          form.reset()
          setOpen(false)
        }
      })
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          onClick={() => setOpen(true)}
          className='cursor-pointer'>
          <PlusIcon className='mr-4' /> Create a new board
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New board</DialogTitle>
          <DialogDescription>
            Create a new board to plan your next project!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board Name:</FormLabel>
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
            <Button
              variant='outline'
              className='w-full'
              type='submit'
              disabled={isPending}>
              Create Board
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
