import { auth, signOut } from '@/auth'
import { NavBar } from '@/components/dashboard/nav-bar'
const DashboardPage = async () => {
  const session = await auth()
  return <div>{JSON.stringify(session)}</div>
}

export default DashboardPage
