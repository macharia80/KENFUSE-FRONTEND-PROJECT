import { useState } from 'react'
import { Target, Users, Calendar, DollarSign, Share2, Heart, TrendingUp } from 'lucide-react'

export default function Fundraiser() {
  const [campaigns] = useState([
    {
      id: 1,
      title: 'Medical Expenses for John',
      description: 'Support John\'s cancer treatment journey',
      raised: 150000,
      target: 500000,
      donors: 47,
      daysLeft: 15,
      category: 'Medical'
    },
    {
      id: 2,
      title: 'School Fees for Mary',
      description: 'Help Mary continue her university education',
      raised: 80000,
      target: 200000,
      donors: 32,
      daysLeft: 30,
      category: 'Education'
    },
    {
      id: 3,
      title: 'Funeral Expenses',
      description: 'Support the family with funeral arrangements',
      raised: 120000,
      target: 300000,
      donors: 89,
      daysLeft: 7,
      category: 'Memorial'
    }
  ])

  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    targetAmount: '',
    category: 'Memorial'
  })

  const createCampaign = () => {
    if (!newCampaign.title || !newCampaign.description || !newCampaign.targetAmount) {
      alert('Please fill all required fields')
      return
    }
    alert(`Campaign "${newCampaign.title}" created successfully!`)
    setNewCampaign({ title: '', description: '', targetAmount: '', category: 'Memorial' })
  }

  const categories = ['Memorial', 'Medical', 'Education', 'Emergency', 'Other']

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fundraising Campaigns</h1>
        <p className="text-gray-600">Support meaningful causes or start your own campaign</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {campaigns.map((campaign) => {
              const progress = (campaign.raised / campaign.target) * 100
              
              return (
                <div key={campaign.id} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {campaign.category}
                    </span>
                    <span className="text-sm text-gray-500">{campaign.daysLeft} days left</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4">{campaign.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Raised</span>
                        <span className="font-semibold">KES {campaign.raised.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-sm text-gray-500 mt-1">
                        of KES {campaign.target.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-1" />
                        <span>{campaign.donors} donors</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                          Donate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">Active Campaigns Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">KES 350K</div>
                <div className="text-sm text-gray-600">Total Raised</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">168</div>
                <div className="text-sm text-gray-600">Total Donors</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-gray-600">Active Campaigns</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-6">Start a Campaign</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., Medical Support for..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Tell your story..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newCampaign.category}
                  onChange={(e) => setNewCampaign({...newCampaign, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Amount (KES) *
                </label>
                <input
                  type="number"
                  value={newCampaign.targetAmount}
                  onChange={(e) => setNewCampaign({...newCampaign, targetAmount: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="50000"
                  min="1000"
                />
              </div>
              
              <div className="pt-4">
                <button
                  onClick={createCampaign}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  Start Campaign
                </button>
                <p className="text-sm text-gray-500 text-center mt-3">
                  Campaigns are reviewed within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}