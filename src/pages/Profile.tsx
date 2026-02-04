// src/pages/Profile.tsx
import { useState } from 'react'
import { 
  User, Mail, Phone, MapPin, Calendar, Shield, 
  CreditCard, Bell, Lock, Camera, Edit, 
  Save, X, Upload, CheckCircle, AlertCircle
} from 'lucide-react'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [profileData, setProfileData] = useState({
    personal: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+254 712 345 678',
      dateOfBirth: '1985-06-15',
      nationalId: '12345678',
      address: '123 Main Street, Nairobi',
      gender: 'male'
    },
    account: {
      subscription: 'Premium',
      planExpires: '2024-12-31',
      paymentMethod: 'M-Pesa',
      lastPayment: '2024-01-15',
      nextPayment: '2024-02-15'
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      language: 'English',
      timezone: 'Africa/Nairobi',
      currency: 'KES'
    }
  })

  const handleSave = () => {
    console.log('Saving profile data:', profileData)
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('Uploading profile image:', file.name)
    }
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User className="h-5 w-5" /> },
    { id: 'account', label: 'Account', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'preferences', label: 'Preferences', icon: <Bell className="h-5 w-5" /> },
    { id: 'security', label: 'Security', icon: <Lock className="h-5 w-5" /> }
  ]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your personal and account information</p>
        </div>
        
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="relative group mb-6">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <User className="h-16 w-16 text-blue-600" />
              </div>
              
              {isEditing && (
                <label className="absolute bottom-2 right-1/2 transform translate-x-1/2 cursor-pointer">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            <h2 className="text-xl font-bold text-center mb-2">John Doe</h2>
            <p className="text-gray-600 text-center mb-6">Premium Member</p>

            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Account Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Verification</span>
                <span className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verified
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subscription</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Premium
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">Jan 2023</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200">
            {activeTab === 'personal' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        First Name
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.personal.firstName}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          personal: { ...profileData.personal, firstName: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        {profileData.personal.firstName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Last Name
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.personal.lastName}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          personal: { ...profileData.personal, lastName: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        {profileData.personal.lastName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Address
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.personal.email}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          personal: { ...profileData.personal, email: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        {profileData.personal.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Phone Number
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.personal.phone}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          personal: { ...profileData.personal, phone: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        {profileData.personal.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Date of Birth
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={profileData.personal.dateOfBirth}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          personal: { ...profileData.personal, dateOfBirth: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        {profileData.personal.dateOfBirth}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        National ID
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.personal.nationalId}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          personal: { ...profileData.personal, nationalId: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        {profileData.personal.nationalId}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Address
                      </div>
                    </label>
                    {isEditing ? (
                      <textarea
                        value={profileData.personal.address}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          personal: { ...profileData.personal, address: e.target.value }
                        })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        {profileData.personal.address}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Subscription Plan
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Plan
                        </label>
                        <div className="px-4 py-3 bg-white border border-gray-300 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{profileData.account.subscription}</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              Active
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Plan Expires
                        </label>
                        <div className="px-4 py-3 bg-white border border-gray-300 rounded-lg">
                          {profileData.account.planExpires}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Method
                        </label>
                        <div className="px-4 py-3 bg-white border border-gray-300 rounded-lg">
                          {profileData.account.paymentMethod}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Next Payment
                        </label>
                        <div className="px-4 py-3 bg-white border border-gray-300 rounded-lg">
                          {profileData.account.nextPayment}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Upgrade Plan
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        View Billing History
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Payment Methods</h3>
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            <span className="text-green-600 font-bold">M</span>
                          </div>
                          <div>
                            <div className="font-medium">M-Pesa</div>
                            <div className="text-sm text-gray-500">Primary • +254 712 345 678</div>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Edit
                        </button>
                      </div>
                      
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">Credit Card</div>
                            <div className="text-sm text-gray-500">Mastercard ending in 4242</div>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Email Notifications</div>
                          <div className="text-sm text-gray-500">Receive updates via email</div>
                        </div>
                        <button
                          onClick={() => setProfileData({
                            ...profileData,
                            preferences: {
                              ...profileData.preferences,
                              emailNotifications: !profileData.preferences.emailNotifications
                            }
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            profileData.preferences.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            profileData.preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">SMS Notifications</div>
                          <div className="text-sm text-gray-500">Receive SMS updates</div>
                        </div>
                        <button
                          onClick={() => setProfileData({
                            ...profileData,
                            preferences: {
                              ...profileData.preferences,
                              smsNotifications: !profileData.preferences.smsNotifications
                            }
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            profileData.preferences.smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            profileData.preferences.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Regional Settings</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={profileData.preferences.language}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            preferences: { ...profileData.preferences, language: e.target.value }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="English">English</option>
                          <option value="Swahili">Swahili</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone
                        </label>
                        <select
                          value={profileData.preferences.timezone}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            preferences: { ...profileData.preferences, timezone: e.target.value }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="Africa/Nairobi">Africa/Nairobi (GMT+3)</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        <select
                          value={profileData.preferences.currency}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            preferences: { ...profileData.preferences, currency: e.target.value }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="KES">KES - Kenyan Shilling</option>
                          <option value="USD">USD - US Dollar</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
                    <div className="flex items-start">
                      <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Security Alert</h3>
                        <p className="text-sm text-gray-600">
                          Your password was last changed 90 days ago. For better security, 
                          consider updating your password regularly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Password</h3>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-medium">Password</div>
                          <div className="text-sm text-gray-500">Last changed: 90 days ago</div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Change Password
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Two-Factor Authentication</h3>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">2FA Status</div>
                          <div className="text-sm text-gray-500">Add an extra layer of security</div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-red-600">Disabled</span>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Enable 2FA
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Active Sessions</h3>
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <div>
                          <div className="font-medium">Current Session</div>
                          <div className="text-sm text-gray-500">
                            Nairobi, Kenya • Chrome on Windows • Just now
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          Active
                        </span>
                      </div>
                      
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <div className="font-medium">Mobile App</div>
                          <div className="text-sm text-gray-500">
                            Safari on iPhone • 2 hours ago
                          </div>
                        </div>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}