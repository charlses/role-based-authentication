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
import { useToast } from '@/components/ui/use-toast'
import {
  ExclamationTriangleIcon,
  CheckCircledIcon
} from '@radix-ui/react-icons'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export const BoardForm = ({ userId }: { userId: string | '' }) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof BoardSchema>>({
    resolver: zodResolver(BoardSchema),
    defaultValues: {
      title: '',
      userId: userId
    }
  })

  const onSubmit = (values: z.infer<typeof BoardSchema>) => {
    createBoard(values).then((data) => {
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
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' onClick={() => setOpen(true)}>
          Create a new board
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
                      disabled={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='userId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='userId'
                      type='text'
                      {...field}
                      disabled
                      readOnly
                      className='hidden'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant='outline' className='w-full' type='submit'>
              Create Board
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
