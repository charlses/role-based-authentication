'use client'
import { useState } from 'react'
import {
  HamburgerMenuIcon,
  Cross1Icon,
  DashboardIcon
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
    <Drawer>
      <DrawerTrigger>
        <HamburgerMenuIcon />
      </DrawerTrigger>
      <DrawerContent className='h-[80vh]'>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <nav className='flex flex-col justify-center items-center'>
          <Link href='/dashboard'>Dashboard</Link>
          <Link href='/cusstomres'>Customers</Link>
          <Link href='/products'>Products</Link>
          <Link href='/settings'>Settings</Link>
        </nav>
        <DrawerFooter>
          <Button>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
