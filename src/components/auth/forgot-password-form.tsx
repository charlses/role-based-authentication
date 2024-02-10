'use client'
import * as z from 'zod'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { ForgotPasswordSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { resetPassword } from '@/server/actions/auth/reset-password'
import { useTransition } from 'react'
import {
  CheckCircledIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons'
import { toast } from 'sonner'

export const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    startTransition(() => {
      resetPassword(values).then((data: any) => {
        if (data.error) {
          toast.error(data.error)
        }

        if (data.success) {
          toast.success(data.success)
        }
      })
    })
  }

  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle>Forgot password?</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='w-[350px] text-sm text-center font-normal'>
          Enter your email address below and we&apos;ll send you a link to reset
          your password!
        </p>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='example@mail.com'
                      type='email'
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
              Reset Password
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex-col space-y-4'>
        <Link href='/sign-up' className='text-[#f8003f] text-sm font-normal'>
          Sign up now!
        </Link>
      </CardFooter>
    </Card>
  )
}
