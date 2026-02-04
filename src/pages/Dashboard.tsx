import { Sparkles, FileText, Heart, DollarSign, TrendingUp, Users, Calendar, ArrowUpRight } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { label: 'Active Wills', value: '3', icon: <FileText className="h-5 w-5" />, change: '+1', color: 'bg-blue-100 text-blue-600' },
    { label: 'Memorials', value: '2', icon: <Heart className="h-5 w-5" />, change: '+0', color: 'bg-pink-100 text-pink-600' },
    { label: 'Campaigns', value: '2', icon: <DollarSign className="h-5 w-5" />, change: '+0', color: 'bg-green-100 text-green-600' },
    { label: 'AI Credits', value: '150', icon: <Sparkles className="h-5 w-5" />, change: '+25', color: 'bg-purple-100 text-purple-600' },
  ]

  const recentActivities = [
    { id: 1, title: 'Will Updated', description: 'Updated beneficiaries list', time: '2 hours ago', icon: <FileText className="h-5 w-5" /> },
    { id: 2, title: 'New Campaign', description: 'Started medical fundraiser', time: '1 day ago', icon: <DollarSign className="h-5 w-5" /> },
    { id: 3, title: 'AI Consultation', description: 'Asked about legal requirements', time: '2 days ago', icon: <Sparkles className="h-5 w-5" /> },
    { id: 4, title: 'Payment Processed', description: 'KES 5,000 via M-Pesa', time: '3 days ago', icon: <TrendingUp className="h-5 w-5" /> },
  ]

  const quickActions = [
    { title: 'Create Will', description: 'Start new will document', icon: <FileText className="h-5 w-5" />, color: 'bg-blue-500' },
    { title: 'Start Fundraiser', description: 'Launch fundraising campaign', icon: <DollarSign className="h-5 w-5" />, color: 'bg-green-500' },
    { title: 'Ask AI', description: 'Get instant assistance', icon: <Sparkles className="h-5 w-5" />, color: 'bg-purple-500' },
    { title: 'Invite Family', description: 'Add family members', icon: <Users className="h-5 w-5" />, color: 'bg-pink-500' },
  ]

  return (
    <div className="p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John! 👋</h1>
        <p className="text-gray-600">Here's what's happening with your legacy planning today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${stat.color}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                View all →
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                      <div className="text-white">{action.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{action.title}</h3>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-blue-600" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-gray-600">{activity.icon}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          {/* AI Assistant Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">AI Assistant</h3>
                <p className="text-sm text-gray-600">Ready to help</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <button className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50">
                ✍️ Help me write a will
              </button>
              <button className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50">
                💰 Plan funeral expenses
              </button>
              <button className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50">
                ⚖️ Legal requirements
              </button>
            </div>
            
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90">
              Ask Anything
            </button>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-6">Upcoming</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Will Review</p>
                  <p className="text-sm text-gray-500">Tomorrow, 2:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Family Meeting</p>
                  <p className="text-sm text-gray-500">Friday, 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
