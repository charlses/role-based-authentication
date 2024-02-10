import * as z from 'zod'
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { KanbanListItemSchema } from '@/schemas'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { createCard } from '@/server/actions/kanban/create-card'
import { useTransition } from 'react'
import { toast } from 'sonner'

type CardFormProps = {
  listId: string
  enableEditing: () => void
  disableEditing: () => void
  isEditing: boolean
}

export const CardForm = ({
  listId,
  enableEditing,
  disableEditing,
  isEditing
}: CardFormProps) => {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof KanbanListItemSchema>>({
    resolver: zodResolver(KanbanListItemSchema),
    defaultValues: {
      title: '',
      listId: listId
    }
  })

  const onSubmit = (values: z.infer<typeof KanbanListItemSchema>) => {
    startTransition(() => {
      createCard(values).then((data) => {
        if (data.error) {
          toast.error(data.error)
        }

        if (data.success) {
          toast.success(data.success)
        }
      })
    })
  }
  if (isEditing) {
    return (
      <div className='pt-2 px-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder='Add new card...'
                      rows={4}
                      {...field}
                      disabled={isPending}
                      className='border-background focus:border-none active:border-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              variant='outline'
              disabled={false}
              className='mt-4 mb-3'>
              <PlusIcon className='mr-2' /> Add card
            </Button>
            <Button variant='ghost'>
              <Cross1Icon onClick={disableEditing} />
            </Button>
          </form>
        </Form>
      </div>
    )
  }

  return (
    <div className='pt-2 px-2'>
      <Button
        onClick={enableEditing}
        className='h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm'
        size='sm'
        variant='ghost'>
        <PlusIcon className='mr-2' />
        Add a card
      </Button>
    </div>
  )
}
