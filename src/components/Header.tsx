import React from 'react'
import { Bell, Search, User, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface HeaderProps {
  user?: { name: string; email: string } | null
}

export default function Header({ user }: HeaderProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('kenfuse_token')
      localStorage.removeItem('kenfuse_user')
      toast.success('Logged out successfully')
      navigate('/login')
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="search"
              placeholder="Search memorials, wills, beneficiaries..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
