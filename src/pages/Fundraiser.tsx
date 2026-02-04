import React, { useState } from 'react'
import { Heart, Target, Users, Calendar, DollarSign, Share2, TrendingUp, Plus, Image as ImageIcon } from 'lucide-react'

interface Fundraiser {
  id: number
  title: string
  description: string
  goal: number
  raised: number
  donors: number
  daysLeft: number
  image: string
}

export default function Fundraiser() {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([
    {
      id: 1,
      title: 'Memorial Hospital Wing',
      description: 'Building a new wing in memory of loved ones',
      goal: 5000000,
      raised: 3250000,
      donors: 234,
      daysLeft: 45,
      image: 'https://images.unsplash.com/photo-1516549655669-df565bc5d4c5?auto=format&fit=crop&w=800'
    },
    {
      id: 2,
      title: 'Education Scholarship Fund',
      description: 'Supporting orphans through education',
      goal: 2000000,
      raised: 1250000,
      donors: 189,
      daysLeft: 60,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800'
    },
    {
      id: 3,
      title: 'Community Library Project',
      description: 'Building a community library in rural area',
      goal: 3000000,
      raised: 1500000,
      donors: 156,
      daysLeft: 30,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800'
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newFundraiser, setNewFundraiser] = useState({
    title: '',
    description: '',
    goal: '',
    duration: '30'
  })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const newFund = {
      id: fundraisers.length + 1,
      title: newFundraiser.title,
      description: newFundraiser.description,
      goal: parseInt(newFundraiser.goal),
      raised: 0,
      donors: 0,
      daysLeft: parseInt(newFundraiser.duration),
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w-800'
    }
    setFundraisers([...fundraisers, newFund])
    setNewFundraiser({ title: '', description: '', goal: '', duration: '30' })
    setShowCreateForm(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Fundraisers</h1>
          <p className="text-gray-600">Create and manage memorial fundraisers</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Create Fundraiser
        </button>
      </div>

      {/* Create Fundraiser Form */}
      {showCreateForm && (
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Create New Fundraiser</h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fundraiser Title *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Memorial Scholarship Fund"
                  value={newFundraiser.title}
                  onChange={(e) => setNewFundraiser({...newFundraiser, title: e.target.value})}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  className="input-field min-h-[120px]"
                  placeholder="Describe the purpose and goals of this fundraiser..."
                  value={newFundraiser.description}
                  onChange={(e) => setNewFundraiser({...newFundraiser, description: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Amount (KES) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    className="input-field pl-10"
                    placeholder="5000000"
                    value={newFundraiser.goal}
                    onChange={(e) => setNewFundraiser({...newFundraiser, goal: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (Days) *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    className="input-field pl-10"
                    placeholder="30"
                    value={newFundraiser.duration}
                    onChange={(e) => setNewFundraiser({...newFundraiser, duration: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="btn-primary flex-1">
                Create Fundraiser
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Fundraisers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {fundraisers.map((fundraiser) => {
          const progress = (fundraiser.raised / fundraiser.goal) * 100
          
          return (
            <div key={fundraiser.id} className="card overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                    {fundraiser.daysLeft} days left
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">{fundraiser.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{fundraiser.description}</p>
                  </div>
                  <Heart className="text-red-500 flex-shrink-0" size={20} />
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Raised: {formatCurrency(fundraiser.raised)}</span>
                    <span className="font-medium">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Goal: {formatCurrency(fundraiser.goal)}</span>
                    <span>{fundraiser.donors} donors</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Target className="mx-auto text-blue-600 mb-1" size={18} />
                    <p className="text-xs text-gray-600">Goal</p>
                    <p className="font-semibold">{formatCurrency(fundraiser.goal)}</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="mx-auto text-green-600 mb-1" size={18} />
                    <p className="text-xs text-gray-600">Raised</p>
                    <p className="font-semibold">{formatCurrency(fundraiser.raised)}</p>
                  </div>
                  <div className="text-center">
                    <Users className="mx-auto text-purple-600 mb-1" size={18} />
                    <p className="text-xs text-gray-600">Donors</p>
                    <p className="font-semibold">{fundraiser.donors}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 btn-primary py-2">
                    Donate Now
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {fundraisers.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
            <Heart className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No fundraisers yet</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Create your first fundraiser to honor the memory of your loved ones and make a positive impact.
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Create First Fundraiser
          </button>
        </div>
      )}
    </div>
  )
}
