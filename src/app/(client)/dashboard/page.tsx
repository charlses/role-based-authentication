import { auth } from '@/auth'
import { ClientDashboard } from '@/components/client/ClientDashboardPage'
import { AdminDashboard } from '@/components/admin/AdminDashboardPage'

const DashboardPage = async () => {
  const session = await auth()
  if (session?.user.role === 'ADMIN') {
    return <AdminDashboard />
  }
  if (session?.user.role === 'USER') {
    return <ClientDashboard />
  }
}

export default DashboardPage
