import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { 
  Home, 
  Heart, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  User,
  Target,
  PlusCircle
} from 'lucide-react'
import { toast } from 'react-toastify'

export default function Sidebar() {
  const navigate = useNavigate()
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Heart, label: 'Memorials', path: '/memorials' },
    { icon: FileText, label: 'Wills', path: '/wills' },
    { icon: Users, label: 'Beneficiaries', path: '/beneficiaries' },
    { icon: Target, label: 'Fundraiser', path: '/fundraiser' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: User, label: 'Profile', path: '/profile' },
  ]

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('kenfuse_token')
      localStorage.removeItem('kenfuse_user')
      toast.success('Logged out successfully')
      navigate('/login')
    }
  }

  const handleCreateWill = () => {
    navigate('/create-will')
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">KENFUSE</h1>
        <p className="text-sm text-gray-500 mt-1">Digital Legacy Management</p>
      </div>
      
      {/* Quick Action Buttons */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={handleCreateWill}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <PlusCircle size={20} />
          Create Will
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Navigation
          </h3>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-gray-700 hover:text-red-600 px-3 py-3 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
        
        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            © 2024 KENFUSE v1.0
          </p>
        </div>
      </div>
    </div>
  )
}
