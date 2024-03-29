import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className=''>
      <div className='flex flex-col items-center justify-center space-y-5 h-screen'>
        <h1 className='text-3xl drop-shadow-md'>Auth</h1>
        <p>Simple authentication built for future projects</p>
        <Link href='sign-in'>
          <Button size='lg' variant='outline'>
            Sign-in
          </Button>
        </Link>
      </div>
    </main>
  )
}
