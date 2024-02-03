import { MainNav } from './main-nav'
import { Search } from './search'
import TeamSwitcher from './team-switcher'
import { UserNav } from './user-nav'
import { MobileMenu } from './mobile-menu'
import { ModeToggle } from '../theme-toggle'

interface NavBarProps {
  name: string
  email: string
  avatarUrl: string
}

export const NavBar = ({ name, email, avatarUrl }: NavBarProps) => {
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <MobileMenu />
        <TeamSwitcher />
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <ModeToggle />
          <UserNav name={name} email={email} avatarUrl={avatarUrl} />
        </div>
      </div>
    </div>
  )
}
