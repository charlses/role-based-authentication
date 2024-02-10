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
import { emailVerification } from '@/server/actions/auth/email-verification'
import { toast } from 'sonner'

export const VerificationForm = () => {
  const [success, setSuccess] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) return

    if (!token) {
      toast.warning('No valid token found, try again later!')
    }
    emailVerification(token ?? '')
      .then((data: any) => {
        if (data.error) {
          setError(data.error)
          toast.error(data.error)
        }

        if (data.success) {
          setSuccess(data.success)
          toast.success(data.success)
        }

        return data
      })
      .catch((err) => {
        toast.error(err)
      })
  }, [token, success, error])

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
