import { auth } from '@/auth'
import { NavBar } from '@/components/navigation/nav-bar'

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
      <section className='flex h-screen overflow-hidden'>
        <div className='flex-1 md:ml-64 h-full overflow-y-auto pt-20'>
          {children}
        </div>
      </section>
    </main>
  )
}

export default ProtectedLayout
