import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Mail, Lock } from 'lucide-react'
import { toast } from 'react-toastify'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock authentication
      const mockToken = 'mock-jwt-token-' + Date.now()
      localStorage.setItem('kenfuse_token', mockToken)
      localStorage.setItem('kenfuse_user', JSON.stringify({
        id: 1,
        email: formData.email || 'user@kenfuse.com',
        name: 'Demo User',
        role: 'user'
      }))

      toast.success('Login successful!')
      navigate('/')
    } catch (error) {
      toast.error('Login failed. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to KENFUSE</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formataData, password: e.target.value})}
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                Create one now
              </Link>
            </p>
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Demo: Use any email and password
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
