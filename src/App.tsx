import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Layout and pages
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Memorials from './pages/Memorials'
import Wills from './pages/Wills'
import Beneficiaries from './pages/Beneficiaries'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import WillCreation from './pages/WillCreation'
import Fundraiser from './pages/Fundraiser'

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('kenfuse_token')
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="memorials" element={<Memorials />} />
          <Route path="wills" element={<Wills />} />
          <Route path="beneficiaries" element={<Beneficiaries />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create-will" element={<WillCreation />} />
          <Route path="fundraiser" element={<Fundraiser />} />
        </Route>
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  )
}

export default App
