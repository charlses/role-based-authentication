'use client'
import { CircleLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ui/button'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter
} from '../ui/card'
import { useCallback, useEffect, useState } from 'react'
import { emailVerification } from '@/server/actions/email-verification'
import { useToast } from '../ui/use-toast'
import {
  CheckCircledIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons'

export const VerificationForm = () => {
  const { toast } = useToast()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) return
    if (!token) {
      toast({
        title: <ExclamationTriangleIcon />,
        variant: 'destructive',
        description: "Token doesn't exist"
      })
    }
    emailVerification(token ?? '')
      .then((data: any) => {
        if (data.error) {
          setError(data.error)
          toast({
            title: <ExclamationTriangleIcon />,
            variant: 'destructive',
            description: data.error
          })
        }

        if (data.success) {
          setSuccess(data.success)
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

        return data
      })
      .catch((err) => {
        toast({
          title: (
            <div className='inline-flex text-green-400 space-x-1'>
              <CheckCircledIcon className='mt-1' />
              <p>Successs!</p>
            </div>
          ),
          description: err
        })
      })
  }, [toast, token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <Card className='text-center'>
      <CardHeader>
        <CardTitle>Verify your email!</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col justify-center items-center text-center'>
        {!success && !error && (
          <CircleLoader
            color='#f8003f'
            loading
            size={40}
            speedMultiplier={0.7}
          />
        )}
        {success}
        {!success && error}
      </CardContent>
      <CardFooter className='flex-col items-center'>
        <Link href='/sign-in'>
          <Button variant='outline'>Back to sign in!</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
