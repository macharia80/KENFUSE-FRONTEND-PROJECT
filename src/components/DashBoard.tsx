// src/pages/Dashboard.tsx
import { useState, useEffect } from 'react'
import { 
  FileText, Heart, DollarSign, Users, Calendar, 
  TrendingUp, MessageCircle, Sparkles, Bell, 
  Search, Download, Share2, Eye, Edit, 
  ArrowRight, CheckCircle, Clock, Zap
} from 'lucide-react'

export default function Dashboard() {
  const [aiQuery, setAiQuery] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiHistory, setAiHistory] = useState([
    { id: 1, query: 'How to create a will?', response: 'To create a will on KENFUSE, go to Will Creation page, fill your personal details, add beneficiaries, and download the PDF.' },
    { id: 2, query: 'What documents do I need?', response: 'You need your ID, beneficiary details, asset list, and witness information.' }
  ])

  const stats = [
    { label: 'Active Wills', value: '3', icon: <FileText className="h-5 w-5" />, change: '+1', color: 'bg-blue-100 text-blue-600' },
    { label: 'Memorials', value: '2', icon: <Heart className="h-5 w-5" />, change: '+0', color: 'bg-pink-100 text-pink-600' },
    { label: 'Campaigns', value: '2', icon: <DollarSign className="h-5 w-5" />, change: '+0', color: 'bg-green-100 text-green-600' },
    { label: 'Family Members', value: '5', icon: <Users className="h-5 w-5" />, change: '+2', color: 'bg-purple-100 text-purple-600' },
  ]

  const recentActivities = [
    { id: 1, title: 'Will Created', description: 'Last Will and Testament', time: '2 hours ago', icon: <FileText className="h-5 w-5" />, action: 'View' },
    { id: 2, title: 'Payment Received', description: 'KES 5,000 via M-Pesa', time: '1 day ago', icon: <DollarSign className="h-5 w-5" />, action: 'Receipt' },
    { id: 3, title: 'Vendor Booked', description: 'Funeral Home Services', time: '2 days ago', icon: <Users className="h-5 w-5" />, action: 'Details' },
    { id: 4, title: 'Memorial Published', description: 'In memory of John Doe', time: '3 days ago', icon: <Heart className="h-5 w-5" />, action: 'Visit' },
  ]

  const quickActions = [
    { 
      title: 'Create Will', 
      description: 'Start new will document', 
      icon: <FileText className="h-6 w-6" />, 
      color: 'bg-blue-500',
      link: '/will',
      steps: ['Fill details', 'Add beneficiaries', 'Download PDF']
    },
    { 
      title: 'Start Fundraiser', 
      description: 'Launch fundraising campaign', 
      icon: <DollarSign className="h-6 w-6" />, 
      color: 'bg-green-500',
      link: '/fundraiser',
      steps: ['Set goal', 'Add story', 'Share']
    },
    { 
      title: 'Create Memorial', 
      description: 'Honor loved ones', 
      icon: <Heart className="h-6 w-6" />, 
      color: 'bg-pink-500',
      link: '/memorials',
      steps: ['Add photos', 'Write tribute', 'Invite family']
    },
    { 
      title: 'Invite Family', 
      description: 'Add family members', 
      icon: <Users className="h-6 w-6" />, 
      color: 'bg-purple-500',
      link: '/profile',
      steps: ['Enter emails', 'Set permissions', 'Send invites']
    },
  ]

  const upcomingEvents = [
    { id: 1, title: 'Will Review Meeting', time: 'Tomorrow, 2:00 PM', location: 'Video Call', participants: 3 },
    { id: 2, title: 'Family Gathering', time: 'Friday, 4:00 PM', location: 'Home', participants: 8 },
    { id: 3, title: 'Legal Consultation', time: 'Next Monday, 10:00 AM', location: 'Lawyer Office', participants: 2 },
  ]

  const aiQuickQuestions = [
    'How to update my will?',
    'M-Pesa payment issues?',
    'Add witness to will?',
    'Fundraiser tips?',
    'Memorial privacy settings?'
  ]

  // AI Assistant function
  const handleAiQuery = async (question?: string) => {
    const query = question || aiQuery
    if (!query.trim()) return

    setAiLoading(true)
    setAiQuery('')

    // Simulate AI response
    setTimeout(() => {
      let response = ''
      
      if (query.toLowerCase().includes('will')) {
        response = 'To create or update a will, go to the Will Creation page. You can add beneficiaries, specify asset distribution, and download a legally formatted PDF. Make sure to have 2 witnesses for validity.'
      } else if (query.toLowerCase().includes('mpesa') || query.toLowerCase().includes('payment')) {
        response = 'M-Pesa payments are processed instantly. Ensure your phone number is registered with M-Pesa. For failed transactions, check your M-Pesa balance and network connection. Transaction history is available in your account.'
      } else if (query.toLowerCase().includes('memorial')) {
        response = 'Memorials can be public or private. Add photos, write a tribute, and invite family to share memories. You can set viewing permissions and enable donations for funeral expenses.'
      } else if (query.toLowerCase().includes('fundraiser')) {
        response = 'Successful fundraisers have clear goals, compelling stories, and regular updates. Share on social media and track donations. KENFUSE takes 2% platform fee from successful campaigns.'
      } else {
        response = `I understand you're asking about "${query}". For specific assistance with wills, memorials, fundraising, or payments, please provide more details or contact our support team at support@kenfuse.com.`
      }

      setAiResponse(response)
      
      // Add to history
      setAiHistory(prev => [
        { id: Date.now(), query: query, response: response },
        ...prev.slice(0, 4) // Keep only 5 items
      ])
      
      setAiLoading(false)
    }, 1500)
  }

  // Load saved AI history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('kenfuse_ai_history')
    if (savedHistory) {
      setAiHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Save AI history to localStorage
  useEffect(() => {
    localStorage.setItem('kenfuse_ai_history', JSON.stringify(aiHistory))
  }, [aiHistory])

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John! 👋</h1>
          <p className="text-gray-600">Here's your KENFUSE dashboard overview</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search documents..."
              className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
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
              <span className={`px-3 py-1 ${stat.color.replace('text-', 'bg-').replace('100', '50')} ${stat.color} rounded-full text-xs font-medium`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Actions & Activity */}
        <div className="lg:col-span-2">
          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.link}
                  className="group block"
                >
                  <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <div className="text-white">{action.icon}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{action.title}</h3>
                            <p className="text-sm text-gray-500">{action.description}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 mt-1" />
                        </div>
                        
                        <div className="mt-3 flex items-center space-x-2">
                          {action.steps.map((step, i) => (
                            <div key={i} className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600">{i + 1}</span>
                              </div>
                              <span className="text-xs text-gray-600 ml-2">{step}</span>
                              {i < action.steps.length - 1 && (
                                <div className="w-4 h-0.5 bg-gray-200 mx-2"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-gray-600">{activity.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg">
                      {activity.action}
                    </button>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-purple-600">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
              View All Activity
            </button>
          </div>
        </div>

        {/* Right Column - AI Assistant & Upcoming */}
        <div className="lg:col-span-1 space-y-8">
          {/* AI Assistant */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">KENFUSE Assistant</h3>
                <p className="text-sm text-gray-600">Ask me anything</p>
              </div>
            </div>
            
            {/* AI Input */}
            <div className="mb-6">
              <div className="relative mb-4">
                <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleAiQuery()}
                  placeholder="Ask about wills, memorials, payments..."
                  rows={3}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                />
                <button
                  onClick={() => handleAiQuery()}
                  disabled={aiLoading || !aiQuery.trim()}
                  className="absolute right-3 bottom-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {aiLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              {/* Quick Questions */}
              <div className="flex flex-wrap gap-2 mb-4">
                {aiQuickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setAiQuery(question)
                      setTimeout(() => handleAiQuery(question), 100)
                    }}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            
            {/* AI Response */}
            {aiResponse && (
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Assistant Response:</span>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700">{aiResponse}</p>
                  <div className="flex justify-end mt-3">
                    <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* AI History */}
            {aiHistory.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Recent Queries</span>
                  <button 
                    onClick={() => setAiHistory([])}
                    className="text-xs text-gray-500 hover:text-red-600"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {aiHistory.slice(0, 3).map((item) => (
                    <div key={item.id} className="bg-white/50 border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start">
                        <MessageCircle className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.query}</p>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.response}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Events
            </h3>
            
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {event.participants} people
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-3 w-3 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📍</span>
                      {event.location}
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                      Join
                    </button>
                    <button className="flex-1 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
              View Calendar
            </button>
          </div>

          {/* Help Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-bold text-gray-900">Need Help?</h3>
                <p className="text-sm text-gray-600">We're here to assist you</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <a href="tel:+254700123456" className="block p-3 bg-white/80 rounded-lg hover:bg-white">
                <div className="font-medium">📞 Call Support</div>
                <div className="text-sm text-gray-600">+254 700 123 456</div>
              </a>
              
              <a href="mailto:support@kenfuse.com" className="block p-3 bg-white/80 rounded-lg hover:bg-white">
                <div className="font-medium">✉️ Email Support</div>
                <div className="text-sm text-gray-600">support@kenfuse.com</div>
              </a>
              
              <button className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}