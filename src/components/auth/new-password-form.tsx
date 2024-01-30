'use client'
import * as z from 'zod'
import { NewPasswordSchema } from '@/schemas'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '../ui/use-toast'
import { useSearchParams } from 'next/navigation'
import { setNewPassword } from '@/server/actions/new-password'
import {
  CheckCircledIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons'

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const { toast } = useToast()
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setNewPassword(values, token).then((data: any) => {
      if (data.error) {
        toast({
          title: <ExclamationTriangleIcon />,
          variant: 'destructive',
          description: data.error
        })
      }

      if (data.success) {
        toast({
          title: (
            <div className='inline-flex text-green-400 space-x-1'>
              <CheckCircledIcon className='mt-1' />
              <p>Successs!</p>
            </div>
          ),
          description: data.success
        })
      }
    })
  }
  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle>New Password</CardTitle>
        <p className='text-sm font-normal text-center'>Type in new password</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='********'
                      type='password'
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
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='********'
                      type='password'
                      {...field}
                      disabled={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant='outline' className='w-full' type='submit'>
              Reset Password
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex flex-col items-center text-center text-[#f8003f] w-full'>
        <Link href='/sign-in' className='text-center'>
          Back to sign in!
        </Link>
      </CardFooter>
    </Card>
  )
}
