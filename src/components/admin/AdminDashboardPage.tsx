import { SignUpForm } from '../auth/signup-form'

export const AdminDashboard = () => {
  return (
    <div className='flex flex-col space-y-10'>
      <SignUpForm />
      <SignUpForm />
      <SignUpForm />
      <SignUpForm />
    </div>
  )
}
