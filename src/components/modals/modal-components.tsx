import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export const DialogComponent = ({
  children,
  title,
  openText,
  description
}: {
  children: React.ReactNode
  title: string
  openText: string
  description: string
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>{openText}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
