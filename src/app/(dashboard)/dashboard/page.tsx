import { auth, signOut } from '@/auth'
import { NavBar } from '@/components/dashboard/nav-bar'
const DashboardPage = async () => {
  const session = await auth()
  return (
    <div>
      <p>{session?.user.id}</p>
      <p>{session?.user.name}</p>
      <p>{session?.user.email}</p>
      <p>{session?.user?.image}</p>
      <p>{session?.user.role}</p>
    </div>
  )
}

export default DashboardPage
