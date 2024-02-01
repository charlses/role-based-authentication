import { MainNav } from './main-nav'
import { Search } from './search'
import TeamSwitcher from './team-switcher'
import { UserNav } from './user-nav'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { MobileMenu } from './mobile-menu'

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
          <Search />
          <UserNav name={name} email={email} avatarUrl={avatarUrl} />
        </div>
      </div>
    </div>
  )
}
