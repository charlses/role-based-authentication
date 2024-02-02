'use client'
import { useState } from 'react'
import {
  HamburgerMenuIcon,
  Cross1Icon,
  DashboardIcon,
  PersonIcon,
  BoxModelIcon,
  GearIcon
} from '@radix-ui/react-icons'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '../ui/drawer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const MobileMenu = () => {
  return (
    <div className='md:hidden'>
      <Drawer>
        <DrawerTrigger>
          <HamburgerMenuIcon />
        </DrawerTrigger>
        <DrawerContent className='h-[80vh]'>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <nav className='flex flex-col justify-center items-center w-full space-y-3'>
            <Link href='/dashboard'>
              <Button variant='outline' className='w-[25rem]'>
                <DashboardIcon className='mr-2' />
                Dashboard
              </Button>
            </Link>
            <Link href='/cusstomres'>
              <Button variant='outline' className='w-[25rem]'>
                <PersonIcon className='mr-2' />
                Customers
              </Button>
            </Link>
            <Link href='/products'>
              <Button variant='outline' className='w-[25rem]'>
                <BoxModelIcon className='mr-2' />
                Products
              </Button>
            </Link>
            <Link href='/settings'>
              <Button variant='outline' className='w-[25rem]'>
                <GearIcon className='mr-2' />
                Settings
              </Button>
            </Link>
          </nav>
          <DrawerFooter>
            <Button>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
