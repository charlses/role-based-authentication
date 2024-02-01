import { auth } from '@/auth'
import { NavBar } from '@/components/dashboard/nav-bar'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth()

  return (
    <main className=''>
      <NavBar
        name={session?.user?.name ?? ''}
        email={session?.user.email ?? ''}
        avatarUrl={session?.user.image ?? ''}
      />
      <div className='p-5'>{children}</div>
    </main>
  )
}

export default ProtectedLayout
