import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Mail, Lock, User } from 'lucide-react'
import { toast } from 'react-toastify'
import { authAPI } from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      // Send registration data to backend
      const response = await authAPI.register({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password
      })

      // If backend returns token directly
      if (response.data?.access_token) {
        localStorage.setItem('kenfuse_token', response.data.access_token)
        localStorage.setItem('kenfuse_user', JSON.stringify({
          id: response.data.user_id || 1,
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`
        }))
        
        toast.success('Account created successfully!')
        navigate('/')
      } 
      // If backend returns user data
      else if (response.data?.user) {
        localStorage.setItem('kenfuse_token', response.data.user.token || 'mock-token')
        localStorage.setItem('kenfuse_user', JSON.stringify(response.data.user))
        
        toast.success('Account created successfully!')
        navigate('/')
      }
      // If backend just returns success message
      else if (response.data?.message) {
        // For now, create mock auth so you can continue testing
        const mockToken = 'mock-jwt-token-' + Date.now()
        localStorage.setItem('kenfuse_token', mockToken)
        localStorage.setItem('kenfuse_user', JSON.stringify({
          id: 1,
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          role: 'user'
        }))
        
        toast.success(response.data.message || 'Registration successful!')
        navigate('/')
      }
      else {
        toast.error('Registration failed. Please try again.')
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      
      // Show specific error message from backend
      const errorMsg = error.response?.data?.error || 
                      error.response?.data?.message || 
                      'Registration failed. Please try again.'
      
      toast.error(errorMsg)
      
      // If backend is not responding, use mock auth for development
      if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
        toast.info('Using mock authentication for development')
        const mockToken = 'mock-jwt-token-' + Date.now()
        localStorage.setItem('kenfuse_token', mockToken)
        localStorage.setItem('kenfuse_user', JSON.stringify({
          id: 1,
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          role: 'user'
        }))
        setTimeout(() => navigate('/'), 1000)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join KENFUSE today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
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
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                minLength={6}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
                minLength={6}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <UserPlus size={20} />
                Create Account
              </>
            )}
          </button>
          
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Development Note:</strong> If backend is not deployed, this will use mock authentication so you can test the frontend flow.
          </p>
        </div>
      </div>
    </div>
  )
}
