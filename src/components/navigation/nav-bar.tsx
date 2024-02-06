import { MainNav } from './main-nav'
import { UserNav } from './user-nav'
import { MobileMenu } from './mobile-menu'
import { ModeToggle } from '../theme-toggle'
import { SideBar } from './side-bar'

interface NavBarProps {
  name: string
  email: string
  avatarUrl: string
}

export const NavBar = ({ name, email, avatarUrl }: NavBarProps) => {
  return (
    <div className='fixed top-0 left-0 w-full z-[999] border-b bg-background'>
      <div className='flex h-16 items-center px-4'>
        {/* <MobileMenu /> */}

        <SideBar />

        <MainNav className='mx-6 hidden md:flex' />
        <div className='ml-auto flex items-center space-x-4'>
          <ModeToggle />
          <UserNav name={name} email={email} avatarUrl={avatarUrl} />
        </div>
      </div>
    </div>
  )
}
