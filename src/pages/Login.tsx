import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-toastify'
import { authAPI } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Try to connect to backend first
      const response = await authAPI.login(formData.email, formData.password)
      
      if (response.data?.access_token) {
        // Save token and user data
        localStorage.setItem('kenfuse_token', response.data.access_token)
        localStorage.setItem('kenfuse_user', JSON.stringify({
          id: response.data.user_id || 1,
          email: formData.email,
          name: response.data.name || 'User'
        }))
        
        toast.success('Login successful!')
        navigate('/')
      } else {
        toast.error('Invalid response from server')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      
      // If backend is not available, use mock auth
      if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
        toast.info('Using mock authentication for development')
        
        // Mock authentication for development
        const mockToken = 'mock-jwt-token-' + Date.now()
        localStorage.setItem('kenfuse_token', mockToken)
        localStorage.setItem('kenfuse_user', JSON.stringify({
          id: 1,
          email: formData.email,
          name: 'Demo User',
          role: 'user'
        }))
        
        toast.success('Mock login successful!')
        navigate('/')
      } else {
        const errorMsg = error.response?.data?.error || 
                        error.response?.data?.message || 
                        'Login failed. Please try again.'
        toast.error(errorMsg)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setFormData({
      email: 'admin@kenfuse.com',
      password: 'password123'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome to KENFUSE</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

            {/* Demo Login Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              <LogIn size={20} className="text-gray-500" />
              Use Demo Credentials
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
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900 mb-1">Demo Credentials</h4>
              <p className="text-xs text-blue-700">
                Email: admin@kenfuse.com<br />
                Password: password123
              </p>
            </div>
            <button
              onClick={handleDemoLogin}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Auto-fill
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
