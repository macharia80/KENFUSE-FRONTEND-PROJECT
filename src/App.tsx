// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

// Public pages
import Home from './pages/Home'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Contact from './pages/Contact'
import Fundraiser from './pages/Fundraiser'
import WillCreation from './pages/WillCreation'

// Dashboard pages
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

// Layout
import DashboardLayout from './components/DashboardLayout'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/fundraiser" element={<Fundraiser />} />
        <Route path="/will" element={<WillCreation />} />
        
        {/* Dashboard routes - with layout wrapper */}
        <Route path="/dashboard" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        } />
        
        <Route path="/profile" element={
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        } />
        
        {/* Dashboard routes without components - simple placeholders */}
        <Route path="/memorials" element={
          <DashboardLayout>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Memorials</h1>
              <p className="text-gray-600">Memorial management page coming soon...</p>
            </div>
          </DashboardLayout>
        } />
        
        <Route path="/marketplace" element={
          <DashboardLayout>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Marketplace</h1>
              <p className="text-gray-600">Vendor marketplace page coming soon...</p>
            </div>
          </DashboardLayout>
        } />
        
        <Route path="/messages" element={
          <DashboardLayout>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>
              <p className="text-gray-600">Messages page coming soon...</p>
            </div>
          </DashboardLayout>
        } />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App