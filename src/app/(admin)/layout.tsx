const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      {children}
    </div>
  )
}

export default AdminLayout
