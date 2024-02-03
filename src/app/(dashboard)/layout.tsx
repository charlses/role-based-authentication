import { auth } from '@/auth'
import { NavBar } from '@/components/dashboard/nav-bar'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth()

  return (
    <main>
      <NavBar
        name={session?.user?.name ?? ''}
        email={session?.user.email ?? ''}
        avatarUrl={session?.user.image ?? ''}
      />
      <section className='p-5'>{children}</section>
    </main>
  )
}

export default ProtectedLayout
