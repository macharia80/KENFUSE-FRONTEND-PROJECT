import { useState } from 'react'
import { FileText, User, Users, Home, Download, Save, Plus, Trash2 } from 'lucide-react'

export default function WillCreation() {
  const [willData, setWillData] = useState({
    title: 'My Last Will and Testament',
    fullName: '',
    idNumber: '',
    dateOfBirth: '',
    address: '',
    executor: {
      name: '',
      relationship: '',
      contact: ''
    },
    beneficiaries: [
      { id: 1, name: '', relationship: '', allocation: '50%', contact: '' }
    ],
    witnesses: [
      { id: 1, name: '', idNumber: '', contact: '' }
    ],
    specialInstructions: ''
  })

  const addBeneficiary = () => {
    setWillData({
      ...willData,
      beneficiaries: [
        ...willData.beneficiaries,
        { id: Date.now(), name: '', relationship: '', allocation: '', contact: '' }
      ]
    })
  }

  const removeBeneficiary = (id: number) => {
    if (willData.beneficiaries.length > 1) {
      setWillData({
        ...willData,
        beneficiaries: willData.beneficiaries.filter(b => b.id !== id)
      })
    }
  }

  const addWitness = () => {
    setWillData({
      ...willData,
      witnesses: [
        ...willData.witnesses,
        { id: Date.now(), name: '', idNumber: '', contact: '' }
      ]
    })
  }

  const removeWitness = (id: number) => {
    if (willData.witnesses.length > 1) {
      setWillData({
        ...willData,
        witnesses: willData.witnesses.filter(w => w.id !== id)
      })
    }
  }

  const saveWill = () => {
    // Validation
    if (!willData.fullName || !willData.idNumber) {
      alert('Please fill in your personal details')
      return
    }
    
    alert('Will saved successfully! You can now download the PDF.')
    console.log('Will data saved:', willData)
  }

  const downloadPDF = () => {
    alert('PDF will be generated and downloaded. This feature requires backend integration.')
    // In a real app, this would call an API to generate PDF
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Will</h1>
        <p className="text-gray-600">Create a legally valid will in minutes</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h2 className="text-xl font-semibold">Will Document</h2>
              <p className="text-gray-600 text-sm">Fill in all required details</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={saveWill}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </button>
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Personal Information */}
          <div>
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={willData.fullName}
                  onChange={(e) => setWillData({...willData, fullName: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Number *
                </label>
                <input
                  type="text"
                  value={willData.idNumber}
                  onChange={(e) => setWillData({...willData, idNumber: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="12345678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={willData.dateOfBirth}
                  onChange={(e) => setWillData({...willData, dateOfBirth: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={willData.address}
                  onChange={(e) => setWillData({...willData, address: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="123 Main St, Nairobi"
                />
              </div>
            </div>
          </div>

          {/* Executor */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold">Executor</h3>
              </div>
              <span className="text-sm text-gray-500">Person who will execute the will</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Executor Name *
                </label>
                <input
                  type="text"
                  value={willData.executor.name}
                  onChange={(e) => setWillData({
                    ...willData,
                    executor: {...willData.executor, name: e.target.value}
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Executor's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship
                </label>
                <input
                  type="text"
                  value={willData.executor.relationship}
                  onChange={(e) => setWillData({
                    ...willData,
                    executor: {...willData.executor, relationship: e.target.value}
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Spouse, Child, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Information
                </label>
                <input
                  type="text"
                  value={willData.executor.contact}
                  onChange={(e) => setWillData({
                    ...willData,
                    executor: {...willData.executor, contact: e.target.value}
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Phone or Email"
                />
              </div>
            </div>
          </div>

          {/* Beneficiaries */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Home className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold">Beneficiaries</h3>
              </div>
              <button
                onClick={addBeneficiary}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Beneficiary
              </button>
            </div>
            
            <div className="space-y-4">
              {willData.beneficiaries.map((beneficiary, index) => (
                <div key={beneficiary.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-medium">Beneficiary #{index + 1}</div>
                    {willData.beneficiaries.length > 1 && (
                      <button
                        onClick={() => removeBeneficiary(beneficiary.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={beneficiary.name}
                        onChange={(e) => {
                          const newBeneficiaries = [...willData.beneficiaries]
                          newBeneficiaries[index].name = e.target.value
                          setWillData({...willData, beneficiaries: newBeneficiaries})
                        }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Relationship
                      </label>
                      <input
                        type="text"
                        value={beneficiary.relationship}
                        onChange={(e) => {
                          const newBeneficiaries = [...willData.beneficiaries]
                          newBeneficiaries[index].relationship = e.target.value
                          setWillData({...willData, beneficiaries: newBeneficiaries})
                        }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Spouse, Child, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Allocation
                      </label>
                      <input
                        type="text"
                        value={beneficiary.allocation}
                        onChange={(e) => {
                          const newBeneficiaries = [...willData.beneficiaries]
                          newBeneficiaries[index].allocation = e.target.value
                          setWillData({...willData, beneficiaries: newBeneficiaries})
                        }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="50% or Specific asset"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact
                      </label>
                      <input
                        type="text"
                        value={beneficiary.contact}
                        onChange={(e) => {
                          const newBeneficiaries = [...willData.beneficiaries]
                          newBeneficiaries[index].contact = e.target.value
                          setWillData({...willData, beneficiaries: newBeneficiaries})
                        }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Phone or Email"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Special Instructions</h3>
            <textarea
              value={willData.specialInstructions}
              onChange={(e) => setWillData({...willData, specialInstructions: e.target.value})}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Any special instructions for your executor..."
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600 text-sm mb-4">
          <strong>Disclaimer:</strong> This is a template. For legally binding wills, 
          consult with a legal professional in Kenya.
        </p>
        <button
          onClick={saveWill}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Complete & Save Will
        </button>
      </div>
    </div>
  )
}