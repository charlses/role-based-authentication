import { signOut } from 'next-auth/react'

export const logOut = () => {
  signOut()
}
