import React, { useState } from 'react'
import { FileText, User, Home, DollarSign, Users, Plus, Trash2, Download } from 'lucide-react'

export default function WillCreation() {
  const [step, setStep] = useState(1)
  const [will, setWill] = useState({
    title: '',
    executor: '',
    beneficiaries: [
      { id: 1, name: 'John Doe Jr.', relationship: 'Son', percentage: 50 },
      { id: 2, name: 'Jane Smith', relationship: 'Daughter', percentage: 50 }
    ],
    assets: [
      { id: 1, name: 'Family House', value: '5,000,000', location: 'Nairobi' },
      { id: 2, name: 'Car', value: '2,500,000', location: 'Garage' }
    ],
    witnesses: [
      { id: 1, name: 'Michael Johnson', idNumber: '12345678' }
    ]
  })

  const totalSteps = 5

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const addBeneficiary = () => {
    const newId = Math.max(...will.beneficiaries.map(b => b.id)) + 1
    setWill({
      ...will,
      beneficiaries: [...will.beneficiaries, { id: newId, name: '', relationship: '', percentage: 0 }]
    })
  }

  const removeBeneficiary = (id: number) => {
    setWill({
      ...will,
      beneficiaries: will.beneficiaries.filter(b => b.id !== id)
    })
  }

  const handleDownload = () => {
    alert('Will document generated and downloaded!')
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="text-primary-600" size={28} />
        <div>
          <h1 className="text-2xl font-bold">Create Will</h1>
          <p className="text-gray-600">Step-by-step will creation wizard</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[...Array(totalSteps)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                i + 1 <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {i + 1}
              </div>
              <span className="text-xs mt-2 text-gray-600">
                {['Basic Info', 'Beneficiaries', 'Assets', 'Witnesses', 'Review'][i]}
              </span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="card">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Will Title *
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., Last Will and Testament"
                value={will.title}
                onChange={(e) => setWill({...will, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Executor *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="input-field pl-10"
                  placeholder="Person responsible for executing the will"
                  value={will.executor}
                  onChange={(e) => setWill({...will, executor: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Beneficiaries</h2>
              <button
                onClick={addBeneficiary}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                Add Beneficiary
              </button>
            </div>
            <div className="space-y-4">
              {will.beneficiaries.map((beneficiary) => (
                <div key={beneficiary.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Users className="text-blue-600" size={20} />
                      <h3 className="font-medium">Beneficiary #{beneficiary.id}</h3>
                    </div>
                    <button
                      onClick={() => removeBeneficiary(beneficiary.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Name</label>
                      <input
                        type="text"
                        className="input-field"
                        value={beneficiary.name}
                        onChange={(e) => {
                          const updated = will.beneficiaries.map(b =>
                            b.id === beneficiary.id ? {...b, name: e.target.value} : b
                          )
                          setWill({...will, beneficiaries: updated})
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Relationship</label>
                      <input
                        type="text"
                        className="input-field"
                        value={beneficiary.relationship}
                        onChange={(e) => {
                          const updated = will.beneficiaries.map(b =>
                            b.id === beneficiary.id ? {...b, relationship: e.target.value} : b
                          )
                          setWill({...will, beneficiaries: updated})
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Percentage (%)</label>
                      <input
                        type="number"
                        className="input-field"
                        value={beneficiary.percentage}
                        onChange={(e) => {
                          const updated = will.beneficiaries.map(b =>
                            b.id === beneficiary.id ? {...b, percentage: parseInt(e.target.value) || 0} : b
                          )
                          setWill({...will, beneficiaries: updated})
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Assets & Properties</h2>
            <div className="space-y-4">
              {will.assets.map((asset) => (
                <div key={asset.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    {asset.name.includes('House') ? (
                      <Home className="text-green-600" size={20} />
                    ) : (
                      <DollarSign className="text-yellow-600" size={20} />
                    )}
                    <h3 className="font-medium">{asset.name}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Value</p>
                      <p className="font-medium">{asset.value} KES</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{asset.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Witnesses</h2>
            <p className="text-gray-600 mb-6">
              At least two witnesses are required for a valid will.
            </p>
            <div className="space-y-4">
              {will.witnesses.map((witness) => (
                <div key={witness.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="text-purple-600" size={20} />
                    <h3 className="font-medium">Witness #{witness.id}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                      <input
                        type="text"
                        className="input-field"
                        value={witness.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">ID Number</label>
                      <input
                        type="text"
                        className="input-field"
                        value={witness.idNumber}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Review & Finalize</h2>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Will Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Title</p>
                    <p className="font-medium">{will.title || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Executor</p>
                    <p className="font-medium">{will.executor || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Beneficiaries</p>
                    <p className="font-medium">{will.beneficiaries.length} persons</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Assets</p>
                    <p className="font-medium">{will.assets.length} items</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold mb-4">Final Step</h3>
                <p className="text-gray-600 mb-4">
                  By clicking "Generate Will Document", you acknowledge that this will
                  become a legally binding document once signed by you and your witnesses.
                </p>
                <button
                  onClick={handleDownload}
                  className="btn-primary flex items-center gap-2"
                >
                  <Download size={20} />
                  Generate Will Document (PDF)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={step === 1}
          className={`px-6 py-3 rounded-lg ${
            step === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        
        {step < totalSteps ? (
          <button
            onClick={handleNext}
            className="btn-primary px-8"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={handleDownload}
            className="btn-primary px-8 flex items-center gap-2"
          >
            <FileText size={20} />
            Complete Will Creation
          </button>
        )}
      </div>
    </div>
  )
}
