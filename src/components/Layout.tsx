import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null)
  
  React.useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem('kenfuse_user')
    if (userStr) {
      try {
        setUser(JSON.parse(userStr))
      } catch (e) {
        console.error('Failed to parse user data')
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
