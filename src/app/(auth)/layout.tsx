import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      {children}
    </div>
  )
}

export default AuthLayout
