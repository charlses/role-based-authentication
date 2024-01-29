import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const AuthError = () => {
  return (
    <Card className='text-center'>
      <CardHeader>
        <CardTitle className='text-destructive'>
          Oops, something went wrong
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Try signing in again!</p>
      </CardContent>
      <CardFooter className='text-center flex-col w-full'>
        <Link href='/sign-in'>
          <Button variant='outline' className='w-full'>
            Sign in
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
