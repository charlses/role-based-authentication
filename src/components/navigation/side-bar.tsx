'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import {
  DashboardIcon,
  HamburgerMenuIcon,
  GearIcon,
  LockClosedIcon,
  PersonIcon
} from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

export const SideBar = () => {
  const [isOpen, setOpen] = useState(false)
  const router = useRouter()
  const pathName = usePathname()
  const handleRouteChange = () => {
    setOpen(false)
  }

  useEffect(() => {
    // Function to close the sidebar
    const closeSidebar = () => setOpen(false)

    // Close sidebar on route change
    handleRouteChange()

    // Close sidebar on window resize
    window.addEventListener('resize', closeSidebar)

    // Cleanup function
    return () => {
      window.removeEventListener('resize', closeSidebar)
    }
  }, [pathName])

  const isActive = (path: string) => {
    return pathName.startsWith(path)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        className='md:hidden'
        variant='ghost'
        onClick={() => setOpen(!isOpen)}
      >
        {/* Use appropriate icon or text */}
        <HamburgerMenuIcon />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-20'
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transform md:translate-x-0 fixed left-0 top-0 md:top-16 w-64 border-r overflow-y-auto h-full z-30 transition-transform duration-300 ease-in-out bg-background sm:h-screen`}
      >
        <div className='space-y-4 py-4'>
          <div className='px-3 py-2'>
            <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
              Discover
            </h2>
            <div className='flex flex-col space-y-3'>
              <Link href='/dashboard'>
                <Button
                  variant={`${isActive('/dashboard') ? 'secondary' : 'ghost'}`}
                  className='w-full justify-start'
                >
                  <DashboardIcon className='mr-3' />
                  Overview
                </Button>
              </Link>
              <Link href='/settings'>
                <Button
                  variant={`${isActive('/settings') ? 'secondary' : 'ghost'}`}
                  className='w-full justify-start'
                >
                  <GearIcon className='mr-3' />
                  Settings
                </Button>
              </Link>
              <Link href='/users'>
                <Button
                  variant={`${isActive('/users') ? 'secondary' : 'ghost'}`}
                  className='w-full justify-start'
                >
                  <LockClosedIcon className='mr-3' />
                  Sign out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
