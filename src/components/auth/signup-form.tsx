'use client'

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RegisterSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUp } from '@/server/actions/sign-up'
import { useTransition } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export const SignUpForm = () => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: ''
    }
  })
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      signUp(values).then((data) => {
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
            description: data.success + JSON.stringify(values)
          })
        }
      })
    })
  }
  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle>Sign-up</CardTitle>
        <CardDescription>Sign up here to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='John'
                      type='text'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='surname'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Doe'
                      type='text'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button
              className='w-full'
              variant='outline'
              disabled={isPending}
              type='submit'
            >
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Already have an account?{' '}
          <Link href='/sign-in' className='text-[#f8003f]'>
            Sign in now!
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
