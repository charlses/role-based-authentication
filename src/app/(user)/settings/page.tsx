import { auth } from '@/auth'

const SettingsPage = async () => {
  const session = await auth()

  return <div>settings page</div>
}

export default SettingsPage
