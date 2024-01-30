'use client'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription
} from '@/components/ui/card'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import { useToast } from '@/components/ui/use-toast'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { signInAction } from '@/server/actions/sign-in'
import { useTransition } from 'react'
import { SocialLogin } from './social'

export const LoginForm = () => {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      signInAction(values).then((data: any) => {
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
    })
  }

  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle>Sign-in</CardTitle>
        <CardDescription>Sign in to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='example@mail.com'
                      type='email'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href='/forgot-password'
              className='text-[#f8003f] text-sm font-normal'
            >
              Forgot password?
            </Link>
            <Button
              className='w-full'
              variant='outline'
              disabled={isPending}
              type='submit'
            >
              Sign in
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex-col space-y-4'>
        <SocialLogin />
        <CardDescription>
          Don&apos;t have an account yet?{' '}
          <Link href='/sign-up' className='text-[#f8003f]'>
            Sign up now!
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
